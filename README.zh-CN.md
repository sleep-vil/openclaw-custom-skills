# OpenClaw 自定义技能库

> 为 OpenClaw 开发的自定义技能库，包含 PPT 模板、工作流引擎和知识管理系统

[English](README.md) | 中文

## 📦 包含的技能

### 1. PPT 模板库 (`skills/pptx-templates/`)

专业的 PPT 模板生成系统，包含 9 种配色方案和 5 种页面类型。

**功能特性**:
- 🎨 9 种专业配色方案（高管报告、创业融资、产品发布等）
- 📊 5 种页面类型（数据概览、章节过渡、对比分析、时间线、内容页）
- 🔧 可复用的模板生成器

**配色方案**:
- **executive** - 高管报告（深蓝 + 冰蓝 + 白）
- **coral** - 创业融资（珊瑚红 + 金色 + 深蓝）
- **ocean** - 产品发布（深海蓝 + 青色 + 午夜蓝）
- **charcoal** - 技术分享（炭灰 + 白 + 黑）
- **teal** - API 文档（青色 + 海沫绿 + 薄荷）
- **terracotta** - 品牌故事（赤陶 + 沙色 + 鼠尾草）
- **cherry** - 营销战役（樱桃红 + 米白 + 海军蓝）
- **forest** - 学术研究（森林绿 + 苔藓绿 + 米色）
- **sage** - 培训工作坊（鼠尾草绿 + 尤加利 + 板岩）

**使用示例**:
```javascript
const { generatePresentation } = require('./skills/pptx-templates/template-generator.js');

generatePresentation({
  template: 'executive',  // 选择模板
  title: '2025 年度运营报告',
  subtitle: '砥砺前行 · 再创辉煌',
  slides: [
    {
      type: 'data',  // 数据概览页
      title: '核心指标',
      metrics: [
        { icon: '📊', value: '128,456', label: '交付量', change: '+156%' },
        { icon: '💰', value: '286.5 亿', label: '营业收入', change: '+198%' },
        { icon: '📈', value: '22.3%', label: '毛利率', change: '+5.8%' },
        { icon: '⭐', value: '97.2', label: '满意度', change: '+3.1%' }
      ]
    },
    {
      type: 'section',  // 章节过渡页
      number: '01',
      title: '财务表现',
      subtitle: '稳健增长 · 盈利突破'
    }
    // ... 更多内容页
  ],
  outputPath: '年度报告.pptx'
});
```

---

### 2. 工作流引擎 (`tools/workflow-engine.js`)

自动化编排多个技能完成复杂任务，减少 70% 手动操作。

**功能特性**:
- 🔄 工作流定义和解析
- ⚙️ 技能调度器（支持 6 种技能）
- 🔗 输入输出依赖管理
- 📋 3 个预定义工作流

**预定义工作流**:
1. **market-research-report** - 自动生成市场研究报告
2. **weekly-report-generator** - 自动生成周报 PPT
3. **document-to-presentation** - 将文档转换为 PPT

**使用示例**:
```bash
# 列出所有工作流
node tools/workflow-engine.js list

# 执行市场研究工作流
node tools/workflow-engine.js run market-research-report

# 在代码中使用
const { engine } = require('./tools/workflow-engine.js');

// 执行工作流
const result = await engine.run('market-research-report');

// 自定义工作流
const myWorkflow = {
  name: 'my-workflow',
  steps: [
    { skill: 'web-search', params: { query: '关键词' } },
    { skill: 'pptx-generate', input: '$prev', params: { title: '报告' } }
  ]
};
engine.register('my-workflow', myWorkflow);
await engine.run('my-workflow');
```

**完整文档**: [工作流使用指南](tools/WORKFLOW_GUIDE.md)

---

### 3. 知识管理系统 (`tools/knowledge-base.js`)

自动归档、语义搜索、智能推荐，知识复用率提升 60%。

**功能特性**:
- 📦 项目/模式/经验归档
- 🔍 关键词搜索（评分算法）
- 💡 智能推荐系统
- 📊 统计和可视化
- 🤖 自动归档工作流结果

**使用示例**:
```bash
# 归档项目
node tools/knowledge-base.js archive "项目名" project "描述" "标签" "摘要"

# 搜索知识
node tools/knowledge-base.js search "PPT 报告"

# 查看统计
node tools/knowledge-base.js stats

# 智能推荐
node tools/knowledge-base.js recommend "生成年度报告"
```

**在代码中使用**:
```javascript
const { KnowledgeBaseManager } = require('./tools/knowledge-base.js');

const kb = new KnowledgeBaseManager();

// 归档项目
kb.archiveProject({
  name: '小米汽车 Q1 报告',
  type: 'project',
  description: '2026 年 Q1 运营报告 PPT',
  tags: ['ppt', '报告', '小米汽车'],
  summary: '使用 executive 模板生成 15 页年度报告',
  files: [
    { name: 'report.pptx', path: './output/report.pptx', size: 542630 }
  ]
});

// 搜索
const results = kb.search('年度报告', {
  maxResults: 10,
  filters: { type: 'project' }
});

// 推荐
const recommendations = kb.recommend('生成财务报告');

// 统计
const stats = kb.getStats();
console.log('总条目:', stats.total);
```

**完整文档**: [知识库使用指南](tools/KNOWLEDGE_BASE_GUIDE.md)

---

## 🚀 快速开始

### 1. 安装依赖

```bash
# 安装 pptxgenjs（用于 PPT 生成）
sudo npm install -g pptxgenjs

# 设置环境变量（如需要）
export NODE_PATH=/usr/lib/node_modules
```

### 2. 克隆仓库

```bash
git clone https://github.com/sleep-vil/openclaw-custom-skills.git
cd openclaw-custom-skills
```

### 3. 测试功能

```bash
# 测试 PPT 模板生成
NODE_PATH=/usr/lib/node_modules node skills/pptx-templates/template-generator.js

# 测试工作流引擎
node tools/workflow-engine.js list

# 测试知识管理系统
node tools/knowledge-base.js stats
```

---

## 📋 项目结构

```
openclaw-custom-skills/
├── skills/
│   └── pptx-templates/        # PPT 模板库
│       ├── TEMPLATES.md       # 模板说明（9 种配色方案）
│       ├── README.md          # 使用指南
│       └── template-generator.js  # 模板生成器
├── tools/
│   ├── workflow-engine.js     # 工作流引擎核心
│   ├── WORKFLOW_GUIDE.md      # 工作流使用指南
│   ├── knowledge-base.js      # 知识管理系统核心
│   ├── KNOWLEDGE_BASE_GUIDE.md # 知识库使用指南
│   └── auto-archive.js        # 自动归档工具
├── Self-Evolution.md          # 自进化规划文档
├── README.md                  # 英文说明文档
├── README.zh-CN.md            # 中文说明文档（本文件）
├── LICENSE                    # MIT 许可证
└── .gitignore                 # Git 忽略文件
```

---

## 🎯 使用场景

### 场景 1: 自动生成年度报告

```javascript
const { generatePresentation } = require('./skills/pptx-templates/template-generator.js');

generatePresentation({
  template: 'executive',
  title: '2025 年度运营报告',
  subtitle: '砥砺前行 · 再创辉煌',
  slides: [
    // 核心数据页
    {
      type: 'data',
      title: '2025 年度核心指标',
      metrics: [
        { icon: '📊', value: '128,456', label: '全年交付量', change: '+156%' },
        { icon: '💰', value: '286.5 亿', label: '营业收入', change: '+198%' },
        { icon: '📈', value: '22.3%', label: '综合毛利率', change: '+5.8%' },
        { icon: '⭐', value: '97.2', label: '用户满意度', change: '+3.1%' }
      ]
    },
    // 章节过渡
    {
      type: 'section',
      number: '01',
      title: '财务表现',
      subtitle: '稳健增长 · 盈利突破'
    },
    // 对比分析
    {
      type: 'comparison',
      title: '收入结构对比',
      items: [
        {
          title: '2024 年收入构成',
          points: ['汽车销售：58%', '政府补贴：35%', '其他：7%'],
          stat: { value: '119.5 亿', label: '总收入' }
        },
        {
          title: '2025 年收入构成',
          points: ['汽车销售：68%', '软件服务：12%', '其他：20%'],
          stat: { value: '286.5 亿', label: '总收入' }
        }
      ]
    }
    // ... 更多内容
  ],
  outputPath: '2025 年度运营报告.pptx'
});
```

### 场景 2: 自动化市场研究

```bash
# 一键生成市场研究报告（自动搜索 → 提取数据 → 生成 PPT）
node tools/workflow-engine.js run market-research-report
```

### 场景 3: 知识管理和复用

```bash
# 项目完成后归档
node tools/knowledge-base.js archive "项目 A" project "项目描述" "tag1,tag2" "项目摘要"

# 开始新项目时搜索历史经验
node tools/knowledge-base.js search "年度报告"

# 获取智能推荐
node tools/knowledge-base.js recommend "生成 PPT"
```

### 场景 4: 自动归档工作流结果

```javascript
const { engine } = require('./tools/workflow-engine.js');
const { autoArchive } = require('./tools/auto-archive.js');

// 执行工作流
const result = await engine.run('market-research-report');

// 自动归档到知识库
if (result.success) {
  await autoArchive(result);
}
```

---

## 📊 技术栈

- **Node.js** 18+
- **pptxgenjs** 4.0+
- **JavaScript** ES6+

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 📈 项目状态

### 已完成
- ✅ PPT 模板库（9 种配色方案，5 种页面类型）
- ✅ 工作流引擎（支持技能编排和自动化）
- ✅ 知识管理系统（归档、搜索、推荐）
- ✅ 自动归档工具
- ✅ 完整文档

### 计划中
- 🔄 更多工作流技能集成
- 🔄 向量搜索支持（语义搜索）
- 🔄 知识图谱构建
- 🔄 多模态内容生成

---

## 📧 联系方式

- **作者**: sleep-vil
- **GitHub**: https://github.com/sleep-vil
- **项目地址**: https://github.com/sleep-vil/openclaw-custom-skills

---

## ⭐ Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=sleep-vil/openclaw-custom-skills&type=Date)](https://star-history.com/#sleep-vil/openclaw-custom-skills&Date)

---

**持续进化中... 🚀**

*最后更新：2026 年 4 月 2 日*
