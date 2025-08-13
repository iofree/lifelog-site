import { defineConfig } from 'vitepress'
import { zhConfig } from './zh'
import { enConfig } from './en'
import { buildConfig } from './build'

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
    ['link', { rel: 'icon', href: '/assets/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/assets/logo.png' }],
    ['link', { rel: 'shortcut icon', href: '/assets/logo.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#1d63ea' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    
    // SEO meta标签
    ['meta', { name: 'keywords', content: '人生笔记,日记,记录,生活,图文,视频,录音,lifelog,diary,journal' }],
    ['meta', { name: 'author', content: 'Allen' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    
    // Open Graph标签
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '人生笔记' }],
    ['meta', { property: 'og:image', content: '/assets/logo.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:locale:alternate', content: 'en_US' }],
    
    // Twitter Card标签
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: '/assets/logo.png' }],
    
    // 移动端优化
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1d63ea' }],
    
    // 预加载关键资源
    ['link', { rel: 'preload', href: '/assets/logo.png', as: 'image' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }]
  ],

  // 构建配置
  outDir: 'dist',
  cacheDir: '.vitepress/cache',
  cleanUrls: true,
  
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
    hostname: 'https://lifelog.iofree.xyz',
    transformItems: (items) => {
      // 为sitemap项目添加更多信息
      return items.map((item) => ({
        ...item,
        changefreq: item.url.includes('/blog/') ? 'weekly' : 'monthly',
        priority: item.url === '/' || item.url === '/en/' ? 1.0 : 
                 item.url.includes('/download') ? 0.9 : 0.8
      }))
    }
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
    'md/zh/download/download.md': 'docs/download/download.md',
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
    'md/en/download/download.md': 'en/docs/download/download.md',
    'md/en/privacy.md': 'en/privacy.md',
    'md/en/terms.md': 'en/terms.md'
  }
})