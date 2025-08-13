import { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: '人生笔记',
  description: '用图文,视频,录音日记一生',

  themeConfig: {
    siteTitle: '人生笔记',
    nav: [
      { text: '下载', link: '/docs/download' },
      { text: '文档', link: '/docs/qa' },
      { text: '隐私政策', link: '/privacy' },
      { text: '使用条款', link: '/terms' }
    ],

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