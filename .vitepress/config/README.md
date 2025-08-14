# VitePress 配置模块

## 路由重写功能 (rewrites.ts)

### 功能说明

`generateRewrites` 函数动态生成 VitePress 的路由重写规则，支持：

- **自动发现文档**: 扫描 `md/zh/` 和 `md/en/` 目录下的所有 `.md` 文件
- **智能路由映射**: 
  - 普通文档映射到 `docs/` 路径
  - `privacy.md` 和 `terms.md` 映射到根路径
- **多语言支持**: 中文文档映射到 `/docs/`，英文文档映射到 `/en/docs/`
- **容错处理**: 目录不存在时使用后备配置

### 使用方法

```typescript
import { generateRewrites } from './rewrites'

// 使用当前工作目录
const rewrites = generateRewrites()

// 使用指定目录
const rewrites = generateRewrites('/path/to/project')
```

### 映射规则

| 源文件 | 目标路径 | 说明 |
|--------|----------|------|
| `md/zh/qa.md` | `docs/qa.md` | 中文普通文档 |
| `md/zh/privacy.md` | `privacy.md` | 中文隐私政策 |
| `md/en/qa.md` | `en/docs/qa.md` | 英文普通文档 |
| `md/en/terms.md` | `en/terms.md` | 英文服务条款 |

### 测试覆盖

测试文件 `rewrites.test.ts` 覆盖了以下场景：

- ✅ 基础索引页面映射
- ✅ 空目录处理
- ✅ 普通文档映射
- ✅ 特殊文档（privacy/terms）映射
- ✅ 非 Markdown 文件过滤
- ✅ 混合文档类型处理
- ✅ 目录不存在时的后备机制
- ✅ 大量文件的性能测试

### 运行测试

```bash
# 运行所有测试
npm test

# 只运行路由重写测试
npm test -- .vitepress/config/rewrites.test.ts

# 监听模式
npm run test:watch
```