# OpenClaw Custom Skills

> Custom skills library for OpenClaw, including PPT templates, workflow engine, and knowledge management system

[English](README.md) | [中文](README.zh-CN.md)

## 📦 包含的技能

### 1. PPT 模板库 (`skills/pptx-templates/`)

专业的 PPT 模板生成系统，包含 9 种配色方案和 5 种页面类型。

**功能**:
- 9 种专业配色方案（高管报告、创业融资、产品发布等）
- 5 种页面类型（数据概览、章节过渡、对比分析、时间线、内容页）
- 可复用的模板生成器

**使用**:
```javascript
const { generatePresentation } = require('./skills/pptx-templates/template-generator.js');

generatePresentation({
  template: 'executive',
  title: '年度报告',
  slides: [...]
});
```

**文档**: [使用指南](skills/pptx-templates/README.md)

---

### 2. 工作流引擎 (`tools/workflow-engine.js`)

自动化编排多个技能完成复杂任务。

**功能**:
- 工作流定义和解析
- 技能调度器
- 输入输出依赖管理
- 3 个预定义工作流

**使用**:
```bash
# 列出工作流
node tools/workflow-engine.js list

# 执行工作流
node tools/workflow-engine.js run market-research-report
```

**文档**: [使用指南](tools/WORKFLOW_GUIDE.md)

---

### 3. 知识管理系统 (`tools/knowledge-base.js`)

自动归档、语义搜索、智能推荐。

**功能**:
- 项目/模式/经验归档
- 关键词搜索
- 智能推荐
- 自动归档工作流结果

**使用**:
```bash
# 归档项目
node tools/knowledge-base.js archive "项目名" project "描述" "标签" "摘要"

# 搜索
node tools/knowledge-base.js search "PPT 报告"

# 统计
node tools/knowledge-base.js stats
```

**文档**: [使用指南](tools/KNOWLEDGE_BASE_GUIDE.md)

---

## 🚀 快速开始

### 安装依赖

```bash
# 安装 pptxgenjs（用于 PPT 生成）
sudo npm install -g pptxgenjs

# 设置环境变量（如需要）
export NODE_PATH=/usr/lib/node_modules
```

### 使用 PPT 模板

```bash
# 运行示例
NODE_PATH=/usr/lib/node_modules node skills/pptx-templates/template-generator.js
```

### 使用工作流引擎

```bash
node tools/workflow-engine.js run market-research-report
```

### 使用知识管理系统

```bash
node tools/knowledge-base.js archive "测试项目" project "测试描述" "test,demo" "测试摘要"
```

---

## 📋 项目结构

```
openclaw-custom-skills/
├── skills/
│   └── pptx-templates/        # PPT 模板库
│       ├── TEMPLATES.md       # 模板说明
│       ├── README.md          # 使用指南
│       └── template-generator.js  # 生成器
├── tools/
│   ├── workflow-engine.js     # 工作流引擎
│   ├── WORKFLOW_GUIDE.md      # 工作流文档
│   ├── knowledge-base.js      # 知识管理系统
│   ├── KNOWLEDGE_BASE_GUIDE.md # 知识库文档
│   └── auto-archive.js        # 自动归档工具
├── Self-Evolution.md          # 自进化规划
├── README.md                  # 本文件
└── LICENSE
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
    {
      type: 'data',
      title: '核心指标',
      metrics: [
        { icon: '📊', value: '128,456', label: '交付量', change: '+156%' },
        // ...
      ]
    }
    // ...
  ],
  outputPath: '年度报告.pptx'
});
```

### 场景 2: 自动化市场研究

```bash
# 一键生成市场研究报告
node tools/workflow-engine.js run market-research-report
```

### 场景 3: 知识管理和复用

```bash
# 归档项目
node tools/knowledge-base.js archive "项目 A" project "描述" "标签" "摘要"

# 搜索历史项目
node tools/knowledge-base.js search "年度报告"

# 获取推荐
node tools/knowledge-base.js recommend "生成 PPT"
```

---

## 📊 技术栈

- **Node.js** 18+
- **pptxgenjs** 4.0+
- **JavaScript** ES6+

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

本项目采用 **MIT 许可证** - 查看 [LICENSE](LICENSE) 文件了解详情

### 📜 开源声明

- ✅ **100% 原创代码** - 所有核心代码均为手写
- ✅ **完全开源** - 采用 MIT 许可证，可自由使用
- ✅ **商业友好** - 可用于商业项目

详细开源声明：[OPEN-SOURCE-NOTICE.md](OPEN-SOURCE-NOTICE.md)  
第三方组件说明：[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)

---

## 📧 联系方式

- **作者**: sleep-vil
- **GitHub**: https://github.com/sleep-vil/openclaw-custom-skills

---

*持续进化中...*
