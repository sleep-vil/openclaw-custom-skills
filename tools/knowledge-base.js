#!/usr/bin/env node
/**
 * Knowledge Base Manager - 知识管理系统
 * 自动归档、语义搜索、智能推荐
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============ 配置 ============

const CONFIG = {
  basePath: path.join(__dirname, '..', 'knowledge-base'),
  projectsDir: path.join(__dirname, '..', 'knowledge-base', 'projects'),
  patternsDir: path.join(__dirname, '..', 'knowledge-base', 'patterns'),
  lessonsDir: path.join(__dirname, '..', 'knowledge-base', 'lessons'),
  indexFile: path.join(__dirname, '..', 'knowledge-base', 'index.json'),
};

// ============ 知识索引 ============

class KnowledgeIndex {
  constructor() {
    this.index = this.loadIndex();
  }

  /**
   * 加载索引
   */
  loadIndex() {
    try {
      if (fs.existsSync(CONFIG.indexFile)) {
        return JSON.parse(fs.readFileSync(CONFIG.indexFile, 'utf-8'));
      }
    } catch (error) {
      console.warn('⚠️ 索引文件不存在或损坏，创建新索引');
    }
    return {
      version: '1.0',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      entries: []
    };
  }

  /**
   * 保存索引
   */
  saveIndex() {
    this.index.updated = new Date().toISOString();
    fs.writeFileSync(CONFIG.indexFile, JSON.stringify(this.index, null, 2), 'utf-8');
  }

  /**
   * 添加条目
   */
  addEntry(entry) {
    entry.id = this.generateId();
    entry.timestamp = new Date().toISOString();
    this.index.entries.push(entry);
    this.saveIndex();
    return entry.id;
  }

  /**
   * 生成唯一 ID
   */
  generateId() {
    return `kb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 搜索条目（简单关键词匹配）
   */
  search(query, options = {}) {
    const {
      maxResults = 10,
      minScore = 0.3,
      filters = {}
    } = options;

    const queryLower = query.toLowerCase();
    const keywords = queryLower.split(/\s+/).filter(k => k.length > 1);

    const results = this.index.entries
      .map(entry => {
        let score = 0;
        const text = `${entry.title} ${entry.description || ''} ${entry.tags?.join(' ') || ''}`.toLowerCase();
        
        // 关键词匹配
        keywords.forEach(keyword => {
          if (text.includes(keyword)) {
            score += 0.3;
          }
          if (entry.title?.toLowerCase().includes(keyword)) {
            score += 0.2;
          }
          if (entry.tags?.some(tag => tag.toLowerCase().includes(keyword))) {
            score += 0.1;
          }
        });

        // 类型匹配
        if (filters.type && entry.type === filters.type) {
          score += 0.2;
        }

        // 时间衰减（最近的权重更高）
        const daysOld = (Date.now() - new Date(entry.timestamp)) / (1000 * 60 * 60 * 24);
        score += Math.max(0, 0.1 - daysOld * 0.001);

        return { ...entry, score: Math.round(score * 100) / 100 };
      })
      .filter(entry => entry.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);

    return results;
  }

  /**
   * 获取所有条目统计
   */
  getStats() {
    const entries = this.index.entries;
    return {
      total: entries.length,
      byType: this.groupBy(entries, 'type'),
      byProject: this.groupBy(entries, 'project'),
      recent: entries.slice(-10).reverse(),
      tags: this.extractAllTags(entries)
    };
  }

  groupBy(array, key) {
    return array.reduce((acc, item) => {
      const k = item[key] || 'unknown';
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
  }

  extractAllTags(entries) {
    const tagMap = {};
    entries.forEach(entry => {
      entry.tags?.forEach(tag => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    });
    return Object.entries(tagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
  }
}

// ============ 项目归档器 ============

class ProjectArchiver {
  constructor(index) {
    this.index = index;
    this.ensureDirs();
  }

  ensureDirs() {
    [CONFIG.projectsDir, CONFIG.patternsDir, CONFIG.lessonsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * 归档项目
   */
  archiveProject(project) {
    const {
      name,
      type = 'project',
      description,
      files = [],
      summary,
      tags = [],
      metadata = {}
    } = project;

    const projectDir = path.join(CONFIG.projectsDir, name);
    
    // 创建项目目录
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    // 保存摘要
    if (summary) {
      fs.writeFileSync(
        path.join(projectDir, 'summary.md'),
        this.formatSummary(summary),
        'utf-8'
      );
    }

    // 保存元数据
    const projectData = {
      name,
      type,
      description,
      tags,
      metadata,
      created: metadata.created || new Date().toISOString(),
      files: files.map(f => ({
        name: f.name,
        path: f.path,
        size: f.size,
        type: f.type
      }))
    };

    fs.writeFileSync(
      path.join(projectDir, 'metadata.json'),
      JSON.stringify(projectData, null, 2),
      'utf-8'
    );

    // 添加到索引
    const entryId = this.index.addEntry({
      type: 'project',
      title: name,
      description: description || summary?.substring(0, 200),
      tags,
      path: projectDir,
      project: name,
      metadata: projectData
    });

    console.log(`✅ 项目已归档：${name} (ID: ${entryId})`);
    return { id: entryId, path: projectDir };
  }

  formatSummary(summary) {
    return `# 项目摘要\n\n${summary}\n\n---\n\n*自动生成于 ${new Date().toISOString()}*`;
  }

  /**
   * 归档模式/模板
   */
  archivePattern(pattern) {
    const { name, type, description, template, tags = [] } = pattern;

    const patternFile = path.join(CONFIG.patternsDir, `${name}.json`);
    
    const patternData = {
      name,
      type: type || 'pattern',
      description,
      tags,
      template,
      created: new Date().toISOString()
    };

    fs.writeFileSync(patternFile, JSON.stringify(patternData, null, 2), 'utf-8');

    const entryId = this.index.addEntry({
      type: 'pattern',
      title: name,
      description,
      tags,
      path: patternFile
    });

    console.log(`✅ 模式已归档：${name} (ID: ${entryId})`);
    return { id: entryId, path: patternFile };
  }

  /**
   * 记录经验教训
   */
  recordLesson(lesson) {
    const { title, category, content, tags = [], project } = lesson;

    const lessonFile = path.join(
      CONFIG.lessonsDir,
      `${Date.now()}_${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`
    );

    const lessonContent = `# ${title}\n\n## 分类
${category}

## 内容
${content}

## 标签
${tags.join(', ')}

${project ? `## 关联项目
${project}` : ''}

---
*记录于 ${new Date().toISOString()}*
`;

    fs.writeFileSync(lessonFile, lessonContent, 'utf-8');

    const entryId = this.index.addEntry({
      type: 'lesson',
      title,
      description: content.substring(0, 200),
      tags: [...tags, category],
      path: lessonFile,
      project
    });

    console.log(`✅ 经验已记录：${title} (ID: ${entryId})`);
    return { id: entryId, path: lessonFile };
  }
}

// ============ 智能推荐器 ============

class SmartRecommender {
  constructor(index) {
    this.index = index;
  }

  /**
   * 基于上下文推荐相关知识
   */
  recommend(context, options = {}) {
    const {
      maxResults = 5,
      type = null
    } = options;

    // 提取上下文关键词
    const keywords = this.extractKeywords(context);
    
    // 搜索相关知识
    const searchResults = this.index.search(context, {
      maxResults: maxResults * 2,
      filters: type ? { type } : {}
    });

    // 评分和排序
    const recommendations = searchResults
      .map(entry => ({
        ...entry,
        relevance: this.calculateRelevance(entry, keywords)
      }))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, maxResults);

    return recommendations;
  }

  extractKeywords(text) {
    // 简单关键词提取（实际应该用 NLP）
    const stopWords = ['的', '了', '在', '是', '我', '有', '和', '就', '不', '人'];
    return text
      .match(/[\u4e00-\u9fa5]{2,}|[a-zA-Z]{3,}/g)
      ?.filter(word => !stopWords.includes(word))
      .slice(0, 10) || [];
  }

  calculateRelevance(entry, keywords) {
    let score = entry.score || 0;
    
    // 标签匹配加分
    entry.tags?.forEach(tag => {
      keywords.forEach(keyword => {
        if (tag.toLowerCase().includes(keyword.toLowerCase())) {
          score += 0.2;
        }
      });
    });

    return Math.round(score * 100) / 100;
  }

  /**
   * 推荐相关项目
   */
  recommendProjects(currentProject, maxResults = 3) {
    return this.index.search(currentProject, {
      maxResults,
      filters: { type: 'project' }
    });
  }

  /**
   * 推荐适用模式
   */
  recommendPatterns(taskDescription, maxResults = 3) {
    return this.index.search(taskDescription, {
      maxResults,
      filters: { type: 'pattern' }
    });
  }

  /**
   * 推荐相关经验
   */
  recommendLessons(context, maxResults = 3) {
    return this.index.search(context, {
      maxResults,
      filters: { type: 'lesson' }
    });
  }
}

// ============ 知识管理系统 ============

class KnowledgeBaseManager {
  constructor() {
    this.index = new KnowledgeIndex();
    this.archiver = new ProjectArchiver(this.index);
    this.recommender = new SmartRecommender(this.index);
  }

  /**
   * 归档项目
   */
  archiveProject(project) {
    return this.archiver.archiveProject(project);
  }

  /**
   * 归档模式
   */
  archivePattern(pattern) {
    return this.archiver.archivePattern(pattern);
  }

  /**
   * 记录经验
   */
  recordLesson(lesson) {
    return this.archiver.recordLesson(lesson);
  }

  /**
   * 搜索知识
   */
  search(query, options = {}) {
    return this.index.search(query, options);
  }

  /**
   * 获取统计
   */
  getStats() {
    return this.index.getStats();
  }

  /**
   * 智能推荐
   */
  recommend(context, options = {}) {
    return this.recommender.recommend(context, options);
  }

  /**
   * 获取项目列表
   */
  listProjects() {
    if (!fs.existsSync(CONFIG.projectsDir)) {
      return [];
    }
    return fs.readdirSync(CONFIG.projectsDir)
      .filter(f => fs.statSync(path.join(CONFIG.projectsDir, f)).isDirectory());
  }

  /**
   * 获取项目详情
   */
  getProject(name) {
    const projectDir = path.join(CONFIG.projectsDir, name);
    if (!fs.existsSync(projectDir)) {
      return null;
    }

    const metadata = JSON.parse(
      fs.readFileSync(path.join(projectDir, 'metadata.json'), 'utf-8')
    );
    
    const summary = fs.existsSync(path.join(projectDir, 'summary.md'))
      ? fs.readFileSync(path.join(projectDir, 'summary.md'), 'utf-8')
      : null;

    return { ...metadata, summary };
  }
}

// ============ CLI 接口 ============

if (require.main === module) {
  const kb = new KnowledgeBaseManager();
  const args = process.argv.slice(2);

  if (args[0] === 'archive') {
    // 归档项目
    const project = {
      name: args[1] || 'untitled-project',
      type: args[2] || 'project',
      description: args[3] || '无描述',
      tags: args[4]?.split(',') || [],
      summary: args[5] || '无摘要'
    };
    kb.archiveProject(project);

  } else if (args[0] === 'search') {
    // 搜索
    const query = args.slice(1).join(' ');
    const results = kb.search(query);
    console.log(`\n🔍 搜索 "${query}" 找到 ${results.length} 个结果:\n`);
    results.forEach((r, i) => {
      console.log(`${i + 1}. ${r.title} [${r.type}] (得分：${r.score})`);
      console.log(`   描述：${r.description?.substring(0, 80)}...`);
      console.log(`   标签：${r.tags?.join(', ') || '无'}`);
      console.log();
    });

  } else if (args[0] === 'stats') {
    // 统计
    const stats = kb.getStats();
    console.log('\n📊 知识库统计:\n');
    console.log(`  总条目：${stats.total}`);
    console.log(`  按类型:`);
    Object.entries(stats.byType).forEach(([type, count]) => {
      console.log(`    • ${type}: ${count}`);
    });
    console.log(`  按项目:`);
    Object.entries(stats.byProject).forEach(([project, count]) => {
      console.log(`    • ${project}: ${count}`);
    });
    console.log(`  热门标签:`);
    stats.tags.slice(0, 10).forEach(([tag, count]) => {
      console.log(`    • ${tag}: ${count}`);
    });

  } else if (args[0] === 'recommend') {
    // 推荐
    const context = args.slice(1).join(' ');
    const recommendations = kb.recommend(context);
    console.log(`\n💡 基于 "${context}" 推荐:\n`);
    recommendations.forEach((r, i) => {
      console.log(`${i + 1}. ${r.title} [${r.type}] (相关度：${r.relevance})`);
      console.log(`   ${r.description?.substring(0, 80)}...`);
      console.log();
    });

  } else {
    console.log('知识管理系统 - 使用指南:\n');
    console.log('用法:');
    console.log('  node knowledge-base.js archive <name> <type> <desc> <tags> <summary>');
    console.log('  node knowledge-base.js search <query>');
    console.log('  node knowledge-base.js stats');
    console.log('  node knowledge-base.js recommend <context>\n');
    console.log('示例:');
    console.log('  node knowledge-base.js archive "项目 A" project "测试项目" "test,demo" "这是一个测试项目"');
    console.log('  node knowledge-base.js search "PPT 生成"');
    console.log('  node knowledge-base.js stats');
    console.log('  node knowledge-base.js recommend "年度报告"');
  }
}

// ============ 导出 ============

module.exports = {
  KnowledgeBaseManager,
  KnowledgeIndex,
  ProjectArchiver,
  SmartRecommender,
  CONFIG
};
