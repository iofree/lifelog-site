import { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'Lifelog Note - Record Your Life with Multimedia Diary',
  description: 'Lifelog Note is a powerful multimedia diary app that supports rich text editing, photos, videos, audio recording, calendar view, data export and more. Capture every beautiful moment of your life. Free download for iOS and Android.',
  
  head: [
    // 英文页面特定的SEO标签
    ['meta', { name: 'keywords', content: 'lifelog,diary app,journal,life recording,personal diary,multimedia diary,photo diary,video diary,audio diary,life journal,diary software,digital diary,electronic diary,mobile diary,free diary app,private diary' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['link', { rel: 'alternate', hreflang: 'zh', href: 'https://lifelog.iofree.xyz/' }],
    ['link', { rel: 'alternate', hreflang: 'en', href: 'https://lifelog.iofree.xyz/en/' }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://lifelog.iofree.xyz/' }]
  ],

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