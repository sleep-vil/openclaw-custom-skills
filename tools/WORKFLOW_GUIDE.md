# Workflow Engine - 工作流引擎使用指南

> 自动化编排多个技能完成复杂任务

## 🎯 什么是工作流引擎？

工作流引擎允许你将多个技能串联起来，自动完成复杂的任务。

**示例**: 市场研究报告 = 网络搜索 → 数据提取 → PPT 生成

## 📦 预定义工作流

### 1. 市场研究报告 (`market-research-report`)

**用途**: 自动生成市场研究报告 PPT

**步骤**:
1. 🔍 网络搜索相关数据
2. 📊 提取关键信息
3. 📑 生成 PPT 报告

**使用**:
```bash
node tools/workflow-engine.js run market-research-report
```

---

### 2. 周报生成器 (`weekly-report-generator`)

**用途**: 从数据文件自动生成周报 PPT

**步骤**:
1. 📖 读取周数据文件
2. 📑 生成周报 PPT

**使用**:
```bash
# 先准备 week_data.json
node tools/workflow-engine.js run weekly-report-generator
```

---

### 3. 文档转 PPT (`document-to-presentation`)

**用途**: 将 Markdown/文本文档转换为 PPT

**步骤**:
1. 📖 读取文档
2. 📊 提取结构
3. 📑 生成 PPT

**使用**:
```bash
# 先准备 input.md
node tools/workflow-engine.js run document-to-presentation
```

## 🚀 快速开始

### 列出所有工作流

```bash
node tools/workflow-engine.js list
```

输出:
```
可用工作流:
  • market-research-report (3 步) - 自动生成市场研究报告 PPT
  • weekly-report-generator (2 步) - 自动生成周报 PPT
  • document-to-presentation (3 步) - 将文档转换为 PPT
```

### 执行工作流

```bash
node tools/workflow-engine.js run <工作流名称>
```

示例:
```bash
node tools/workflow-engine.js run market-research-report
```

## 💻 在代码中使用

### 1. 使用预定义工作流

```javascript
const { engine } = require('./tools/workflow-engine.js');

// 执行工作流
const result = await engine.run('market-research-report');

if (result.success) {
  console.log('✅ 工作流完成，耗时:', result.duration, 'ms');
} else {
  console.error('❌ 工作流失败:', result.error);
}
```

### 2. 创建自定义工作流

```javascript
const { engine } = require('./tools/workflow-engine.js');

// 定义工作流
const myWorkflow = {
  name: 'my-custom-workflow',
  description: '我的自定义工作流',
  steps: [
    {
      skill: 'web-search',
      params: {
        query: '我的搜索关键词',
        count: 10
      },
      output: 'search_result'
    },
    {
      skill: 'file-write',
      input: '$prev',  // 使用上一步的输出
      params: {
        path: 'output.json'
      },
      output: 'file_result'
    }
  ]
};

// 注册工作流
engine.register('my-workflow', myWorkflow);

// 执行工作流
const result = await engine.run('my-workflow');
```

### 3. 参数覆盖

```javascript
// 执行时覆盖参数
const result = await engine.run('market-research-report', {
  'web-search': {
    query: '自定义搜索词',
    count: 20
  },
  'pptx-generate': {
    template: 'coral',
    title: '自定义标题'
  }
});
```

## 📝 工作流定义语法

### 基本结构

```json
{
  "name": "工作流名称",
  "description": "工作流描述",
  "steps": [
    {
      "skill": "技能名称",
      "params": { "参数": "值" },
      "input": "$prev",
      "output": "输出变量名"
    }
  ]
}
```

### 字段说明

| 字段 | 必需 | 说明 |
|------|------|------|
| `name` | ✅ | 工作流唯一标识 |
| `description` | ❌ | 工作流描述 |
| `steps` | ✅ | 步骤数组 |

### 步骤字段

| 字段 | 必需 | 说明 |
|------|------|------|
| `skill` | ✅ | 要执行的技能名称 |
| `params` | ✅ | 技能参数 |
| `input` | ❌ | 输入数据来源 |
| `output` | ❌ | 输出变量名 |

### 输入来源

| 值 | 说明 |
|----|------|
| `$prev` | 上一步的输出 |
| `$all` | 所有步骤的输出 |
| 变量名 | 指定变量的值 |

## 🔧 可用技能

### 已实现

| 技能 | 用途 | 参数示例 |
|------|------|---------|
| `web-search` | 网络搜索 | `{ query: "关键词", count: 10 }` |
| `pptx-generate` | 生成 PPT | `{ template, title, slides }` |
| `file-read` | 读取文件 | `{ path: "file.txt" }` |
| `file-write` | 写入文件 | `{ path: "output.txt" }` |
| `data-extract` | 提取数据 | `{ type: "data-type" }` |
| `wait` | 等待 | `{ duration: 5 }` |

### 可扩展

你可以添加更多技能，只需在 `SkillExecutor.runSkill()` 中添加 case:

```javascript
case 'my-new-skill':
  return await this.myNewSkill(params, input);
```

## 📊 输出格式

### 成功响应

```json
{
  "success": true,
  "workflow": "工作流名称",
  "duration": 5432,
  "outputs": {
    "search_result": { ... },
    "final_ppt": { ... }
  }
}
```

### 失败响应

```json
{
  "success": false,
  "workflow": "工作流名称",
  "error": "错误信息"
}
```

## 🎨 高级用法

### 1. 从文件加载工作流

```javascript
const { engine } = require('./tools/workflow-engine.js');

// 从 JSON 文件加载
engine.loadFromFile('workflows/my-workflow.json');

// 执行
await engine.run('my-workflow');
```

### 2. 工作流编排

```javascript
// 串行执行多个工作流
await engine.run('workflow-1');
await engine.run('workflow-2');

// 或使用结果
const result1 = await engine.run('workflow-1');
const result2 = await engine.run('workflow-2', {
  'some-skill': { input: result1.outputs.data }
});
```

### 3. 错误处理

```javascript
try {
  const result = await engine.run('my-workflow');
  if (!result.success) {
    throw new Error(result.error);
  }
} catch (error) {
  console.error('工作流执行失败:', error.message);
  // 回滚操作或通知用户
}
```

## 🐛 故障排查

### 问题：技能不存在

**错误**: `未知技能：xxx`

**解决**: 在 `SkillExecutor.runSkill()` 中添加该技能的实现

### 问题：工作流不存在

**错误**: `工作流不存在：xxx`

**解决**: 检查工作流名称是否正确，或先注册工作流

### 问题：输入数据为空

**错误**: `Cannot read property of undefined`

**解决**: 检查 `input` 字段是否正确引用上一步的 `output`

## 📚 示例

### 完整示例：自动化周报生成

```javascript
const { engine } = require('./tools/workflow-engine.js');

const weeklyReportWorkflow = {
  name: 'auto-weekly-report',
  description: '自动化周报生成',
  steps: [
    {
      skill: 'file-read',
      params: { path: 'data/week_metrics.json' },
      output: 'metrics'
    },
    {
      skill: 'data-extract',
      input: '$prev',
      params: { type: 'key-metrics' },
      output: 'key_data'
    },
    {
      skill: 'pptx-generate',
      input: '$all',
      params: {
        template: 'executive',
        title: '周报',
        subtitle: new Date().toLocaleDateString(),
        outputPath: 'reports/weekly_report.pptx'
      },
      output: 'ppt'
    },
    {
      skill: 'file-write',
      input: '$all',
      params: { path: 'reports/weekly_summary.json' },
      output: 'summary'
    }
  ]
};

engine.register('auto-weekly', weeklyReportWorkflow);

// 执行
const result = await engine.run('auto-weekly');
console.log('周报生成完成:', result);
```

## 🚀 下一步

1. **添加更多技能** - 扩展 `SkillExecutor` 支持更多工具
2. **可视化编排** - 创建 GUI 界面拖拽编排工作流
3. **定时执行** - 集成 cron 定时运行工作流
4. **分布式执行** - 支持跨机器执行工作流
5. **版本管理** - 工作流版本控制和回滚

## 💡 最佳实践

1. **小步迭代** - 先实现简单工作流，逐步复杂化
2. **错误处理** - 每个步骤都应该有错误处理
3. **日志记录** - 记录执行过程便于调试
4. **参数化** - 使用参数覆盖提高灵活性
5. **测试验证** - 对关键工作流进行充分测试
