import { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: '人生笔记Real',
  description: '用照片记录日常，用日记串把旅行、读书和成长接着记。日记默认保存在本机，支持自主备份。',
  
  head: [
    // locale head 会保留在客户端，确保 404 与普通页切换时正确更新。
    ['meta', { name: 'robots', content: 'noindex,follow' }],
    // 中文页面特定的SEO标签
    ['meta', { name: 'keywords', content: '人生笔记,日记应用,生活记录,图文日记,视频日记,录音日记,个人日记,生活笔记,日记软件,记录生活,多媒体日记,免费日记,手机日记,私人日记,电子日记' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
  ],

  themeConfig: {
    siteTitle: '人生笔记Real',
    nav: [
      { text: '下载', link: '/docs/download' },
      { text: '文档', link: '/docs/features' }
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
            { text: '公开更新记录', link: '/docs/changelog' },
            { text: '联系我们', link: '/docs/contact' }
          ]
        },
        {
          text: '功能介绍',
          items: [
            { text: '功能总览', link: '/docs/features' },
            { text: '个性化设置', link: '/docs/settings' },
            { text: '日记串', link: '/docs/thread' },
          ]
        },
        {
          text: '记录场景',
          items: [
            { text: '旅行照片日记', link: '/docs/travel-journal' },
            { text: '读书笔记', link: '/docs/reading-journal' },
          ]
        },
        {
          text: '数据备份',
          items: [
            { text: '数据备份与迁移', link: '/docs/backup-and-migration' },
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