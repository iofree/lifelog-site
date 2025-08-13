// SEO工具函数
export interface SEOMetaData {
  title: string
  description: string
  keywords: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

// 生成页面标题
export function generatePageTitle(title: string, siteName: string = '人生笔记'): string {
  if (title === siteName) return title
  return `${title} - ${siteName}`
}

// 生成meta描述
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  if (content.length <= maxLength) return content
  
  // 在最后一个完整单词处截断
  const truncated = content.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...'
  }
  
  return truncated + '...'
}

// 生成关键词列表
export function generateKeywords(keywords: string[]): string {
  return keywords.join(',')
}

// 生成Open Graph标签
export function generateOpenGraphTags(meta: SEOMetaData): Array<[string, Record<string, string>]> {
  const tags: Array<[string, Record<string, string>]> = [
    ['meta', { property: 'og:type', content: meta.type || 'website' }],
    ['meta', { property: 'og:title', content: meta.title }],
    ['meta', { property: 'og:description', content: meta.description }]
  ]

  if (meta.url) {
    tags.push(['meta', { property: 'og:url', content: meta.url }])
  }

  if (meta.image) {
    tags.push(['meta', { property: 'og:image', content: meta.image }])
    tags.push(['meta', { property: 'og:image:alt', content: meta.title }])
  }

  if (meta.author) {
    tags.push(['meta', { property: 'article:author', content: meta.author }])
  }

  if (meta.publishedTime) {
    tags.push(['meta', { property: 'article:published_time', content: meta.publishedTime }])
  }

  if (meta.modifiedTime) {
    tags.push(['meta', { property: 'article:modified_time', content: meta.modifiedTime }])
  }

  return tags
}

// 生成Twitter Card标签
export function generateTwitterCardTags(meta: SEOMetaData): Array<[string, Record<string, string>]> {
  const tags: Array<[string, Record<string, string>]> = [
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: meta.title }],
    ['meta', { name: 'twitter:description', content: meta.description }]
  ]

  if (meta.image) {
    tags.push(['meta', { name: 'twitter:image', content: meta.image }])
    tags.push(['meta', { name: 'twitter:image:alt', content: meta.title }])
  }

  return tags
}

// 生成结构化数据
export function generateStructuredData(type: string, data: Record<string, any>): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }

  return JSON.stringify(structuredData, null, 2)
}

// 生成文章结构化数据
export function generateArticleStructuredData(meta: SEOMetaData & {
  headline: string
  datePublished?: string
  dateModified?: string
  wordCount?: number
  author?: {
    name: string
    url?: string
  }
  publisher?: {
    name: string
    logo?: string
  }
}): string {
  const data: Record<string, any> = {
    headline: meta.headline,
    description: meta.description,
    image: meta.image,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified || meta.datePublished
  }

  if (meta.author) {
    data.author = {
      '@type': 'Person',
      name: meta.author.name,
      url: meta.author.url
    }
  }

  if (meta.publisher) {
    data.publisher = {
      '@type': 'Organization',
      name: meta.publisher.name,
      logo: meta.publisher.logo ? {
        '@type': 'ImageObject',
        url: meta.publisher.logo
      } : undefined
    }
  }

  if (meta.wordCount) {
    data.wordCount = meta.wordCount
  }

  return generateStructuredData('Article', data)
}

// 生成应用结构化数据
export function generateAppStructuredData(appInfo: {
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string[]
  offers?: {
    price: string
    priceCurrency: string
  }
  author?: {
    name: string
  }
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
  screenshot?: string[]
  downloadUrl?: string[]
}): string {
  const data: Record<string, any> = {
    name: appInfo.name,
    description: appInfo.description,
    url: appInfo.url,
    applicationCategory: appInfo.applicationCategory,
    operatingSystem: appInfo.operatingSystem
  }

  if (appInfo.offers) {
    data.offers = {
      '@type': 'Offer',
      price: appInfo.offers.price,
      priceCurrency: appInfo.offers.priceCurrency
    }
  }

  if (appInfo.author) {
    data.author = {
      '@type': 'Person',
      name: appInfo.author.name
    }
  }

  if (appInfo.aggregateRating) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: appInfo.aggregateRating.ratingValue,
      reviewCount: appInfo.aggregateRating.reviewCount
    }
  }

  if (appInfo.screenshot) {
    data.screenshot = appInfo.screenshot
  }

  if (appInfo.downloadUrl) {
    data.downloadUrl = appInfo.downloadUrl
  }

  return generateStructuredData('SoftwareApplication', data)
}

// 生成FAQ结构化数据
export function generateFAQStructuredData(faqs: Array<{
  question: string
  answer: string
}>): string {
  const data = {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return generateStructuredData('FAQPage', data)
}

// URL规范化
export function normalizeUrl(url: string, baseUrl: string = 'https://lifelog.iofree.xyz'): string {
  if (url.startsWith('http')) return url
  if (url.startsWith('/')) return baseUrl + url
  return baseUrl + '/' + url
}

// 生成hreflang标签
export function generateHreflangTags(currentPath: string, languages: Array<{
  code: string
  path: string
}>): Array<[string, Record<string, string>]> {
  return languages.map(lang => [
    'link',
    {
      rel: 'alternate',
      hreflang: lang.code,
      href: normalizeUrl(lang.path)
    }
  ])
}