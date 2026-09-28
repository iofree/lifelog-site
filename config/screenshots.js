// 首页截图配置文件
// 支持中英文分别配置不同的截图
// 来源与抓取记录：assets/app-store/source.json

import zhScreenshot1 from '../assets/app-store/zh-CN/01.webp'
import zhScreenshot2 from '../assets/app-store/zh-CN/02.webp'
import zhScreenshot3 from '../assets/app-store/zh-CN/03.webp'
import zhScreenshot4 from '../assets/app-store/zh-CN/04.webp'
import zhScreenshot5 from '../assets/app-store/zh-CN/05.webp'
import enScreenshot1 from '../assets/app-store/en-US/01.webp'
import enScreenshot2 from '../assets/app-store/en-US/02.webp'
import enScreenshot3 from '../assets/app-store/en-US/03.webp'
import enScreenshot4 from '../assets/app-store/en-US/04.webp'
import enScreenshot5 from '../assets/app-store/en-US/05.webp'
import enScreenshot6 from '../assets/app-store/en-US/06.webp'

export const screenshotsConfig = {
  // 中文版截图配置
  zh: [
    {
      src: zhScreenshot1,
      width: 880,
      height: 1912,
      title: '照片日历',
      description: '按日期找照片，回看当天的记录。',
      alt: '人生笔记照片日历：按日期展示照片，并在下方浏览当天的图文日记'
    },
    {
      src: zhScreenshot2,
      width: 880,
      height: 1912,
      title: '图文混排',
      description: '把文字、照片、视频和录音写进同一篇日记。',
      alt: '图文混排日记：在文字之间插入实况照片、视频和录音，评论也可添加图片'
    },
    {
      src: zhScreenshot3,
      width: 880,
      height: 1912,
      title: '日记串',
      description: '把不同日期的相关记录，连成一个故事。',
      alt: '日记串列表：将相关记录分组，展示每个日记串的日期范围和封面'
    },
    {
      src: zhScreenshot4,
      width: 880,
      height: 1912,
      title: '记录统计',
      description: '用字数、记录天数和热力图，看看自己的写作习惯。',
      alt: '字数统计：查看总字数、平均日字数、记录天数和写作热力图'
    },
    {
      src: zhScreenshot5,
      width: 880,
      height: 1912,
      title: '随机回忆',
      description: '偶遇过去的照片和文字，重温当时的心情。',
      alt: '随机回忆卡片：用照片、文字和日期回顾过去的日记'
    }
  ],

  // 英文版截图配置
  en: [
    {
      src: enScreenshot1,
      width: 828,
      height: 1792,
      title: 'Photo calendar',
      description: 'Find photos by date and revisit the entries from that day.',
      alt: 'Photo calendar with daily photo thumbnails and the selected day’s journal entry'
    },
    {
      src: enScreenshot2,
      width: 828,
      height: 1792,
      title: 'Your days, in order',
      description: 'Browse text, photos, places, and tags in one journal timeline.',
      alt: 'Timeline of journal entries with text, photo grids, dates, locations, and tags'
    },
    {
      src: enScreenshot3,
      width: 828,
      height: 1792,
      title: 'Rediscover a memory',
      description: 'Let a past photo and entry bring an ordinary moment back.',
      alt: 'Random memory card showing a basketball photo and a fitness journal entry'
    },
    {
      src: enScreenshot4,
      width: 828,
      height: 1792,
      title: 'Diary Threads',
      description: 'Group related entries into a story that grows over time.',
      alt: 'Diary Thread list with cover photos and date ranges for related entries'
    },
    {
      src: enScreenshot5,
      width: 828,
      height: 1792,
      title: 'Follow a story',
      description: 'Read connected entries together and add the next chapter.',
      alt: 'Diary Thread timeline showing connected entries with text, photos, and an option to add a new entry'
    },
    {
      src: enScreenshot6,
      width: 828,
      height: 1792,
      title: 'A fresh look back',
      description: 'Revisit a place, a journey, or a moment you may have forgotten.',
      alt: 'Random memory card showing a park photo and a travel journal entry'
    }
  ]
}