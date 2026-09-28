import { describe, expect, it } from 'vitest'
import { androidApk, androidDevice, androidDownload, androidMarkets, marketIntent, nativeMarket, preferredMarket } from './android-download'

describe('Android download routing', () => {
  it.each([
    ['HUAWEI P40', 'huawei'],
    ['HONOR Magic7 HUAWEI', 'honor'],
    ['Redmi Note 14', 'xiaomi'],
    ['MiuiBrowser/17.0', 'xiaomi'],
    ['POCO F6', 'xiaomi'],
    ['OPPO Find X8', 'oppo'],
    ['vivo X200', 'vivo'],
    ['iQOO 13', 'vivo']
  ])('offers the confirmed store for %s', (model, id) => {
    const result = androidDownload(`Mozilla/5.0 (Linux; Android 14; ${model}) Chrome/130.0`)
    expect(result.market?.id).toBe(id)
    expect(result.href).toBe(marketIntent(result.market!))
  })

  it('keeps a direct APK for unknown brands and reduced user agents', () => {
    for (const ua of ['Mozilla/5.0 (Linux; Android 10; K) Chrome/130.0', 'Android 15; Samsung SM-S9380']) {
      expect(preferredMarket(ua)).toBeUndefined()
      expect(androidDownload(ua).href).toBe(androidApk)
    }
  })

  it('uses a real web listing in embedded browsers instead of a blocked intent', () => {
    for (const app of ['MicroMessenger/8.0', 'QQ/9.0', 'Weibo', 'AlipayClient']) {
      const result = androidDownload('Android 14; HUAWEI; ' + app)
      expect(result.href).toBe('https://sj.qq.com/appdetail/xyz.iofree.lifenotes')
      expect(result.embedded).toBe(true)
    }
  })

  it('does not send iOS, desktop, or native HarmonyOS browsers an Android intent or APK', () => {
    for (const ua of ['', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18)', 'Windows NT 10.0', 'OpenHarmony 5.0; HUAWEI', 'HarmonyOS 5.0; HONOR']) {
      expect(androidDownload(ua).href).toBe('/docs/download#android')
      expect(androidDownload(ua, true).href).toBe('/en/docs/download#android')
      expect(preferredMarket(ua)).toBeUndefined()
    }
    expect(androidDevice('OpenHarmony 5.0; HUAWEI').harmony).toBe(true)
    expect(androidDevice('Android 12; HUAWEI; HarmonyOS').harmony).toBe(false)
  })

  it('only recognizes configured market intents and gives each an APK browser fallback', () => {
    for (const market of androidMarkets) {
      const href = marketIntent(market)
      expect(href).toContain('details?id=xyz.iofree.lifenotes#Intent;scheme=market;')
      expect(href).toContain(`package=${market.package};`)
      expect(href).toContain('S.browser_fallback_url=' + encodeURIComponent(androidApk))
      expect(nativeMarket(href)).toBe(market)
      expect(nativeMarket(href.replace('xyz.iofree.lifenotes', 'other.app'))).toBeUndefined()
    }
    expect(nativeMarket('intent://untrusted#Intent;scheme=market;end')).toBeUndefined()
  })
})
