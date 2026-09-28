export const androidPackage = 'xyz.iofree.lifenotes'
export const androidApk = 'https://apk.iofree.xyz/lifelog.apk'

// 上架渠道由维护者确认；网页无法查询设备上的商店或实时上架状态。
export const androidMarkets = [
  { id: 'huawei', name: '华为应用市场', englishName: 'Huawei AppGallery', package: 'com.huawei.appmarket' },
  { id: 'xiaomi', name: '小米应用商店', englishName: 'Xiaomi GetApps', package: 'com.xiaomi.market', webUrl: 'https://app.mi.com/details?id=xyz.iofree.lifenotes' },
  { id: 'honor', name: '荣耀应用市场', englishName: 'Honor App Market', package: 'com.hihonor.appmarket' },
  { id: 'oppo', name: 'OPPO 软件商店', englishName: 'OPPO App Market', package: 'com.heytap.market' },
  { id: 'vivo', name: 'vivo 应用商店', englishName: 'vivo App Store', package: 'com.bbk.appstore' },
  { id: 'tencent', name: '应用宝', englishName: 'Tencent MyApp', package: 'com.tencent.android.qqdownloader', webUrl: 'https://sj.qq.com/appdetail/xyz.iofree.lifenotes' }
]

export type AndroidMarket = typeof androidMarkets[number]

export function marketIntent(market: AndroidMarket): string {
  return `intent://details?id=${androidPackage}#Intent;scheme=market;package=${market.package};S.browser_fallback_url=${encodeURIComponent(androidApk)};end`
}

export function nativeMarket(url: string): AndroidMarket | undefined {
  return androidMarkets.find(market => marketIntent(market) === url)
}

export function androidDevice(userAgent: string) {
  const android = /Android/i.test(userAgent)
  const harmony = !android && /OpenHarmony|HarmonyOS/i.test(userAgent)
  const embedded = /MicroMessenger|\bQQ\/|Weibo|AlipayClient/i.test(userAgent)
  return { android, harmony, embedded }
}

export function preferredMarket(userAgent: string): AndroidMarket | undefined {
  if (!androidDevice(userAgent).android) return
  const brands = [
    ['honor', /HONOR/i],
    ['huawei', /HUAWEI/i],
    ['xiaomi', /Xiaomi|Redmi|MiuiBrowser|\b(?:MI|MIX|POCO)[\s_-]/i],
    ['oppo', /OPPO|HeyTap/i],
    ['vivo', /vivo|iQOO/i]
  ] as const
  const id = brands.find(([, pattern]) => pattern.test(userAgent))?.[0]
  return androidMarkets.find(market => market.id === id)
}

export function androidDownload(userAgent: string, english = false) {
  const device = androidDevice(userAgent)
  const page = (english ? '/en' : '') + '/docs/download#android'
  if (!device.android) return { href: page, market: undefined, ...device }
  // 内置浏览器通常限制外部应用唤起，使用已核实的应用宝网页。
  const market = device.embedded ? androidMarkets.find(item => item.id === 'tencent') : preferredMarket(userAgent)
  return {
    href: market ? (device.embedded ? market.webUrl! : marketIntent(market)) : androidApk,
    market,
    ...device
  }
}
