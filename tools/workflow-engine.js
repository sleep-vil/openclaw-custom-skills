#!/usr/bin/env node
/**
 * Workflow Engine - 工作流引擎
 * 自动化编排多个技能完成复杂任务
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ============ 工作流解析器 ============

class WorkflowParser {
  /**
   * 解析工作流定义
   * @param {string|object} workflow - 工作流定义（JSON 字符串或对象）
   */
  static parse(workflow) {
    if (typeof workflow === 'string') {
      return JSON.parse(workflow);
    }
    return workflow;
  }

  /**
   * 验证工作流结构
   */
  static validate(workflow) {
    const required = ['name', 'steps'];
    for (const field of required) {
      if (!workflow[field]) {
        throw new Error(`工作流缺少必需字段：${field}`);
      }
    }

    if (!Array.isArray(workflow.steps) || workflow.steps.length === 0) {
      throw new Error('工作流必须包含至少一个步骤');
    }

    return true;
  }
}

// ============ 技能执行器 ============

class SkillExecutor {
  /**
   * 执行单个技能
   * @param {object} step - 步骤定义
   * @param {object} context - 执行上下文
   */
  static async execute(step, context) {
    const { skill, params, input, output } = step;
    
    console.log(`🔧 执行技能：${skill}`);
    
    // 处理输入依赖
    let resolvedInput = input;
    if (input === '$prev') {
      resolvedInput = context.lastOutput;
    } else if (input === '$all') {
      resolvedInput = context.allOutputs;
    }
    
    // 执行技能（根据技能类型）
    let result;
    try {
      result = await this.runSkill(skill, params, resolvedInput);
    } catch (error) {
      console.error(`❌ 技能执行失败：${skill}`, error.message);
      throw error;
    }
    
    // 保存输出
    if (output) {
      context.outputs[output] = result;
    }
    context.lastOutput = result;
    context.allOutputs[skill] = result;
    
    console.log(`✅ 技能完成：${skill}`);
    return result;
  }

  /**
   * 运行具体技能
   */
  static async runSkill(skillName, params, input) {
    switch (skillName) {
      case 'web-search':
        return await this.searchWeb(params);
      
      case 'pptx-generate':
        return await this.generatePPT(params, input);
      
      case 'file-read':
        return await this.readFile(params);
      
      case 'file-write':
        return await this.writeFile(params, input);
      
      case 'data-extract':
        return await this.extractData(params, input);
      
      case 'wait':
        return await new Promise(resolve => 
          setTimeout(resolve, (params.duration || 1000) * 1000)
        );
      
      default:
        throw new Error(`未知技能：${skillName}`);
    }
  }

  /**
   * 网络搜索（模拟）
   */
  static async searchWeb(params) {
    console.log(`  🔍 搜索：${params.query}`);
    // 实际实现可以调用 web_search 工具
    return {
      query: params.query,
      results: [
        { title: '搜索结果 1', url: 'https://example.com/1' },
        { title: '搜索结果 2', url: 'https://example.com/2' }
      ],
      timestamp: new Date().toISOString()
    };
  }

  /**
   * 生成 PPT
   */
  static async generatePPT(params, inputData) {
    console.log(`  📊 生成 PPT: ${params.title || '无标题'}`);
    
    const scriptPath = path.join(__dirname, '..', 'generate_ppt_script.js');
    
    // 创建工作流专用的生成脚本
    const generateScript = `
const { generatePresentation } = require('./skills/pptx-templates/template-generator.js');

generatePresentation({
  template: '${params.template || 'executive'}',
  title: '${params.title}',
  subtitle: '${params.subtitle || ''}',
  slides: ${JSON.stringify(params.slides || [])},
  outputPath: '${params.outputPath || 'workflow_output.pptx'}'
}).then(path => {
  console.log('PPT 生成成功:', path);
  process.exit(0);
}).catch(err => {
  console.error('PPT 生成失败:', err);
  process.exit(1);
});
    `;
    
    fs.writeFileSync(scriptPath, generateScript);
    
    try {
      execSync(`NODE_PATH=/usr/lib/node_modules node ${scriptPath}`, {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit'
      });
      
      return {
        success: true,
        path: params.outputPath || 'workflow_output.pptx',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`PPT 生成失败：${error.message}`);
    }
  }

  /**
   * 读取文件
   */
  static async readFile(params) {
    console.log(`  📖 读取文件：${params.path}`);
    const content = fs.readFileSync(params.path, 'utf-8');
    return {
      path: params.path,
      content: content,
      size: Buffer.byteLength(content, 'utf-8')
    };
  }

  /**
   * 写入文件
   */
  static async writeFile(params, data) {
    console.log(`  📝 写入文件：${params.path}`);
    const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    fs.writeFileSync(params.path, content, 'utf-8');
    return {
      path: params.path,
      size: Buffer.byteLength(content, 'utf-8'),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * 提取数据（模拟）
   */
  static async extractData(params, input) {
    console.log(`  📊 提取数据：${params.type || '通用'}`);
    
    // 实际实现可以调用 markitdown 或其他工具
    return {
      type: params.type,
      extracted: {
        title: '提取的标题',
        items: ['项目 1', '项目 2', '项目 3'],
        stats: { total: 3, processed: 3 }
      },
      timestamp: new Date().toISOString()
    };
  }
}

// ============ 工作流引擎 ============

class WorkflowEngine {
  constructor() {
    this.workflows = new Map();
  }

  /**
   * 注册工作流
   */
  register(name, definition) {
    WorkflowParser.validate(definition);
    this.workflows.set(name, definition);
    console.log(`✅ 工作流已注册：${name}`);
  }

  /**
   * 从文件加载工作流
   */
  loadFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const workflow = JSON.parse(content);
    this.register(workflow.name, workflow);
  }

  /**
   * 执行工作流
   */
  async run(workflowName, overrides = {}) {
    const workflow = this.workflows.get(workflowName);
    if (!workflow) {
      throw new Error(`工作流不存在：${workflowName}`);
    }

    console.log(`\n🚀 开始执行工作流：${workflow.name}`);
    console.log(`📋 包含 ${workflow.steps.length} 个步骤\n`);

    const context = {
      outputs: {},
      lastOutput: null,
      allOutputs: {},
      startTime: new Date(),
      parameters: overrides
    };

    try {
      // 执行所有步骤
      for (let i = 0; i < workflow.steps.length; i++) {
        const step = workflow.steps[i];
        const stepNum = i + 1;
        
        console.log(`\n[${stepNum}/${workflow.steps.length}] ${step.skill}`);
        
        // 应用参数覆盖
        const stepParams = { ...step.params, ...overrides[step.skill] };
        const enhancedStep = { ...step, params: stepParams };
        
        await SkillExecutor.execute(enhancedStep, context);
      }

      // 完成
      const duration = new Date() - context.startTime;
      console.log(`\n✅ 工作流执行完成！`);
      console.log(`⏱️  耗时：${(duration / 1000).toFixed(2)}秒`);
      console.log(`📦 输出：${Object.keys(context.outputs).length} 个结果\n`);

      return {
        success: true,
        workflow: workflow.name,
        duration: duration,
        outputs: context.outputs
      };

    } catch (error) {
      console.error(`\n❌ 工作流执行失败：${error.message}`);
      return {
        success: false,
        workflow: workflow.name,
        error: error.message
      };
    }
  }

  /**
   * 列出所有工作流
   */
  list() {
    const workflows = [];
    this.workflows.forEach((def, name) => {
      workflows.push({
        name,
        steps: def.steps.length,
        description: def.description || '无描述'
      });
    });
    return workflows;
  }
}

// ============ 预定义工作流 ============

const PREDEFINED_WORKFLOWS = {
  /**
   * 市场研究报告工作流
   */
  'market-research': {
    name: 'market-research-report',
    description: '自动生成市场研究报告 PPT',
    steps: [
      {
        skill: 'web-search',
        params: {
          query: '新能源汽车市场 2026',
          count: 10
        },
        output: 'search_results'
      },
      {
        skill: 'data-extract',
        input: '$prev',
        params: {
          type: 'market-data'
        },
        output: 'market_data'
      },
      {
        skill: 'pptx-generate',
        input: '$all',
        params: {
          template: 'executive',
          title: '市场研究报告',
          subtitle: '数据驱动 · 洞察未来',
          outputPath: '市场研究报告.pptx'
        },
        output: 'final_ppt'
      }
    ]
  },

  /**
   * 周报生成工作流
   */
  'weekly-report': {
    name: 'weekly-report-generator',
    description: '自动生成周报 PPT',
    steps: [
      {
        skill: 'file-read',
        params: {
          path: 'week_data.json'
        },
        output: 'week_data'
      },
      {
        skill: 'pptx-generate',
        input: '$prev',
        params: {
          template: 'coral',
          title: '周报',
          outputPath: '周报.pptx'
        },
        output: 'weekly_ppt'
      }
    ]
  },

  /**
   * 文档转换工作流
   */
  'doc-to-ppt': {
    name: 'document-to-presentation',
    description: '将文档转换为 PPT',
    steps: [
      {
        skill: 'file-read',
        params: {
          path: 'input.md'
        },
        output: 'doc_content'
      },
      {
        skill: 'data-extract',
        input: '$prev',
        params: {
          type: 'document-structure'
        },
        output: 'structured_data'
      },
      {
        skill: 'pptx-generate',
        input: '$prev',
        params: {
          template: 'charcoal',
          outputPath: 'output.pptx'
        },
        output: 'ppt_file'
      }
    ]
  }
};

// ============ 初始化 ============

const engine = new WorkflowEngine();

// 注册预定义工作流
Object.values(PREDEFINED_WORKFLOWS).forEach(workflow => {
  engine.register(workflow.name, workflow);
});

console.log('🎯 工作流引擎已启动');
console.log(`📦 已加载 ${engine.workflows.size} 个预定义工作流\n`);

// ============ CLI 接口 ============

if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args[0] === 'list') {
    // 列出所有工作流
    const workflows = engine.list();
    console.log('\n可用工作流:');
    workflows.forEach(wf => {
      console.log(`  • ${wf.name} (${wf.steps} 步) - ${wf.description}`);
    });
    
  } else if (args[0] === 'run') {
    // 执行工作流
    const workflowName = args[1];
    const overrides = {};
    
    // 解析参数覆盖
    for (let i = 2; i < args.length; i += 2) {
      if (args[i].startsWith('--')) {
        const key = args[i].slice(2);
        const value = args[i + 1];
        overrides[key] = value;
      }
    }
    
    engine.run(workflowName, overrides).catch(err => {
      console.error('执行失败:', err);
      process.exit(1);
    });
    
  } else {
    console.log('用法:');
    console.log('  node workflow-engine.js list          # 列出工作流');
    console.log('  node workflow-engine.js run <name>    # 执行工作流');
    console.log('\n示例:');
    console.log('  node workflow-engine.js run market-research-report');
  }
}

// ============ 导出 ============

module.exports = {
  WorkflowEngine,
  WorkflowParser,
  SkillExecutor,
  engine
};
