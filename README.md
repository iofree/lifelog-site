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
│   ├── img/              # 功能截图
│   ├── screenshot/       # 主要截图
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

截图配置文件位于 `config/screenshots.js`，支持中英文分别配置不同的截图。

### 配置格式

```javascript
export const screenshotsConfig = {
  // 中文版截图配置
  zh: [
    {
      src: '/assets/img/1.png',           // 图片路径
      alt: '日历视图 - 按日期浏览你的生活记录'  // 图片描述
    },
    // ... 更多截图
  ],

  // 英文版截图配置
  en: [
    {
      src: '/assets/img/1.png',
      alt: 'Calendar View - Browse your life records by date'
    },
    // ... 更多截图
  ]
}
```

### 如何修改截图

#### 1. 添加新截图

1. 将新的截图文件放入 `assets/img/` 目录
2. 在 `config/screenshots.js` 中添加配置：

```javascript
// 在对应语言的数组中添加
{
  src: '/assets/img/new-feature.png',
  alt: '新功能描述'
}
```

**注意**：首页文件使用相对路径 `../../config/screenshots.js` 导入配置。

#### 2. 删除截图

从 `config/screenshots.js` 中移除对应的配置项即可。

#### 3. 修改截图顺序

直接调整 `config/screenshots.js` 中数组项的顺序。

#### 4. 中英文使用不同截图

```javascript
export const screenshotsConfig = {
  zh: [
    {
      src: '/assets/img/zh/feature1.png',  // 中文版专用截图
      alt: '中文功能描述'
    }
  ],
  en: [
    {
      src: '/assets/img/en/feature1.png',  // 英文版专用截图
      alt: 'English feature description'
    }
  ]
}
```

### 截图文件命名建议

- 使用有意义的文件名：`calendar-view.png`、`rich-editor.png`
- 中英文分别存放：`assets/img/zh/` 和 `assets/img/en/`
- 保持文件名简洁，避免特殊字符

## 🎨 主要组件说明

### HeroWithPhone 组件

融合的 Hero 区域，包含：
- 应用标题和描述
- 手机模型展示（使用 `assets/screenshot/main.png`）
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

替换 `assets/screenshot/main.png` 文件即可。

### 修改下载按钮图标

- App Store: `assets/appstore.png`
- Google Play: `assets/playstore.png`

### 修改手机模型

替换 `assets/black.png` 文件，建议使用透明背景的 PNG 格式。

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

## 🚀 部署

### GitHub Pages

1. 在 `.github/workflows/` 目录下创建部署配置
2. 推送到 GitHub 仓库
3. 启用 GitHub Pages

### Vercel

1. 连接 GitHub 仓库
2. 设置构建命令：`npm run build`
3. 设置输出目录：`.vitepress/dist`

### Netlify

1. 连接 GitHub 仓库
2. 构建命令：`npm run build`
3. 发布目录：`.vitepress/dist`

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 📄 许可证

MIT License