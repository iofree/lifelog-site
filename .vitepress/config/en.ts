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
            { text: 'Contact Us', link: '/en/docs/contact' }
          ]
        },
        {
          text: 'Features',
          items: [
            { text: 'Features Overview', link: '/en/docs/features' },
            { text: 'Personalization Settings', link: '/en/docs/settings' },
            { text: 'Diary Thread', link: '/en/docs/thread' },
            { text: 'Backup and Migration', link: '/md/en/backup-and-migration' }
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