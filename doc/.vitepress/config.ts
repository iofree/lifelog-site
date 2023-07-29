import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/docs/',
    outDir: '../_site/docs',


    title: "人生笔记｜文档",
    description: "常用功能介绍",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '主页', link: '/'},
            {text: '下载', link: '/download/download'},
            {text: '官网', link: 'https://lifelog.iofree.xyz/'},
        ],

        sidebar: [
            {
                text: '',
                items: [
                    {text: '常见问题', link: '/use/qa'},
                ]
            },
            {
                text: '功能介绍',
                items: [
                    {text: '富文本', link: '/use/rich-text'},
                    {text: '图片/实况/视频/录音', link: '/use/medias'},
                    {text: '日记串', link: '/use/thread'},
                    {text: '日历视图', link: '/use/calendar'},
                    {text: '那年今日', link: '/use/today'},
                    {text: '数据导出', link: '/use/data'},
                    {text: '备份', link: '/use/backup'},
                    {text: '搜索', link: '/use/search'},
                    {text: 'PDF导出', link: '/use/pdf'},
                    {text: '安卓会员迁移', link: '/use/migrate-vip'},
                    {text: '换手机 数据迁移', link: '/use/migrate-data'},
                ]
            },
            {
                text: '下载',
                items: [
                    {text: 'iOS/Android 下载', link: '/download/download'},
                ]
            },
            {
                text: '',
                items: [
                    {text: '联系我们', link: '/use/contact'},
                ]
            },
        ],

        socialLinks: []
    }
})
