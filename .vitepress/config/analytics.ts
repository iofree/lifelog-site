import type { HeadConfig } from 'vitepress'

// 可通过构建环境变量配置；不填 ID 时不加载任何分析服务。
export const analyticsConfig = {
  hostname: 'lifelog.iofree.xyz',
  provider: 'ga4',
  googleAnalytics: {
    id: '',
    enabled: false
  },
  baiduAnalytics: {
    id: '',
    enabled: false
  }
}

// head 只输出配置。SDK 由浏览器在生产构建、生产域名同时满足时加载。
export function generateAnalyticsScripts(env: Record<string, string | undefined> = process.env): HeadConfig[] {
  const provider = env.LIFELOG_ANALYTICS_PROVIDER || analyticsConfig.provider
  const configured = provider === 'ga4'
    ? analyticsConfig.googleAnalytics
    : analyticsConfig.baiduAnalytics
  const environmentId = provider === 'ga4' ? env.LIFELOG_GA4_ID : env.LIFELOG_BAIDU_ID
  const id = (environmentId || (configured.enabled ? configured.id : '')).trim()
  const valid = provider === 'ga4'
    ? /^G-[A-Z0-9]{6,20}$/.test(id)
    : provider === 'baidu' && /^[a-f0-9]{32}$/i.test(id)
  if (!valid) return []

  return [[
    'script',
    { id: 'lifelog-analytics-config', type: 'application/json' },
    JSON.stringify({ provider, id, hostname: analyticsConfig.hostname }).replace(/</g, '\\u003c')
  ]]
}
