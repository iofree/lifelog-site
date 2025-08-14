import { defineConfig } from 'vitepress'
import { zhConfig } from './zh'
import { enConfig } from './en'
import { sitemapConfig } from './sitemap'
import { analyticsConfig, generateAnalyticsScripts } from './analytics'

export default defineConfig({
  title: '人生笔记',
  description: '用图文,视频,录音日记一生',
  
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
    ['link', { rel: 'icon', href: '/assets/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/assets/logo.png' }],
    ['link', { rel: 'shortcut icon', href: '/assets/logo.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/logo.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/logo.png' }],
    
    // 基础meta标签
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#1d63ea' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: '人生笔记' }],
    
    // SEO核心标签
    ['meta', { name: 'keywords', content: '人生笔记,日记应用,生活记录,多媒体日记,lifelog,diary app,journal,life recording' }],
    ['meta', { name: 'author', content: 'Allen' }],
    ['meta', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    ['meta', { name: 'bingbot', content: 'index,follow' }],
    ['meta', { name: 'language', content: 'zh-CN' }],
    ['meta', { name: 'revisit-after', content: '7 days' }],
    ['meta', { name: 'distribution', content: 'global' }],
    ['meta', { name: 'rating', content: 'general' }],
    
    // Open Graph标签
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '人生笔记' }],
    ['meta', { property: 'og:title', content: '人生笔记 - 用图文,视频,录音日记一生' }],
    ['meta', { property: 'og:description', content: '人生笔记是一款功能强大的多媒体日记应用，支持图文、视频、录音等多种记录方式，帮助您记录生活的每一个美好瞬间。' }],
    ['meta', { property: 'og:url', content: 'https://lifelog.iofree.xyz' }],
    ['meta', { property: 'og:image', content: 'https://lifelog.iofree.xyz/assets/logo.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: '人生笔记应用图标' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:locale:alternate', content: 'en_US' }],
    
    // Twitter Card标签
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '人生笔记 - 用图文,视频,录音日记一生' }],
    ['meta', { name: 'twitter:description', content: '人生笔记是一款功能强大的多媒体日记应用，支持图文、视频、录音等多种记录方式，帮助您记录生活的每一个美好瞬间。' }],
    ['meta', { name: 'twitter:image', content: 'https://lifelog.iofree.xyz/assets/logo.png' }],
    ['meta', { name: 'twitter:image:alt', content: '人生笔记应用图标' }],
    ['meta', { name: 'twitter:site', content: '@lifelog_app' }],
    ['meta', { name: 'twitter:creator', content: '@lifelog_app' }],
    
    // 移动端优化
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1d63ea' }],
    ['meta', { name: 'msapplication-config', content: '/browserconfig.xml' }],
    
    // 应用相关
    ['meta', { name: 'application-name', content: '人生笔记' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    
    // 预加载关键资源
    ['link', { rel: 'preload', href: '/assets/logo.png', as: 'image' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    
    // 规范链接和PWA
    ['link', { rel: 'canonical', href: 'https://lifelog.iofree.xyz' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    
    // 结构化数据 - 网站信息
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "人生笔记",
      "alternateName": "Lifelog Note",
      "url": "https://lifelog.iofree.xyz",
      "description": "人生笔记官方网站 - 用图文,视频,录音日记一生",
      "inLanguage": ["zh-CN", "en-US"]
    })],
    
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
  
  // SEO配置
  sitemap: {
    hostname: sitemapConfig.hostname,
    transformItems: sitemapConfig.transformItems
  },

  // 主题配置
  themeConfig: {
    logo: '/assets/logo.png',
    
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
  rewrites: {
    // 首页映射
    'index/zh/index.md': 'index.md',
    'index/en/index.md': 'en/index.md',
    
    // 中文文档映射到 /docs/ 路径
    'md/zh/qa.md': 'docs/qa.md',
    'md/zh/contact.md': 'docs/contact.md',
    'md/zh/rich-text.md': 'docs/rich-text.md',
    'md/zh/medias.md': 'docs/medias.md',
    'md/zh/thread.md': 'docs/thread.md',
    'md/zh/calendar.md': 'docs/calendar.md',
    'md/zh/today.md': 'docs/today.md',
    'md/zh/data.md': 'docs/data.md',
    'md/zh/backup.md': 'docs/backup.md',
    'md/zh/search.md': 'docs/search.md',
    'md/zh/pdf.md': 'docs/pdf.md',
    'md/zh/migrate-vip.md': 'docs/migrate-vip.md',
    'md/zh/migrate-data.md': 'docs/migrate-data.md',
    'md/zh/download.md': 'docs/download.md',
    'md/zh/privacy.md': 'privacy.md',
    'md/zh/terms.md': 'terms.md',
    
    // 英文文档映射到 /en/docs/ 路径
    'md/en/qa.md': 'en/docs/qa.md',
    'md/en/contact.md': 'en/docs/contact.md',
    'md/en/rich-text.md': 'en/docs/rich-text.md',
    'md/en/medias.md': 'en/docs/medias.md',
    'md/en/thread.md': 'en/docs/thread.md',
    'md/en/calendar.md': 'en/docs/calendar.md',
    'md/en/today.md': 'en/docs/today.md',
    'md/en/data.md': 'en/docs/data.md',
    'md/en/backup.md': 'en/docs/backup.md',
    'md/en/search.md': 'en/docs/search.md',
    'md/en/pdf.md': 'en/docs/pdf.md',
    'md/en/migrate-vip.md': 'en/docs/migrate-vip.md',
    'md/en/migrate-data.md': 'en/docs/migrate-data.md',
    'md/en/download.md': 'en/docs/download.md',
    'md/en/privacy.md': 'en/privacy.md',
    'md/en/terms.md': 'en/terms.md'
  }
})