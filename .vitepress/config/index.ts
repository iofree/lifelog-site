import { defineConfig } from 'vitepress'
import { zhConfig } from './zh'
import { enConfig } from './en'
import { sitemapConfig } from './sitemap'
import { generateAnalyticsScripts } from './analytics'
import { generateRewrites } from './rewrites'
import { generatePageHead } from '../utils/seo'

export default defineConfig({
  title: '人生笔记Real',
  description: '用照片记录日常，用日记串把旅行、读书和成长接着记。日记默认保存在本机，支持自主备份。',

  // 多语言配置
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      link: '/',
      ...zhConfig
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      ...enConfig
    }
  },

  // 基础配置
  head: [
    // Favicon和图标
    ['link', { rel: 'apple-touch-icon', href: '/assets/apple-touch-icon.png' }],
    ['link', { rel: 'shortcut icon', href: '/assets/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicon-16x16.png' }],

    // 基础meta标签
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#1d63ea' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: '人生笔记' }],

    // SEO核心标签
    ['meta', { name: 'keywords', content: '人生笔记,日记应用,生活记录,多媒体日记,lifelog,diary app,journal,life recording' }],
    ['meta', { name: 'author', content: 'Allen' }],
    ['meta', { name: 'revisit-after', content: '7 days' }],
    ['meta', { name: 'distribution', content: 'global' }],
    ['meta', { name: 'rating', content: 'general' }],

    // 移动端优化
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1d63ea' }],
    ['meta', { name: 'msapplication-config', content: '/browserconfig.xml' }],

    // 应用相关
    ['meta', { name: 'application-name', content: '人生笔记' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],

    // 预加载关键资源
    ['link', { rel: 'preload', href: '/assets/icon-192x192.png', as: 'image' }],

    // 规范链接和PWA
    ['link', { rel: 'manifest', href: '/manifest.json' }],

    // 分析工具脚本（仅在生产环境加载）
    ...generateAnalyticsScripts()
  ],

  // 构建配置
  outDir: 'dist',
  cacheDir: '.vitepress/cache',
  cleanUrls: true,

  // 排除不需要构建的文件
  srcExclude: ['README.md', 'SEO_SUMMARY.md'],


  // 构建优化
  vite: {
    build: {
      minify: 'terser',
      cssMinify: true
    },
    optimizeDeps: {
      include: ['vue']
    },
    // 静态资源处理
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp']
  },

  // 在构建时生成页面元数据，同时供客户端路由切换使用
  transformPageData(pageData, { siteConfig }) {
    const pages = siteConfig.pages.map(page => siteConfig.rewrites.map[page] || page)
    pageData.frontmatter.head = generatePageHead(pageData, pages)
  },

  // SEO配置
  sitemap: {
    hostname: sitemapConfig.hostname,
    transformItems: sitemapConfig.transformItems
  },

  // 主题配置
  themeConfig: {
    logo: '/assets/icon-192x192.png',

    // 搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search docs',
                buttonAriaLabel: 'Search docs'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear search query',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate'
                }
              }
            }
          }
        }
      }
    }
  },

  // 路由重写规则，保持原有URL兼容性
  rewrites: generateRewrites()
})
