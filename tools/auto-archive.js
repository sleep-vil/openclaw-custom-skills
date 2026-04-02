#!/usr/bin/env node
/**
 * 自动归档脚本
 * 在工作流完成后自动归档项目到知识库
 */

const { KnowledgeBaseManager } = require('./knowledge-base.js');
const fs = require('fs');
const path = require('path');

const kb = new KnowledgeBaseManager();

/**
 * 从工作流结果生成项目摘要
 */
function generateSummary(workflowResult) {
  const { workflow, duration, outputs } = workflowResult;
  
  return `# ${workflow}

## 执行信息
- **工作流**: ${workflow}
- **耗时**: ${(duration / 1000).toFixed(2)}秒
- **时间**: ${new Date().toISOString()}

## 输出结果
${Object.entries(outputs)
  .map(([key, value]) => `- **${key}**: ${typeof value === 'object' ? JSON.stringify(value).substring(0, 100) : value}`)
  .join('\n')}

## 文件清单
${Object.entries(outputs)
  .filter(([_, value]) => value?.path)
  .map(([_, value]) => `- ${value.path}`)
  .join('\n') || '无'}
`;
}

/**
 * 自动归档工作流结果
 */
async function autoArchive(workflowResult) {
  if (!workflowResult.success) {
    console.log('⚠️ 工作流执行失败，跳过归档');
    return null;
  }

  const { workflow, duration, outputs } = workflowResult;

  // 生成项目名称
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const projectName = `${workflow}-${timestamp}`;

  // 提取标签
  const tags = [
    'auto-archived',
    workflow.replace(/[-_]/g, ' ').split(' ')[0],
    ...Object.keys(outputs)
  ];

  // 收集文件信息
  const files = Object.entries(outputs)
    .filter(([_, value]) => value?.path)
    .map(([key, value]) => ({
      name: path.basename(value.path),
      path: value.path,
      type: path.extname(value.path).slice(1),
      size: fs.existsSync(value.path) 
        ? fs.statSync(value.path).size 
        : 0
    }));

  console.log('\n📦 开始归档项目...');
  console.log(`  名称：${projectName}`);
  console.log(`  标签：${tags.join(', ')}`);
  console.log(`  文件：${files.length} 个`);

  // 归档项目
  const result = kb.archiveProject({
    name: projectName,
    type: 'workflow-result',
    description: `自动化工作流 ${workflow} 的执行结果`,
    tags,
    summary: generateSummary(workflowResult),
    files,
    metadata: {
      workflow,
      duration,
      timestamp,
      outputs: Object.keys(outputs)
    }
  });

  // 记录经验（如果有）
  if (files.length > 0) {
    kb.recordLesson({
      title: `${workflow} - 自动化生成成功`,
      category: 'automation-success',
      content: `
## 工作流信息
- 名称：${workflow}
- 耗时：${(duration / 1000).toFixed(2)}秒

## 生成文件
${files.map(f => `- ${f.name} (${(f.size / 1024).toFixed(2)} KB)`).join('\n')}

## 经验总结
自动化工作流成功执行，生成了预期的输出文件。
      `,
      tags: ['automation', workflow],
      project: projectName
    });
  }

  console.log(`✅ 归档完成！`);
  console.log(`   项目 ID: ${result.id}`);
  console.log(`   存储路径：${result.path}`);

  return result;
}

// ============ 使用示例 ============

if (require.main === module) {
  console.log('🤖 自动归档工具\n');

  // 示例 1: 模拟工作流结果
  const mockWorkflowResult = {
    success: true,
    workflow: 'market-research-report',
    duration: 5432,
    outputs: {
      search_result: {
        query: '新能源汽车市场',
        results: 10
      },
      final_ppt: {
        path: '/home/user/workspace/市场研究报告.pptx',
        size: 542630
      }
    }
  };

  console.log('示例：归档模拟工作流结果\n');
  autoArchive(mockWorkflowResult);

  // 示例 2: 手动归档项目
  console.log('\n\n示例：手动归档项目\n');
  
  const manualProject = {
    name: '手动归档示例',
    type: 'demo',
    description: '演示如何手动归档项目',
    tags: ['demo', 'manual', 'example'],
    summary: '这是一个手动归档的示例项目',
    files: [
      {
        name: 'example.pptx',
        path: './example.pptx',
        type: 'pptx',
        size: 12345
      }
    ],
    metadata: {
      created: new Date().toISOString(),
      author: 'demo-user'
    }
  };

  const result = kb.archiveProject(manualProject);
  console.log('✅ 手动归档完成:', result);

  // 显示统计
  console.log('\n\n📊 当前知识库统计:');
  const stats = kb.getStats();
  console.log(`  总条目：${stats.total}`);
  console.log(`  项目数：${stats.byType['project'] || 0}`);
  console.log(`  模式数：${stats.byType['pattern'] || 0}`);
  console.log(`  经验数：${stats.byType['lesson'] || 0}`);
}

// ============ 导出 ============

module.exports = {
  autoArchive,
  generateSummary
};
