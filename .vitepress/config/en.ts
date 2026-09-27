import { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'Lifelog Note',
  description: 'Keep a photo journal, connect related entries with diary threads, and revisit your memories. Entries are stored locally by default, with optional backups.',
  
  head: [
    // locale head 会保留在客户端，确保 404 与普通页切换时正确更新。
    ['meta', { name: 'robots', content: 'noindex,follow' }],
    // 英文页面特定的SEO标签
    ['meta', { name: 'keywords', content: 'lifelog,diary app,journal,life recording,personal diary,multimedia diary,photo diary,video diary,audio diary,life journal,diary software,digital diary,electronic diary,mobile diary,free diary app,private diary' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
  ],

  themeConfig: {
    siteTitle: 'Lifelog Note',
    nav: [
      { text: 'Download', link: '/en/docs/download' },
      { text: 'Docs', link: '/en/docs/features' }
    ],

    footer: {
      message: '<a href="/en/privacy">Privacy Policy</a> | <a href="/en/terms">Terms of Service</a>'
    },

    sidebar: {
      '/en/docs/': [
        {
          text: 'User Guide',
          items: [
            { text: 'FAQ', link: '/en/docs/qa' },
            { text: 'Public Release Notes', link: '/en/docs/changelog' },
            { text: 'Contact Us', link: '/en/docs/contact' }
          ]
        },
        {
          text: 'Features',
          items: [
            { text: 'Features Overview', link: '/en/docs/features' },
            { text: 'Personalization Settings', link: '/en/docs/settings' },
            { text: 'Diary Thread', link: '/en/docs/thread' },
          ]
        },
        {
          text: 'Ways to Journal',
          items: [
            { text: 'Travel Journal', link: '/en/docs/travel-journal' },
            { text: 'Reading Journal', link: '/en/docs/reading-journal' },
          ]
        },
        {
          text: 'Data Backup',
          items: [
            { text: 'Backup and Migration', link: '/en/docs/backup-and-migration' }
          ]
        },
        {
          text: 'Download',
          items: [
            { text: 'Download App', link: '/en/docs/download' },

          ]
        }
      ]
    },



    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    outline: {
      label: 'Page navigation'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: 'Change language',
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',

    // 编辑链接已禁用
    // editLink: {
    //   pattern: 'https://github.com/your-repo/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // }
  }
}