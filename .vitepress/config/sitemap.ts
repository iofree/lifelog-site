// Sitemap配置
export const sitemapConfig = {
  hostname: 'https://lifelog.iofree.xyz',
  
  // 页面优先级配置
  priorities: {
    home: 1.0,
    download: 0.9,
    docs: 0.8,
    features: 0.7,
    legal: 0.3
  },
  
  // 更新频率配置
  changefreqs: {
    home: 'weekly',
    download: 'weekly', 
    docs: 'monthly',
    features: 'monthly',
    legal: 'yearly'
  },
  
  // 页面分类规则
  getPageCategory: (url: string) => {
    url = '/' + url.replace(/^\//, '')
    if (url === '/' || url === '/en/') return 'home'
    if (url.includes('/download')) return 'download'
    if (url.includes('/docs/')) return 'docs'
    if (url.includes('/privacy') || url.includes('/terms')) return 'legal'
    return 'features'
  },
  
  // 转换函数
  transformItems: (items: any[]) => {
    return items.map((item) => {
      const category = sitemapConfig.getPageCategory(item.url)
      
      return {
        ...item,
        changefreq: sitemapConfig.changefreqs[category as keyof typeof sitemapConfig.changefreqs] || 'monthly',
        priority: sitemapConfig.priorities[category as keyof typeof sitemapConfig.priorities] || 0.5
      }
    })
  }
}