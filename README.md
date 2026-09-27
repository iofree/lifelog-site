# 人生笔记官网

基于 VitePress 构建的现代化应用官网，采用简洁的 Notion 风格设计，支持明暗色切换。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
├── .vitepress/
│   ├── config.ts          # VitePress 配置
│   └── theme/             # 自定义主题
│       ├── components/    # Vue 组件
│       ├── custom.css     # 自定义样式
│       └── index.ts       # 主题入口
├── assets/                # 静态资源
│   ├── app-store/        # 当前商店截图与 source.json 来源记录
│   ├── img/              # 历史功能截图
│   ├── screenshot/       # 历史主要截图
│   ├── black.png         # 手机模型
│   ├── appstore.png      # App Store 图标
│   └── playstore.png     # Google Play 图标
├── config/
│   └── screenshots.js    # 截图配置文件
├── index/
│   ├── zh/index.md       # 中文首页
│   └── en/index.md       # 英文首页
└── md/                   # 其他页面
    ├── zh/               # 中文页面
    └── en/               # 英文页面
```

## 🖼️ 首页截图配置

### 配置文件位置

截图配置文件位于 `config/screenshots.js`，中文使用中国区、英文使用美国区 App Store 页面当前默认展示的 iPhone 截图。来源、公开版本、尺寸和校验值记录在 `assets/app-store/source.json`；不使用 lookup 中其他设备的旧图替代。

### 配置格式

```javascript
import calendarScreenshot from '../assets/app-store/zh-CN/01.webp'
import englishScreenshot from '../assets/app-store/en-US/01.webp'

export const screenshotsConfig = {
  // 中文版截图配置
  zh: [
    {
      src: calendarScreenshot,           // 图片路径
      alt: '照片日历与生活记录',            // 按实际截图描述
      width: 880,
      height: 1912
    },
    // ... 更多截图
  ],

  // 英文版截图配置
  en: [
    {
      src: englishScreenshot,
      alt: 'Photo journal and timeline',
      width: 828,
      height: 1792
    },
    // ... 更多截图
  ]
}
```

### 如何修改截图

#### 1. 添加新截图

1. 从对应地区的 App Store 页面更新截图，保留顺序，并将等比例压缩后的文件放入 `assets/app-store/` 对应语言目录；同步更新 `source.json`
2. 在 `config/screenshots.js` 中添加配置：

```javascript
import newFeature from '../assets/app-store/zh-CN/new-feature.webp'

// 在对应语言的数组中添加
{
  src: newFeature,
  alt: '新功能描述',
  width: 880,
  height: 1912
}
```

**注意**：截图必须先通过 import 导入，构建器才会生成可访问的图片地址。固定 URL 的图标位于 `public/assets/`。首页文件使用相对路径 `../../config/screenshots.js` 导入配置。

#### 2. 删除截图

从 `config/screenshots.js` 中移除对应的配置项即可。

#### 3. 修改截图顺序

直接调整 `config/screenshots.js` 中数组项的顺序。

#### 4. 中英文使用不同截图

```javascript
import zhFeature from '../assets/app-store/zh-CN/01.webp'
import enFeature from '../assets/app-store/en-US/01.webp'

export const screenshotsConfig = {
  zh: [
    {
      src: zhFeature,  // 中文版专用截图
      alt: '中文功能描述',
      width: 880,
      height: 1912
    }
  ],
  en: [
    {
      src: enFeature,  // 英文版专用截图
      alt: 'English feature description',
      width: 828,
      height: 1792
    }
  ]
}
```

### 截图文件命名建议

- 按商店展示顺序命名：`01.webp`、`02.webp`
- 中英文分别存放：`assets/app-store/zh-CN/` 和 `assets/app-store/en-US/`
- 保持文件名简洁，避免特殊字符

## 🎨 主要组件说明

### HeroWithPhone 组件

融合的 Hero 区域，包含：
- 应用标题和描述
- 展示当前语言截图配置中的首张 App Store 截图，保持原始比例
- 功能亮点介绍
- 下载按钮

### FeatureGallery 组件

功能截图展示组件：
- 支持配置化截图管理
- 响应式网格布局
- 悬停动画效果
- 中英文分别配置

## 🔧 自定义配置

### 修改手机展示截图

更新 `config/screenshots.js` 中对应语言的首张截图及其真实宽高即可；Hero 与画廊共享同一来源。

### 修改下载按钮图标

- App Store: `assets/appstore.png`
- Google Play: `assets/playstore.png`

### 调整截图网格

在组件的 CSS 中修改：

```css
.screenshots-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}
```

## 🌓 主题支持

网站完全支持 VitePress 的明暗色切换功能：
- 使用 CSS 变量系统
- 自动适应系统主题
- 用户可手动切换

## 📱 响应式设计

- 桌面端：左右布局，手机展示在右侧
- 移动端：上下布局，居中对齐
- 截图网格：自适应列数

## 搜索、分享与内容维护

每次修改后运行 `npm run build`、`npm run test:seo` 和 `npm test`。SEO 检查覆盖 canonical、hreflang、结构化数据、站内链接、截图来源与尺寸、分享图和指南下载入口。

- 中英文指南应同时更新，功能与免费/会员条件以已发布版本和对应源代码为依据。
- `md/zh/changelog.md` 和 `md/en/changelog.md` 只记录公开发布版本，保留来源、时区和核对日期；开发分支版本不代表已发布版本。
- 更新 `assets/app-store/source.json` 及截图后，用 `python3 scripts/build-social-images.py` 重新生成两张 1200×630 分享图。脚本依赖 Pillow 和 macOS 的 Hiragino Sans GB / Avenir Next 字体；只输出像素，不分发字体文件。
- 分享图在 `public/assets/social/`，由页面语言选择；正文截图保留真实宽高、替代文本和懒加载。
- `node scripts/measure-assets.mjs dist` 可测量构建资源。结果为本地静态体积及压缩估计，不代表浏览器实际传输量或 Core Web Vitals。主题使用系统字体，不下载 VitePress 字体。

## 下载转化统计

默认不加载统计服务。部署平台需在**构建时**设置 `LIFELOG_GA4_ID=G-XXXXXXXXXX`；重新构建后，仅生产构建且访问 `https://lifelog.iofree.xyz` 时加载 GA4，localhost 和预览域名不发送数据。`LIFELOG_ANALYTICS_PROVIDER=none` 可关闭；如使用百度统计，显式设置 `LIFELOG_ANALYTICS_PROVIDER=baidu` 和 `LIFELOG_BAIDU_ID`。

GA4 数据流设置中，关闭增强型衡量的“网页浏览 → 根据浏览器历史记录事件进行网页更改”，避免与本站手动发送的 `page_view` 重复。页面初次访问、SPA 切换和前进后退使用同一统计逻辑，不统计仅查询参数或锚点变化。

下载点击事件名为 `download_click`，参数为 `platform`、`placement`、`page_path`、`locale`、`destination`。在 GA4 中将前四项注册为事件级自定义维度，将 `download_click` 标记为关键事件。目标地址移除查询参数与锚点，不读取输入框内容，也不阻塞下载跳转。点击次数不等于安装量；真实安装和商店转化需与 App Store Connect 数据一起分析。

启用后在正式域名依次检查首页、语言切换、指南与下载按钮；在 GA4 实时报告确认事件、页面路径和语言，无重复页面访问。未配置有效 ID 的构建只能验证关闭状态，不能据此宣称统计已接通。
