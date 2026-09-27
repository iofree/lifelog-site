import type { HeadConfig, PageData } from 'vitepress'

const siteUrl = 'https://lifelog.iofree.xyz'

// relativePath 已经由 VitePress 应用 rewrites，不能再使用源 Markdown 路径。
export function getPagePath(relativePath: string): string {
  return '/' + relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
}

export function generatePageHead(page: PageData, pages: string[]): HeadConfig[] {
  const path = getPagePath(page.relativePath)
  const isEnglish = path.startsWith('/en/')
  const isHome = path === '/' || path === '/en/'
  const name = isEnglish ? 'Lifelog Note' : '人生笔记Real'
  const shareImage = siteUrl + '/assets/social/' + (isEnglish ? 'en-US' : 'zh-CN') + '.png'
  const shareImageAlt = isEnglish ? 'Lifelog Note — photo journal and diary threads' : '人生笔记Real — 照片日记与日记串'
  const title = page.titleTemplate === false || page.title === name
    ? page.title
    : page.title + ' | ' + name
  const url = siteUrl + path
  const availablePaths = new Set(pages.map(getPagePath))
  const chinesePath = isEnglish ? path.slice(3) : path
  const englishPath = '/en' + chinesePath
  const head: HeadConfig[] = (page.frontmatter.head || []).filter(([tag, attrs]: HeadConfig) => {
    if (tag === 'link') return attrs.rel !== 'canonical' && !attrs.hreflang
    if (tag === 'meta') return !attrs.property?.startsWith('og:') && !attrs.name?.startsWith('twitter:')
    return true
  })

  if (path === '/404' || path === '/en/404') {
    head.push(['meta', { name: 'robots', content: 'noindex,follow' }])
    return head
  }

  head.push(
    ['meta', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' }],
    ['link', { rel: 'canonical', href: url }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: name }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: page.description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:locale', content: isEnglish ? 'en_US' : 'zh_CN' }],
    ['meta', { property: 'og:image', content: shareImage }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: shareImageAlt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: shareImage }],
    ['meta', { name: 'twitter:image:alt', content: shareImageAlt }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: page.description }]
  )

  for (const [lang, localePath] of [['zh-CN', chinesePath], ['en-US', englishPath]]) {
    if (availablePaths.has(localePath)) {
      head.push(['link', { rel: 'alternate', hreflang: lang, href: siteUrl + localePath }])
    }
  }
  head.push(['link', {
    rel: 'alternate',
    hreflang: 'x-default',
    href: siteUrl + (availablePaths.has(chinesePath) ? chinesePath : path)
  }])

  const jsonLd = (data: Record<string, unknown>): HeadConfig => [
    'script',
    { type: 'application/ld+json' },
    JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c')
  ]

  if (isHome) {
    head.push(jsonLd({
      '@type': 'WebSite',
      '@id': siteUrl + '/#website',
      name: '人生笔记Real',
      alternateName: 'Lifelog Note',
      url: siteUrl + '/',
      inLanguage: ['zh-CN', 'en-US']
    }))
    head.push(jsonLd({
      '@type': 'SoftwareApplication',
      '@id': siteUrl + '/#app',
      name,
      alternateName: isEnglish ? '人生笔记Real' : 'Lifelog Note',
      url,
      description: page.description,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: ['iOS', 'Android'],
      image: siteUrl + '/assets/logo.png',
      identifier: '1625209452',
      sameAs: ['https://apps.apple.com/cn/app/id1625209452', 'https://apps.apple.com/us/app/id1625209452']
    }))
  } else {
    head.push(jsonLd({
      '@type': 'WebPage',
      '@id': url + '#webpage',
      url,
      name: page.title,
      description: page.description,
      inLanguage: isEnglish ? 'en-US' : 'zh-CN',
      isPartOf: { '@id': siteUrl + '/#website' },
      about: { '@id': siteUrl + '/#app' }
    }))
  }

  return head
}
