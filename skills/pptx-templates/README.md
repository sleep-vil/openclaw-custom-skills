# PPT 模板使用指南

快速上手使用 PPT 模板生成器。

## 📦 安装依赖

```bash
# 已全局安装
sudo npm install -g pptxgenjs

# 设置环境变量（如需要）
export NODE_PATH=/usr/lib/node_modules
```

## 🎨 可用模板

| 模板 ID | 名称 | 适用场景 | 配色风格 |
|--------|------|---------|---------|
| `executive` | 高管报告 | 季度/年度报告、董事会汇报 | 深蓝 + 冰蓝 + 白 |
| `coral` | 创业融资 | 融资路演、产品发布 | 珊瑚红 + 金色 + 深蓝 |
| `ocean` | 产品发布 | 新产品介绍、技术演示 | 深海蓝 + 青色 + 午夜蓝 |
| `charcoal` | 技术分享 | 技术架构、代码评审 | 炭灰 + 白 + 黑 |
| `teal` | API 文档 | 开发者文档、集成指南 | 青色 + 海沫绿 + 薄荷 |
| `terracotta` | 品牌故事 | 企业文化、价值观传播 | 赤陶 + 沙色 + 鼠尾草 |
| `cherry` | 营销战役 | 营销计划、效果分析 | 樱桃红 + 米白 + 海军蓝 |
| `forest` | 学术研究 | 论文答辩、研究分享 | 森林绿 + 苔藓绿 + 米色 |
| `sage` | 培训工作坊 | 培训课程、研讨会 | 鼠尾草绿 + 尤加利 + 板岩 |

## 📝 快速开始

### 方法 1: 命令行运行

```bash
cd /home/ocxlsvil/.openclaw/workspace
NODE_PATH=/usr/lib/node_modules node skills/pptx-templates/template-generator.js
```

### 方法 2: Node.js 脚本

```javascript
const { generatePresentation, PALETTES } = require('./skills/pptx-templates/template-generator.js');

// 生成演示文稿
generatePresentation({
  template: 'executive',  // 选择模板
  title: '2026 年 Q1 业务报告',
  subtitle: '数据驱动 · 持续创新',
  slides: [
    // 内容页配置...
  ],
  outputPath: 'output.pptx'
}).then(path => console.log('生成成功:', path));
```

## 📊 页面类型

### 1. 数据概览页 (`type: 'data'`)

```javascript
{
  type: 'data',
  title: '核心指标概览',
  metrics: [
    { icon: '📊', value: '28,456', label: '交付量', change: '+183%' },
    { icon: '💰', value: '71.2 亿', label: '营业收入', change: '+245%' },
    { icon: '📈', value: '17.8%', label: '毛利率', change: '+3.2%' },
    { icon: '⭐', value: '96.5', label: '满意度', change: '+2.1%' }
  ]
}
```

**特点:**
- 4 个数据卡片水平排列
- 支持 emoji 图标
- 自动显示正负变化（绿色/橙色）

### 2. 章节过渡页 (`type: 'section'`)

```javascript
{
  type: 'section',
  number: '01',
  title: '市场表现',
  subtitle: '交付量与收入分析'
}
```

**特点:**
- 深色背景
- 大数字装饰
- 章节标题突出

### 3. 对比分析页 (`type: 'comparison'`)

```javascript
{
  type: 'comparison',
  title: '竞争优势分析',
  items: [
    {
      title: '我们的优势',
      points: ['技术创新', '用户体验', '成本控制'],
      stat: { value: 'Top 5', label: '市场份额排名' }
    },
    {
      title: '市场机会',
      points: ['下沉市场', '新产品线', '国际化'],
      stat: { value: '156%', label: '增速领先' }
    }
  ]
}
```

**特点:**
- 左右两栏对比布局
- 每栏可包含要点列表
- 底部显示关键数据

### 4. 时间线页 (`type: 'timeline'`)

```javascript
{
  type: 'timeline',
  title: '发展历程',
  events: [
    { date: '2024 Q1', title: '产品发布', desc: 'SU7 正式上市' },
    { date: '2024 Q3', title: '产能爬坡', desc: '月交付破万' },
    { date: '2025 Q1', title: '规模效应', desc: '实现盈利' },
    { date: '2026 Q1', title: '市场突破', desc: '进入 Top 5' }
  ]
}
```

**特点:**
- 中心线 + 左右交替布局
- 支持日期、标题、描述
- 虚线连接节点

### 5. 默认内容页

```javascript
{
  type: 'default',  // 或省略 type
  title: '章节标题',
  content: '正文内容，可以是任意文本'
}
```

## 🎯 完整示例

```javascript
const { generatePresentation } = require('./skills/pptx-templates/template-generator.js');

generatePresentation({
  template: 'coral',  // 创业融资模板
  title: '小米汽车融资路演',
  subtitle: '智领出行 · 重塑未来',
  slides: [
    // 1. 核心数据
    {
      type: 'data',
      title: '关键里程碑',
      metrics: [
        { icon: '🚗', value: '28,456', label: '累计交付', change: '+183%' },
        { icon: '💰', value: '71.2 亿', label: 'Q1 收入', change: '+245%' },
        { icon: '⚡', value: '1,280', label: '超充站', change: '+50%' },
        { icon: '⭐', value: '96.5', label: '用户满意度', change: '+2%' }
      ]
    },
    
    // 2. 章节 1
    {
      type: 'section',
      number: '01',
      title: '市场规模',
      subtitle: '新能源汽车赛道分析'
    },
    
    // 3. 对比分析
    {
      type: 'comparison',
      title: '竞争格局',
      items: [
        {
          title: '市场领导者',
          points: ['特斯拉：品牌认知强', '比亚迪：规模优势', '蔚来：服务体验好'],
          stat: { value: '43%', label: '合计市场份额' }
        },
        {
          title: '我们的机会',
          points: ['技术差异化', '性价比优势', '生态协同'],
          stat: { value: 'Top 5', label: '增速排名' }
        }
      ]
    },
    
    // 4. 章节 2
    {
      type: 'section',
      number: '02',
      title: '产品优势',
      subtitle: '技术创新与用户体验'
    },
    
    // 5. 发展历程
    {
      type: 'timeline',
      title: '成长轨迹',
      events: [
        { date: '2021', title: '战略启动', desc: '宣布造车计划' },
        { date: '2023', title: '产品发布', desc: 'SU7 正式发布' },
        { date: '2024', title: '规模交付', desc: '月交付破万' },
        { date: '2026', title: '市场突破', desc: '进入行业 Top 5' }
      ]
    },
    
    // 6. 融资需求
    {
      type: 'data',
      title: '融资计划',
      metrics: [
        { icon: '💵', value: '10 亿', label: '融资金额', change: '' },
        { icon: '📅', value: '18 个月', label: '资金使用期', change: '' },
        { icon: '🎯', value: '50 万', label: '年度目标', change: '' },
        { icon: '🌍', value: '10 国', label: '海外拓展', change: '' }
      ]
    }
  ],
  outputPath: '小米汽车融资路演.pptx'
});
```

## 🎨 自定义配色

```javascript
const { PALETTES } = require('./skills/pptx-templates/template-generator.js');

// 查看可用配色
console.log(Object.keys(PALETTES));

// 自定义新配色
PALETTES.myCustom = {
  name: '我的定制',
  primary: 'FF6B6B',      // 主色
  secondary: '4ECDC4',    // 辅色
  accent: 'FFE66D',       // 强调色
  success: '10B981',      // 成功色
  warning: 'F59E0B',      // 警告色
  text: '374151',         // 正文色
  muted: '6B7280',        // 弱化色
  dark: '1F2937',         // 深色背景
  light: 'F9FAFB'         // 浅色背景
};

generatePresentation({
  template: 'myCustom',
  // ...
});
```

## 📐 尺寸规范

- **幻灯片尺寸:** 16:9 (10" x 5.625")
- **安全边距:** 0.5" 从边缘
- **元素间距:** 0.3-0.5"
- **字体大小:**
  - 标题：32-44pt
  - 副标题：18-24pt
  - 正文：11-14pt
  - 注释：9-10pt

## ✅ 最佳实践

1. **选择匹配的模板:** 根据内容类型选择配色方案
2. **保持简洁:** 每页聚焦一个核心信息
3. **数据可视化:** 优先使用图表而非文字
4. **一致性:** 同一演示文稿使用同一模板
5. **对比度:** 确保文字与背景对比清晰
6. **留白:** 不要填满每一寸空间

## 🔧 故障排查

### 问题：找不到模块 'pptxgenjs'

```bash
# 检查安装
npm list -g pptxgenjs

# 设置环境变量
export NODE_PATH=/usr/lib/node_modules

# 或重新安装
sudo npm install -g pptxgenjs
```

### 问题：中文显示乱码

确保使用支持中文字体：
```javascript
fontFace: 'Microsoft YaHei'  // Windows
fontFace: 'PingFang SC'      // macOS
fontFace: 'Noto Sans CJK SC' // Linux
```

### 问题：生成的 PPT 打不开

1. 检查文件是否完整生成（文件大小应 > 10KB）
2. 使用 LibreOffice 或 PowerPoint 2016+ 打开
3. 检查是否有权限问题

## 📚 参考资源

- [TEMPLATES.md](TEMPLATES.md) - 完整模板文档
- [SKILL.md](../pptx/SKILL.md) - Anthropic PPTX 技能指南
- [pptxgenjs.md](../pptx/pptxgenjs.md) - API 详细文档

## 🚀 下一步

1. 选择一个模板开始
2. 准备你的内容数据
3. 运行生成脚本
4. 在 PowerPoint 中微调
5. 保存为公司标准模板
