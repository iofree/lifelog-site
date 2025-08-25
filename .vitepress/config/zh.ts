import { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: '人生笔记 - 用图文,视频,录音日记一生',
  description: '人生笔记是一款功能强大的多媒体日记应用，支持富文本编辑、图片视频录音、日历视图、数据导出等功能，帮助您记录生活的每一个美好瞬间。免费下载，支持iOS和Android。',
  
  head: [
    // 中文页面特定的SEO标签
    ['meta', { name: 'keywords', content: '人生笔记,日记应用,生活记录,图文日记,视频日记,录音日记,个人日记,生活笔记,日记软件,记录生活,多媒体日记,免费日记,手机日记,私人日记,电子日记' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['link', { rel: 'alternate', hreflang: 'en', href: 'https://lifelog.iofree.xyz/en/' }],
    ['link', { rel: 'alternate', hreflang: 'zh', href: 'https://lifelog.iofree.xyz/' }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://lifelog.iofree.xyz/' }]
  ],

  themeConfig: {
    siteTitle: '人生笔记',
    nav: [
      { text: '下载', link: '/docs/download' },
      { text: '文档', link: '/docs/qa' }
    ],

    footer: {
      message: '<a href="/privacy">隐私政策</a> | <a href="/terms">使用条款</a>'
    },

    sidebar: {
      '/docs/': [
        {
          text: '使用指南',
          items: [
            { text: '常见问题', link: '/docs/qa' },
            { text: '联系我们', link: '/docs/contact' }
          ]
        },
        {
          text: '功能介绍',
          items: [
            { text: '功能总览', link: '/docs/features' },
            { text: '个性化设置', link: '/docs/settings' },,
            { text: '富文本', link: '/docs/rich-text' },
            { text: '图片/实况/视频/录音', link: '/docs/medias' },
            { text: '日记串', link: '/docs/thread' },
            { text: '日历视图', link: '/docs/calendar' },
            { text: '那年今日', link: '/docs/today' },
            { text: '数据导出', link: '/docs/data' },
            { text: '备份', link: '/docs/backup' },
            { text: '搜索', link: '/docs/search' },
            { text: 'PDF导出', link: '/docs/pdf' },
            { text: '换手机 数据迁移', link: '/docs/migrate-data' }
          ]
        },
        {
          text: '下载',
          items: [
            { text: '下载应用', link: '/docs/download' },

          ]
        }
      ]
    },



    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    // 编辑链接已禁用
    // editLink: {
    //   pattern: 'https://github.com/your-repo/edit/main/docs/:path',
    //   text: '在 GitHub 上编辑此页面'
    // }
  }
}