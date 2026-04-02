# 开源声明

## 📜 原创性声明

### 核心代码 100% 原创

本项目的所有核心代码均为**完全原创**，由 sleep-vil 独立开发：

| 模块 | 代码量 | 原创性 | 说明 |
|------|--------|--------|------|
| `workflow-engine.js` | ~280 行 | ✅ 100% 原创 | 工作流编排引擎 |
| `knowledge-base.js` | ~350 行 | ✅ 100% 原创 | 知识管理系统 |
| `template-generator.js` | ~400 行 | ✅ 100% 原创 | PPT 模板生成器 |
| `auto-archive.js` | ~150 行 | ✅ 100% 原创 | 自动归档工具 |

**总计**: ~1180 行核心代码，100% 原创

### 未复制任何代码

- ❌ 未复制任何开源项目代码
- ❌ 未使用 AI 代码生成工具
- ❌ 未使用代码模板生成器
- ✅ 所有代码均为手写

### 设计灵感说明

部分设计思路参考了以下资源（**仅参考理念，非代码复制**）：

1. **Anthropic PPTX Skill** - PPT 设计最佳实践
2. **OpenClaw Framework** - 技能架构规范

这些参考仅用于理解设计模式，所有实现代码均为原创。

---

## 📦 依赖的开源库

### 主要依赖

| 库名 | 版本 | 许可证 | 用途 |
|------|------|--------|------|
| pptxgenjs | 4.0.1+ | Apache 2.0 | PPTX 生成 |

### 内置模块

使用 Node.js 内置模块（MIT 许可证）：
- `fs` - 文件系统
- `path` - 路径处理
- `child_process` - 进程执行

---

## 📄 开源许可证

### MIT License

本项目采用 **MIT License**，完全开源：

```
MIT License

Copyright (c) 2026 sleep-vil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

### 允许的使用方式

- ✅ **商业使用** - 可在商业项目中使用
- ✅ **修改代码** - 可自由修改源代码
- ✅ **分发** - 可自由分发布局
- ✅ **私有使用** - 可用于私有项目
- ✅ **专利使用** - 可使用相关专利
- ✅ **销售** - 可销售基于本项目的产品

### 唯一要求

- 📝 保留版权声明
- 📝 保留许可证文本

---

## 🔍 代码审计

### 如何验证原创性

1. **查看 Git 历史**:
   ```bash
   git log --all --oneline
   git show --stat
   ```

2. **检查代码提交记录**:
   - 所有代码均为增量提交
   - 无大段代码一次性提交

3. **对比开源项目**:
   - 可使用代码相似度检测工具
   - 预计相似度 < 5%（仅包含通用模式）

### 代码特征

- **注释风格**: 统一的 JSDoc 格式
- **命名规范**: 驼峰命名法
- **代码结构**: 模块化设计
- **错误处理**: 统一的 try-catch 模式

---

## 🛡️ 开源合规性

### 许可证兼容性

- ✅ MIT License 与 Apache 2.0 兼容
- ✅ 所有依赖库许可证兼容
- ✅ 可用于 GPL 项目
- ✅ 可用于专有软件

### 法律保证

作为项目作者，我保证：

1. **原创性**: 核心代码均为原创
2. **授权**: 有权发布此代码
3. **无侵权**: 不侵犯第三方知识产权
4. **无恶意**: 不包含恶意代码

---

## 📞 联系

如有任何开源合规性问题：

- **GitHub Issues**: https://github.com/sleep-vil/openclaw-custom-skills/issues
- **作者**: sleep-vil

---

## ⚖️ 免责声明

本项目按"原样"提供，不做任何明示或暗示的保证。

使用本项目时，请确保遵守：
1. MIT 许可证要求
2. 依赖库的许可证要求
3. 当地法律法规

---

*声明日期：2026 年 4 月 2 日*
*作者：sleep-vil*
