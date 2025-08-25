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
export function generateKeywords(keywords: string[] | string): string {
  if (Array.isArray(keywords)) {
    return keywords.join(',')
  }
  return keywords
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

// 主SEO应用函数
export function applySeo(frontmatter: Record<string, any>, siteData: Record<string, any>): void {
  const meta: SEOMetaData = {
    title: frontmatter.title || siteData.title,
    description: frontmatter.description || siteData.description,
    keywords: frontmatter.keywords || '',
    url: normalizeUrl(frontmatter.permalink || ''),
    image: frontmatter.image || 'https://lifelog.iofree.xyz/assets/logo.png',
    type: frontmatter.type || 'website'
  }

  const head = siteData.head || []

  head.push(['title', {}, generatePageTitle(meta.title, siteData.title)])
  head.push(['meta', { name: 'description', content: generateMetaDescription(meta.description) }])
  head.push(['meta', { name: 'keywords', content: generateKeywords(meta.keywords) }])

  const ogTags = generateOpenGraphTags(meta)
  ogTags.forEach(tag => head.push(tag))

  const twitterTags = generateTwitterCardTags(meta)
  twitterTags.forEach(tag => head.push(tag))

  siteData.head = head
}

// URL规范化
export function normalizeUrl(url: string, baseUrl: string = 'https://lifelog.iofree.xyz'): string {
  if (url.startsWith('http')) return url
  if (url.startsWith('/')) return baseUrl + url
  return baseUrl + '/' + url
}
