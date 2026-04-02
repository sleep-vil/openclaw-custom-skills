#!/usr/bin/env node
/**
 * PPT Template Generator
 * 基于最佳实践的可复用模板生成器
 */

const pptxgen = require("pptxgenjs");

// ============ 配色方案库 ============
const PALETTES = {
  // 商务系列
  executive: {
    name: "高管报告",
    primary: "1E2761", secondary: "CADCFC", accent: "FFFFFF",
    success: "10B981", warning: "F59E0B", text: "374151", muted: "6B7280",
    dark: "0D1B2A", light: "F9FAFB"
  },
  
  coral: {
    name: "创业融资",
    primary: "F96167", secondary: "F9E795", accent: "2F3C7E",
    success: "10B981", warning: "F59E0B", text: "374151", muted: "6B7280",
    dark: "1F2937", light: "FFFBEB"
  },
  
  ocean: {
    name: "产品发布",
    primary: "065A82", secondary: "1C7293", accent: "21295C",
    success: "0EA5E9", warning: "F59E0B", text: "374151", muted: "6B7280",
    dark: "134E5E", light: "F0F9FF"
  },
  
  // 技术系列
  charcoal: {
    name: "技术分享",
    primary: "36454F", secondary: "F2F2F2", accent: "212121",
    success: "10B981", warning: "F59E0B", text: "111827", muted: "6B7280",
    dark: "1F2937", light: "F9FAFB"
  },
  
  teal: {
    name: "API 文档",
    primary: "028090", secondary: "00A896", accent: "02C39A",
    success: "10B981", warning: "F59E0B", text: "374151", muted: "6B7280",
    dark: "115E59", light: "F0FDFA"
  },
  
  // 创意系列
  terracotta: {
    name: "品牌故事",
    primary: "B85042", secondary: "E7E8D1", accent: "A7BEAE",
    success: "10B981", warning: "F59E0B", text: "374151", muted: "6B7280",
    dark: "7C2D12", light: "FFFBEB"
  },
  
  cherry: {
    name: "营销战役",
    primary: "990011", secondary: "FCF6F5", accent: "2F3C7E",
    success: "10B981", warning: "F59E0B", text: "374151", muted: "6B7280",
    dark: "7F1D1D", light: "FEF2F2"
  },
  
  // 教育系列
  forest: {
    name: "学术研究",
    primary: "2C5F2D", secondary: "97BC62", accent: "F5F5F5",
    success: "10B981", warning: "F59E0B", text: "374151", muted: "6B7280",
    dark: "14532D", light: "F0FDF4"
  },
  
  sage: {
    name: "培训工作坊",
    primary: "84B59F", secondary: "69A297", accent: "50808E",
    success: "10B981", warning: "F59E0B", text: "374151", muted: "6B7280",
    dark: "14532D", light: "F0FDF4"
  }
};

// ============ 通用函数 ============

function addFooter(slide, num, total, COLORS) {
  slide.addText(`${num} / ${total}`, {
    x: 4.25, y: 5.4, w: 1.5, h: 0.2,
    fontSize: 9, color: COLORS.muted, align: 'center'
  });
}

function addTitle(slide, title, subtitle, COLORS) {
  slide.addText(title, {
    x: 1, y: 1.5, w: 8, h: 1.5,
    fontSize: 44, color: COLORS.accent, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 1, y: 2.8, w: 8, h: 0.6,
      fontSize: 18, color: COLORS.secondary,
      fontFace: 'Microsoft YaHei'
    });
  }
}

// ============ 模板函数 ============

/**
 * 模板 1: 经典商务封面
 */
function createExecutiveCover(pres, title, subtitle, COLORS) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.dark };
  
  // 左侧强调条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.3, h: 5.625,
    fill: { color: COLORS.success }
  });
  
  addTitle(slide, title, subtitle, COLORS);
  
  // 日期/信息
  slide.addText(new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' }), {
    x: 1, y: 4.5, w: 8, h: 0.4,
    fontSize: 12, color: COLORS.muted
  });
  
  return slide;
}

/**
 * 模板 2: 现代简约封面
 */
function createModernCover(pres, title, subtitle, COLORS) {
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  
  // 装饰几何图形
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 7, y: 2, w: 2.5, h: 2.5,
    fill: { color: COLORS.primary, transparency: 85 }
  });
  
  slide.addText(title, {
    x: 1, y: 1.5, w: 6, h: 1.5,
    fontSize: 44, color: COLORS.primary, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  
  if (subtitle) {
    slide.addText(subtitle, {
      x: 1, y: 2.8, w: 6, h: 0.6,
      fontSize: 18, color: COLORS.muted,
      fontFace: 'Microsoft YaHei'
    });
  }
  
  return slide;
}

/**
 * 模板 3: 数据概览页
 */
function createDataOverview(pres, title, metrics, COLORS) {
  const slide = pres.addSlide();
  
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 8, h: 0.8,
    fontSize: 32, color: COLORS.primary, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  
  // 4 个数据卡片
  const cardWidth = 2.1;
  metrics.forEach((m, i) => {
    const x = 0.5 + i * (cardWidth + 0.3);
    
    // 卡片背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.5, w: cardWidth, h: 1.2,
      fill: { color: 'FFFFFF' },
      line: { color: 'E5E7EB', width: 1 }
    });
    
    // 图标/emoji
    if (m.icon) {
      slide.addText(m.icon, {
        x: x + 0.3, y: 1.6, w: 1.5, h: 0.4,
        fontSize: 20
      });
    }
    
    // 数值
    slide.addText(m.value, {
      x: x + 0.3, y: 1.9, w: 1.5, h: 0.4,
      fontSize: 22, color: COLORS.primary, bold: true, align: 'center'
    });
    
    // 标签
    slide.addText(m.label, {
      x: x + 0.3, y: 2.35, w: 1.5, h: 0.3,
      fontSize: 9, color: COLORS.muted, align: 'center',
      fontFace: 'Microsoft YaHei'
    });
    
    // 变化
    if (m.change) {
      slide.addText(m.change, {
        x: x + 0.3, y: 2.55, w: 1.5, h: 0.2,
        fontSize: 9, color: m.change.startsWith('+') ? COLORS.success : COLORS.warning,
        align: 'center'
      });
    }
  });
  
  return slide;
}

/**
 * 模板 4: 章节过渡页
 */
function createSectionTransition(pres, number, title, subtitle, COLORS) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.primary };
  
  // 大数字背景
  slide.addText(number, {
    x: 6, y: 1.5, w: 3, h: 3,
    fontSize: 120, color: 'FFFFFF', bold: true,
    transparency: 80, align: 'center', valign: 'middle'
  });
  
  // 章节标题
  slide.addText(title, {
    x: 1, y: 2.5, w: 6, h: 1,
    fontSize: 36, color: 'FFFFFF', bold: true,
    fontFace: 'Microsoft YaHei'
  });
  
  if (subtitle) {
    slide.addText(subtitle, {
      x: 1, y: 3.5, w: 6, h: 0.6,
      fontSize: 16, color: COLORS.secondary,
      fontFace: 'Microsoft YaHei'
    });
  }
  
  return slide;
}

/**
 * 模板 5: 对比分析页
 */
function createComparison(pres, title, items, COLORS) {
  const slide = pres.addSlide();
  
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 8, h: 0.8,
    fontSize: 32, color: COLORS.primary, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  
  // 左右对比布局
  items.forEach((item, i) => {
    const x = i === 0 ? 0.5 : 5;
    
    // 卡片背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.5, w: 4.2, h: 3.5,
      fill: { color: i === 0 ? COLORS.light : '#F0FDF4' },
      line: { color: i === 0 ? COLORS.primary : COLORS.success, width: 2 }
    });
    
    // 标题
    slide.addText(item.title, {
      x: x + 0.3, y: 1.6, w: 3.8, h: 0.6,
      fontSize: 18, color: i === 0 ? COLORS.primary : COLORS.success,
      bold: true, fontFace: 'Microsoft YaHei'
    });
    
    // 内容
    if (item.points) {
      item.points.forEach((point, j) => {
        slide.addText([
          { text: "• " + point, options: { fontSize: 11, fontFace: 'Microsoft YaHei' } }
        ], {
          x: x + 0.3, y: 2.3 + j * 0.5, w: 3.8, h: 0.4
        });
      });
    }
    
    // 关键数据
    if (item.stat) {
      slide.addText(item.stat.value, {
        x: x + 0.3, y: 4.2, w: 3.8, h: 0.5,
        fontSize: 24, color: COLORS.primary, bold: true
      });
      slide.addText(item.stat.label, {
        x: x + 0.3, y: 4.6, w: 3.8, h: 0.3,
        fontSize: 9, color: COLORS.muted, fontFace: 'Microsoft YaHei'
      });
    }
  });
  
  return slide;
}

/**
 * 模板 6: 时间线页
 */
function createTimeline(pres, title, events, COLORS) {
  const slide = pres.addSlide();
  
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 8, h: 0.8,
    fontSize: 32, color: COLORS.primary, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  
  const startY = 1.5;
  const gap = (5 - startY) / (events.length - 1 || 1);
  
  // 中心线
  slide.addShape(pres.shapes.LINE, {
    x: 4.5, y: startY - 0.2, w: 0, h: 5 - startY + 0.4,
    line: { color: COLORS.primary, width: 3 }
  });
  
  events.forEach((event, i) => {
    const y = startY + i * gap;
    const x = i % 2 === 0 ? 0.5 : 5.5;
    const isLeft = i % 2 === 0;
    
    // 节点
    slide.addShape(pres.shapes.OVAL, {
      x: 4.2, y: y - 0.15, w: 0.6, h: 0.6,
      fill: { color: COLORS.primary }
    });
    
    // 连接线
    slide.addShape(pres.shapes.LINE, {
      x: isLeft ? 4.5 : 4.8, y: y, w: isLeft ? -3.8 : 1.2, h: 0,
      line: { color: COLORS.muted, width: 1, dashType: 'dash' }
    });
    
    // 日期
    slide.addText(event.date, {
      x: x + (isLeft ? 0 : -1.5), y: y - 0.5, w: 1.5, h: 0.4,
      fontSize: 10, color: COLORS.primary, bold: true,
      align: isLeft ? 'right' : 'left'
    });
    
    // 标题
    slide.addText(event.title, {
      x: x + (isLeft ? 0.2 : -1.7), y: y, w: 3.8, h: 0.5,
      fontSize: 12, color: COLORS.text, bold: true,
      align: isLeft ? 'left' : 'right', fontFace: 'Microsoft YaHei'
    });
    
    // 描述
    if (event.desc) {
      slide.addText(event.desc, {
        x: x + (isLeft ? 0.2 : -1.7), y: y + 0.4, w: 3.8, h: 0.4,
        fontSize: 9, color: COLORS.muted,
        align: isLeft ? 'left' : 'right', fontFace: 'Microsoft YaHei'
      });
    }
  });
  
  return slide;
}

/**
 * 模板 7: 总结封底
 */
function createConclusion(pres, title, keyPoints, COLORS) {
  const slide = pres.addSlide();
  slide.background = { color: COLORS.dark };
  
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.3, h: 5.625,
    fill: { color: COLORS.success }
  });
  
  slide.addText(title || '感谢聆听', {
    x: 1, y: 1.5, w: 8, h: 1.5,
    fontSize: 44, color: COLORS.accent, bold: true,
    fontFace: 'Microsoft YaHei'
  });
  
  if (keyPoints && keyPoints.length > 0) {
    keyPoints.forEach((point, i) => {
      slide.addText([
        { text: "• " + point, options: { fontSize: 12, color: COLORS.muted, fontFace: 'Microsoft YaHei' } }
      ], {
        x: 1, y: 3 + i * 0.5, w: 8, h: 0.4
      });
    });
  }
  
  return slide;
}

// ============ 主生成函数 ============

async function generatePresentation(options) {
  const {
    template = 'executive',
    title,
    subtitle,
    slides = [],
    outputPath = 'presentation.pptx'
  } = options;
  
  const COLORS = PALETTES[template] || PALETTES.executive;
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'PPT Template Generator';
  pres.title = title;
  
  console.log(`🎨 使用模板：${COLORS.name} (${template})`);
  
  // 添加封面
  if (template === 'executive') {
    createExecutiveCover(pres, title, subtitle, COLORS);
  } else {
    createModernCover(pres, title, subtitle, COLORS);
  }
  
  // 添加内容页
  slides.forEach((slideConfig, index) => {
    const slide = pres.addSlide();
    
    switch (slideConfig.type) {
      case 'data':
        Object.assign(slide, createDataOverview(pres, slideConfig.title, slideConfig.metrics, COLORS));
        break;
      case 'section':
        Object.assign(slide, createSectionTransition(pres, slideConfig.number, slideConfig.title, slideConfig.subtitle, COLORS));
        break;
      case 'comparison':
        Object.assign(slide, createComparison(pres, slideConfig.title, slideConfig.items, COLORS));
        break;
      case 'timeline':
        Object.assign(slide, createTimeline(pres, slideConfig.title, slideConfig.events, COLORS));
        break;
      default:
        // 默认内容页
        slide.addText(slideConfig.title, {
          x: 0.5, y: 0.3, w: 8, h: 0.8,
          fontSize: 32, color: COLORS.primary, bold: true,
          fontFace: 'Microsoft YaHei'
        });
        if (slideConfig.content) {
          slide.addText(slideConfig.content, {
            x: 0.5, y: 1.5, w: 8, h: 3.5,
            fontSize: 14, color: COLORS.text,
            fontFace: 'Microsoft YaHei'
          });
        }
    }
    
    addFooter(slide, index + 2, slides.length + 2, COLORS);
  });
  
  // 添加封底
  createConclusion(pres, '感谢聆听', [], COLORS);
  
  // 保存文件
  await pres.writeFile({ fileName: outputPath });
  console.log(`✅ PPT 生成成功：${outputPath}`);
  console.log(`📊 共 ${slides.length + 2} 页`);
  
  return outputPath;
}

// ============ 导出 ============

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PALETTES,
    generatePresentation,
    createExecutiveCover,
    createModernCover,
    createDataOverview,
    createSectionTransition,
    createComparison,
    createTimeline,
    createConclusion
  };
}

// ============ CLI 使用示例 ============

if (require.main === module) {
  // 示例：生成一个完整的演示文稿
  (async () => {
    try {
      await generatePresentation({
        template: 'executive',
        title: '2026 年 Q1 业务报告',
        subtitle: '数据驱动 · 持续创新',
        slides: [
          {
            type: 'data',
            title: '核心指标概览',
            metrics: [
              { icon: '📊', value: '28,456', label: '交付量', change: '+183%' },
              { icon: '💰', value: '71.2 亿', label: '营业收入', change: '+245%' },
              { icon: '📈', value: '17.8%', label: '毛利率', change: '+3.2%' },
              { icon: '⭐', value: '96.5', label: '满意度', change: '+2.1%' }
            ]
          },
          {
            type: 'section',
            number: '01',
            title: '市场表现',
            subtitle: '交付量与收入分析'
          },
          {
            type: 'comparison',
            title: '竞争优势分析',
            items: [
              {
                title: '我们的优势',
                points: ['技术创新领先', '用户体验优秀', '成本控制有效'],
                stat: { value: 'Top 5', label: '市场份额排名' }
              },
              {
                title: '市场机会',
                points: ['下沉市场潜力', '新产品线拓展', '国际化布局'],
                stat: { value: '156%', label: '增速领先行业' }
              }
            ]
          },
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
        ],
        outputPath: '示例演示文稿.pptx'
      });
    } catch (err) {
      console.error('❌ 生成失败:', err);
    }
  })();
}
