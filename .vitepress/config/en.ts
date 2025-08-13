import { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'Lifelog Note',
  description: 'Record your life with text, images, videos, and audio',

  themeConfig: {
    siteTitle: 'Lifelog Note',
    nav: [
      { text: 'Download', link: '/en/docs/download' },
      { text: 'Docs', link: '/en/docs/qa' },
      { text: 'Privacy Policy', link: '/en/privacy' },
      { text: 'Terms of Service', link: '/en/terms' }
    ],

    sidebar: {
      '/en/docs/': [
        {
          text: 'User Guide',
          items: [
            { text: 'FAQ', link: '/en/docs/qa' },
            { text: 'Contact Us', link: '/en/docs/contact' }
          ]
        },
        {
          text: 'Features',
          items: [
            { text: 'Rich Text', link: '/en/docs/rich-text' },
            { text: 'Media Files', link: '/en/docs/medias' },
            { text: 'Diary Thread', link: '/en/docs/thread' },
            { text: 'Calendar View', link: '/en/docs/calendar' },
            { text: 'On This Day', link: '/en/docs/today' },
            { text: 'Data Export', link: '/en/docs/data' },
            { text: 'Backup', link: '/en/docs/backup' },
            { text: 'Search', link: '/en/docs/search' },
            { text: 'PDF Export', link: '/en/docs/pdf' },
            { text: 'Data Migration', link: '/en/docs/migrate-data' }
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