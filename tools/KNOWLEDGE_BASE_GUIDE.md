# Knowledge Base - 知识管理系统使用指南

> 自动归档、语义搜索、智能推荐

## 🎯 系统概述

知识管理系统帮助你：
- 📦 **自动归档** - 项目完成后自动整理文档和经验
- 🔍 **语义搜索** - 快速找到历史工作和相关知识
- 💡 **智能推荐** - 基于当前任务推荐相关资源
- 📊 **知识统计** - 了解你的知识资产分布

## 📁 目录结构

```
knowledge-base/
├── index.json          # 知识索引（自动生成）
├── projects/           # 项目归档
│   ├── 小米汽车 Q1 报告/
│   │   ├── summary.md
│   │   └── metadata.json
│   └── ...
├── patterns/           # 模式/模板
│   └── *.json
└── lessons/            # 经验教训
    └── *.md
```

## 🚀 快速开始

### 1. 归档项目

```bash
node tools/knowledge-base.js archive <名称> <类型> <描述> <标签> <摘要>
```

示例:
```bash
node tools/knowledge-base.js archive \
  "小米汽车 Q1 报告" \
  "project" \
  "2026 年 Q1 运营报告 PPT" \
  "ppt，报告，小米汽车" \
  "使用 executive 模板生成 15 页年度报告"
```

输出:
```
✅ 项目已归档：小米汽车 Q1 报告 (ID: kb_1775110231916_xxx)
```

### 2. 搜索知识

```bash
node tools/knowledge-base.js search <关键词>
```

示例:
```bash
node tools/knowledge-base.js search "PPT 报告"
```

输出:
```
🔍 搜索 "PPT 报告" 找到 2 个结果:

1. 小米汽车 Q1 报告 [project] (得分：1.1)
   描述：2026 年 Q1 运营报告 PPT...
   标签：ppt，报告，小米汽车

2. 年度报告模板 [project] (得分：1)
   描述：年度运营报告...
   标签：template, ppt，年度
```

### 3. 查看统计

```bash
node tools/knowledge-base.js stats
```

输出:
```
📊 知识库统计:

  总条目：3
  按类型:
    • project: 3
  按项目:
    • 小米汽车 Q1 报告：1
    • 年度报告模板：1
    • 工作流引擎：1
  热门标签:
    • ppt，报告，小米汽车：1
    • template: 1
```

### 4. 智能推荐

```bash
node tools/knowledge-base.js recommend <上下文>
```

示例:
```bash
node tools/knowledge-base.js recommend "生成年度运营报告"
```

## 💻 在代码中使用

### 1. 初始化知识库

```javascript
const { KnowledgeBaseManager } = require('./tools/knowledge-base.js');

const kb = new KnowledgeBaseManager();
```

### 2. 归档项目

```javascript
// 归档项目
const result = kb.archiveProject({
  name: '我的项目',
  type: 'project',
  description: '项目描述',
  tags: ['tag1', 'tag2'],
  summary: '项目摘要...',
  files: [
    { name: 'report.pptx', path: './output/report.pptx', size: 12345, type: 'pptx' }
  ],
  metadata: {
    created: '2026-04-02',
    template: 'executive',
    pages: 15
  }
});

console.log('归档成功:', result);
// { id: 'kb_xxx', path: '/path/to/project' }
```

### 3. 归档模式/模板

```javascript
kb.archivePattern({
  name: '融资路演模板',
  type: 'template',
  description: '用于融资路演的 PPT 模板',
  tags: ['template', '融资', '路演'],
  template: {
    slides: [...],
    colors: {...}
  }
});
```

### 4. 记录经验教训

```javascript
kb.recordLesson({
  title: 'PPT 生成最佳实践',
  category: 'best-practice',
  content: `
## 经验总结

1. 使用模板库提高一致性
2. 数据可视化优先于文字
3. 保持配色方案统一

## 教训

- 不要忘记检查中文字体
- 图表数据要验证准确性
  `,
  tags: ['ppt', 'best-practice'],
  project: '小米汽车 Q1 报告'
});
```

### 5. 搜索知识

```javascript
// 简单搜索
const results = kb.search('PPT 生成', {
  maxResults: 10,
  minScore: 0.3
});

// 按类型过滤
const projects = kb.search('报告', {
  filters: { type: 'project' }
});

console.log('找到', results.length, '个结果');
results.forEach(r => {
  console.log(`- ${r.title} [${r.type}] 得分：${r.score}`);
});
```

### 6. 智能推荐

```javascript
// 基于上下文推荐
const recommendations = kb.recommend('需要生成年度财务报告', {
  maxResults: 5
});

// 推荐相关项目
const relatedProjects = kb.recommendProjects('小米汽车', 3);

// 推荐适用模式
const patterns = kb.recommendPatterns('融资路演', 3);

// 推荐相关经验
const lessons = kb.recommendLessons('PPT 生成失败', 3);
```

### 7. 获取统计

```javascript
const stats = kb.getStats();

console.log('总条目:', stats.total);
console.log('按类型:', stats.byType);
console.log('按项目:', stats.byProject);
console.log('热门标签:', stats.tags);
console.log('最近条目:', stats.recent);
```

## 📊 索引文件格式

```json
{
  "version": "1.0",
  "created": "2026-04-02T14:10:00.000Z",
  "updated": "2026-04-02T14:10:00.000Z",
  "entries": [
    {
      "id": "kb_1775110231916_xxx",
      "type": "project",
      "title": "小米汽车 Q1 报告",
      "description": "2026 年 Q1 运营报告 PPT",
      "tags": ["ppt", "报告", "小米汽车"],
      "path": "/path/to/project",
      "timestamp": "2026-04-02T14:10:00.000Z"
    }
  ]
}
```

## 🔍 搜索算法

### 评分机制

系统使用以下因素计算相关性得分:

1. **关键词匹配** (0.3 分/个)
   - 标题、描述、标签中包含关键词

2. **标题匹配** (0.2 分/个)
   - 标题包含关键词权重更高

3. **标签匹配** (0.1 分/个)
   - 标签包含关键词

4. **类型匹配** (0.2 分)
   - 如果指定了类型过滤

5. **时间衰减** (0.1 分递减)
   - 最近的条目权重更高

### 搜索示例

```javascript
// 搜索 "PPT 报告"
// 匹配项:
// - 标题包含 "报告" → +0.2
// - 描述包含 "PPT" → +0.3
// - 标签包含 "ppt" → +0.1
// - 标签包含 "报告" → +0.1
// 总分：0.7
```

## 🎯 使用场景

### 场景 1: 开始新项目前

```javascript
// 搜索类似项目
const similar = kb.search('年度报告', { filters: { type: 'project' } });

// 推荐相关模板
const templates = kb.recommendPatterns('年度报告', 3);

// 查看相关经验
const lessons = kb.recommendLessons('PPT 生成', 3);
```

### 场景 2: 项目完成后

```javascript
// 自动归档
kb.archiveProject({
  name: project.name,
  description: project.description,
  tags: project.tags,
  summary: generateSummary(project),
  files: project.files,
  metadata: project.metadata
});

// 记录经验
kb.recordLesson({
  title: `${project.name} - 经验总结`,
  category: 'project-retrospective',
  content: lessonsLearned,
  tags: project.tags,
  project: project.name
});
```

### 场景 3: 遇到问题时

```javascript
// 搜索相关经验
const solutions = kb.search('错误关键词', {
  filters: { type: 'lesson' }
});

// 查看类似问题
const related = kb.recommend('遇到的具体问题描述');
```

## 📈 最佳实践

### 1. 命名规范

- **项目名称**: 使用有意义的名称，避免 "项目 1"、"测试" 等
- **标签**: 使用英文小写，逗号分隔，如 "ppt,report,template"
- **描述**: 简明扼要，包含关键信息

### 2. 标签策略

使用一致的标签体系:

```
类型标签：project, template, lesson, pattern
技能标签：ppt, video, search, analysis
领域标签：finance, marketing, technical
项目标签：xiaomi, q1-report, annual
```

### 3. 定期整理

```javascript
// 每周回顾
const weeklyStats = kb.getStats();
console.log('本周新增:', weeklyStats.total - lastWeekTotal);

// 每月清理
const oldEntries = kb.index.entries.filter(e => {
  const daysOld = (Date.now() - new Date(e.timestamp)) / (1000*60*60*24);
  return daysOld > 90; // 90 天以上
});
```

### 4. 自动归档

集成到工作流中:

```javascript
// 工作流完成后自动归档
const result = await engine.run('market-research-report');
if (result.success) {
  kb.archiveProject({
    name: `市场研究-${Date.now()}`,
    type: 'report',
    tags: ['market-research', 'auto-generated'],
    summary: '自动化生成的市场研究报告',
    metadata: result
  });
}
```

## 🐛 故障排查

### 问题：搜索结果为空

**原因**: 
- 关键词不匹配
- 索引为空
- 评分阈值太高

**解决**:
```javascript
// 降低评分阈值
kb.search('关键词', { minScore: 0.1 });

// 查看所有条目
console.log(kb.index.entries);
```

### 问题：归档失败

**原因**:
- 目录权限问题
- 路径包含特殊字符

**解决**:
```bash
# 检查权限
ls -la knowledge-base/

# 手动创建目录
mkdir -p knowledge-base/projects
```

### 问题：推荐不准确

**原因**:
- 索引数据不足
- 关键词提取不够精准

**解决**:
- 增加归档数据量
- 优化标签体系
- 考虑集成 NLP 库

## 🚀 扩展功能

### 1. 集成向量搜索

```javascript
// 使用 embedding 模型实现真正的语义搜索
const { embed } = require('@langchain/embeddings');

async function semanticSearch(query) {
  const queryVector = await embed(query);
  // 计算余弦相似度
  // ...
}
```

### 2. 知识图谱

```javascript
// 建立知识条目之间的关联
class KnowledgeGraph {
  addRelation(from, to, relationType) {
    // project A → uses → template B
    // lesson C → related-to → project D
  }
}
```

### 3. 自动标签

```javascript
// 基于内容自动生成标签
function autoTag(content) {
  // 使用 NLP 提取关键词
  // 返回建议的标签
}
```

## 📚 相关文件

- [Self-Evolution.md](../Self-Evolution.md) - 自进化规划
- [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) - 工作流引擎指南
- [TEMPLATES.md](../skills/pptx-templates/TEMPLATES.md) - PPT 模板库

---

*知识管理系统 v1.0 - 持续进化中*
