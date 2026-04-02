# OpenClaw Custom Skills

> Custom skills library for OpenClaw, including PPT templates, workflow engine, and knowledge management system

[English](README.md) | [中文](README.zh-CN.md)

## 📦 Included Skills

### 1. PPT Template Library (`skills/pptx-templates/`)

Professional PPT template generation system with 9 color schemes and 5 slide types.

**Features**:
- 🎨 9 professional color schemes (Executive Report, Startup Pitch, Product Launch, etc.)
- 📊 5 slide types (Data Overview, Section Transition, Comparison, Timeline, Content)
- 🔧 Reusable template generator

**Color Schemes**:
- **executive** - Executive Report (Navy + Ice Blue + White)
- **coral** - Startup Pitch (Coral + Gold + Navy)
- **ocean** - Product Launch (Deep Blue + Teal + Midnight)
- **charcoal** - Technical Sharing (Charcoal + White + Black)
- **teal** - API Documentation (Teal + Seafoam + Mint)
- **terracotta** - Brand Story (Terracotta + Sand + Sage)
- **cherry** - Marketing Campaign (Cherry + Cream + Navy)
- **forest** - Academic Research (Forest + Moss + Cream)
- **sage** - Training Workshop (Sage + Eucalyptus + Slate)

**Usage Example**:
```javascript
const { generatePresentation } = require('./skills/pptx-templates/template-generator.js');

generatePresentation({
  template: 'executive',
  title: '2025 Annual Report',
  subtitle: 'Moving Forward · Creating Glory',
  slides: [
    {
      type: 'data',
      title: 'Key Metrics',
      metrics: [
        { icon: '📊', value: '128,456', label: 'Deliveries', change: '+156%' },
        { icon: '💰', value: '28.65B', label: 'Revenue', change: '+198%' },
        { icon: '📈', value: '22.3%', label: 'Gross Margin', change: '+5.8%' },
        { icon: '⭐', value: '97.2', label: 'Satisfaction', change: '+3.1%' }
      ]
    },
    {
      type: 'section',
      number: '01',
      title: 'Financial Performance',
      subtitle: 'Steady Growth · Profit Breakthrough'
    }
  ],
  outputPath: 'annual-report.pptx'
});
```

---

### 2. Workflow Engine (`tools/workflow-engine.js`)

Automate orchestration of multiple skills to complete complex tasks, reducing 70% manual operations.

**Features**:
- 🔄 Workflow definition and parsing
- ⚙️ Skill scheduler (supports 6 skills)
- 🔗 Input/output dependency management
- 📋 3 predefined workflows

**Predefined Workflows**:
1. **market-research-report** - Auto-generate market research reports
2. **weekly-report-generator** - Auto-generate weekly reports
3. **document-to-presentation** - Convert documents to PPT

**Usage Example**:
```bash
# List all workflows
node tools/workflow-engine.js list

# Run market research workflow
node tools/workflow-engine.js run market-research-report
```

**In Code**:
```javascript
const { engine } = require('./tools/workflow-engine.js');

// Run workflow
const result = await engine.run('market-research-report');

// Custom workflow
const myWorkflow = {
  name: 'my-workflow',
  steps: [
    { skill: 'web-search', params: { query: 'keyword' } },
    { skill: 'pptx-generate', input: '$prev', params: { title: 'Report' } }
  ]
};
engine.register('my-workflow', myWorkflow);
await engine.run('my-workflow');
```

**Full Documentation**: [Workflow Guide](tools/WORKFLOW_GUIDE.md)

---

### 3. Knowledge Management System (`tools/knowledge-base.js`)

Auto-archiving, semantic search, smart recommendations, improving knowledge reuse by 60%.

**Features**:
- 📦 Project/Pattern/Lesson archiving
- 🔍 Keyword search (scoring algorithm)
- 💡 Smart recommendation system
- 📊 Statistics and visualization
- 🤖 Auto-archiving workflow results

**Usage Example**:
```bash
# Archive project
node tools/knowledge-base.js archive "Project Name" project "Description" "tags" "Summary"

# Search knowledge
node tools/knowledge-base.js search "PPT Report"

# View statistics
node tools/knowledge-base.js stats

# Get recommendations
node tools/knowledge-base.js recommend "Generate Annual Report"
```

**In Code**:
```javascript
const { KnowledgeBaseManager } = require('./tools/knowledge-base.js');

const kb = new KnowledgeBaseManager();

// Archive project
kb.archiveProject({
  name: 'Xiaomi EV Q1 Report',
  type: 'project',
  description: '2026 Q1 Operations Report PPT',
  tags: ['ppt', 'report', 'xiaomi'],
  summary: 'Generated 15-page annual report using executive template',
  files: [
    { name: 'report.pptx', path: './output/report.pptx', size: 542630 }
  ]
});

// Search
const results = kb.search('annual report', {
  maxResults: 10,
  filters: { type: 'project' }
});

// Recommend
const recommendations = kb.recommend('generate financial report');

// Statistics
const stats = kb.getStats();
console.log('Total entries:', stats.total);
```

**Full Documentation**: [Knowledge Base Guide](tools/KNOWLEDGE_BASE_GUIDE.md)

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install pptxgenjs (for PPT generation)
sudo npm install -g pptxgenjs

# Set environment variable (if needed)
export NODE_PATH=/usr/lib/node_modules
```

### 2. Clone Repository

```bash
git clone https://github.com/sleep-vil/openclaw-custom-skills.git
cd openclaw-custom-skills
```

### 3. Test Features

```bash
# Test PPT template generation
NODE_PATH=/usr/lib/node_modules node skills/pptx-templates/template-generator.js

# Test workflow engine
node tools/workflow-engine.js list

# Test knowledge management system
node tools/knowledge-base.js stats
```

---

## 📋 Project Structure

```
openclaw-custom-skills/
├── skills/
│   └── pptx-templates/        # PPT Template Library
│       ├── TEMPLATES.md       # Template documentation (9 color schemes)
│       ├── README.md          # Usage guide
│       └── template-generator.js  # Template generator
├── tools/
│   ├── workflow-engine.js     # Workflow engine core
│   ├── WORKFLOW_GUIDE.md      # Workflow usage guide
│   ├── knowledge-base.js      # Knowledge management core
│   ├── KNOWLEDGE_BASE_GUIDE.md # Knowledge base guide
│   └── auto-archive.js        # Auto-archiving tool
├── Self-Evolution.md          # Self-evolution planning
├── README.md                  # English documentation
├── README.zh-CN.md            # Chinese documentation
├── LICENSE                    # MIT License
└── .gitignore                 # Git ignore file
```

---

## 🎯 Use Cases

### Use Case 1: Auto-Generate Annual Report

```javascript
const { generatePresentation } = require('./skills/pptx-templates/template-generator.js');

generatePresentation({
  template: 'executive',
  title: '2025 Annual Operations Report',
  subtitle: 'Moving Forward · Creating Glory',
  slides: [
    // Key metrics slide
    {
      type: 'data',
      title: '2025 Key Metrics',
      metrics: [
        { icon: '📊', value: '128,456', label: 'Total Deliveries', change: '+156%' },
        { icon: '💰', value: '28.65B', label: 'Revenue', change: '+198%' },
        { icon: '📈', value: '22.3%', label: 'Gross Margin', change: '+5.8%' },
        { icon: '⭐', value: '97.2', label: 'Satisfaction', change: '+3.1%' }
      ]
    },
    // Section transition
    {
      type: 'section',
      number: '01',
      title: 'Financial Performance',
      subtitle: 'Steady Growth · Profit Breakthrough'
    },
    // Comparison slide
    {
      type: 'comparison',
      title: 'Revenue Structure Comparison',
      items: [
        {
          title: '2024 Revenue',
          points: ['Car Sales: 58%', 'Gov Subsidy: 35%', 'Other: 7%'],
          stat: { value: '11.95B', label: 'Total Revenue' }
        },
        {
          title: '2025 Revenue',
          points: ['Car Sales: 68%', 'Software: 12%', 'Other: 20%'],
          stat: { value: '28.65B', label: 'Total Revenue' }
        }
      ]
    }
  ],
  outputPath: '2025-annual-report.pptx'
});
```

### Use Case 2: Automated Market Research

```bash
# One-click market research report generation (auto search → extract data → generate PPT)
node tools/workflow-engine.js run market-research-report
```

### Use Case 3: Knowledge Management and Reuse

```bash
# Archive after project completion
node tools/knowledge-base.js archive "Project A" project "Description" "tag1,tag2" "Summary"

# Search historical experience before starting new project
node tools/knowledge-base.js search "annual report"

# Get smart recommendations
node tools/knowledge-base.js recommend "generate PPT"
```

### Use Case 4: Auto-Archive Workflow Results

```javascript
const { engine } = require('./tools/workflow-engine.js');
const { autoArchive } = require('./tools/auto-archive.js');

// Run workflow
const result = await engine.run('market-research-report');

// Auto-archive to knowledge base
if (result.success) {
  await autoArchive(result);
}
```

---

## 📊 Tech Stack

- **Node.js** 18+
- **pptxgenjs** 4.0+
- **JavaScript** ES6+

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

### Development Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details

### 📜 Open Source Declaration

- ✅ **100% Original Code** - All core code is hand-written
- ✅ **Fully Open Source** - MIT License, free to use
- ✅ **Business Friendly** - Can be used in commercial projects

Detailed open source declaration: [OPEN-SOURCE-NOTICE.md](OPEN-SOURCE-NOTICE.md)  
Third-party components: [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)

---

## 📈 Project Status

### Completed
- ✅ PPT Template Library (9 color schemes, 5 slide types)
- ✅ Workflow Engine (skill orchestration and automation)
- ✅ Knowledge Management System (archiving, search, recommendations)
- ✅ Auto-archiving tool
- ✅ Complete documentation

### Planned
- 🔄 More workflow skill integrations
- 🔄 Vector search support (semantic search)
- 🔄 Knowledge graph construction
- 🔄 Multi-modal content generation

---

## 📧 Contact

- **Author**: sleep-vil
- **GitHub**: https://github.com/sleep-vil
- **Project**: https://github.com/sleep-vil/openclaw-custom-skills

---

**Continuously evolving... 🚀**

*Last updated: April 2, 2026*
