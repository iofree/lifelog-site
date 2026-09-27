import { afterEach, describe, expect, it, vi } from 'vitest'
import { JSDOM, VirtualConsole } from 'jsdom'
import { generateAnalyticsScripts } from '../config/analytics'
import { installAnalytics } from './analytics'

const ga4Id = 'G-TEST123456'
const baiduId = '1234567890abcdef1234567890abcdef'
const instances: JSDOM[] = []

function browser(url = 'https://lifelog.iofree.xyz/', env: Record<string, string> = { LIFELOG_GA4_ID: ga4Id }) {
  const dom = new JSDOM('<!doctype html><title>人生笔记Real</title><body></body>', {
    url,
    referrer: 'https://example.com/search?email=private@example.com#private',
    virtualConsole: new VirtualConsole()
  })
  instances.push(dom)
  for (const [, attributes, content] of generateAnalyticsScripts(env)) {
    const script = dom.window.document.createElement('script')
    for (const [key, value] of Object.entries(attributes)) script.setAttribute(key, value)
    script.textContent = content || ''
    dom.window.document.head.appendChild(script)
  }
  return dom.window as unknown as Window & { dataLayer?: ArrayLike<unknown>[]; _hmt?: unknown[][] }
}

function events(win: ReturnType<typeof browser>, name: string) {
  return (win.dataLayer || []).map(command => Array.from(command))
    .filter(command => command[0] === 'event' && command[1] === name)
    .map(command => command[2] as Record<string, string>)
}

function click(win: Window, selector: string, options: MouseEventInit = {}) {
  const event = new win.document.defaultView!.MouseEvent('click', {
    bubbles: true, cancelable: true, button: 0, ...options
  })
  const allowed = win.document.querySelector(selector)!.dispatchEvent(event)
  expect(allowed).toBe(true)
  expect(event.defaultPrevented).toBe(false)
}

afterEach(() => {
  for (const dom of instances.splice(0)) dom.window.close()
})

describe('analytics configuration', () => {
  it('emits nothing without a real configured ID or with an invalid/disabled provider', () => {
    expect(generateAnalyticsScripts({})).toEqual([])
    expect(generateAnalyticsScripts({ LIFELOG_GA4_ID: '</script><script>alert(1)</script>' })).toEqual([])
    expect(generateAnalyticsScripts({ LIFELOG_GA4_ID: ga4Id, LIFELOG_ANALYTICS_PROVIDER: 'none' })).toEqual([])
    expect(generateAnalyticsScripts({ LIFELOG_BAIDU_ID: baiduId })).toEqual([])
  })

  it('selects one provider and emits inert configuration rather than loading a third party', () => {
    const scripts = generateAnalyticsScripts({ LIFELOG_GA4_ID: ga4Id, LIFELOG_BAIDU_ID: baiduId })
    expect(scripts).toHaveLength(1)
    expect(scripts[0][1]).toEqual({ id: 'lifelog-analytics-config', type: 'application/json' })
    expect(JSON.parse(scripts[0][2]!)).toEqual({ provider: 'ga4', id: ga4Id, hostname: 'lifelog.iofree.xyz' })
  })
})

describe('browser analytics', () => {
  it('does not load or queue analytics without ID, on previews, over HTTP, or in development', () => {
    const cases = [
      { win: browser('https://lifelog.iofree.xyz/', {}), production: true },
      { win: browser('https://preview.example.com/'), production: true },
      { win: browser('http://lifelog.iofree.xyz/'), production: true },
      { win: browser('https://lifelog.iofree.xyz:4173/'), production: true },
      { win: browser(), production: false }
    ]
    for (const { win, production } of cases) {
      const router = {}
      expect(installAnalytics(router, { production, window: win })).toBeUndefined()
      expect(win.document.querySelector('script[src]')).toBeNull()
      expect(win.dataLayer).toBeUndefined()
      expect(win._hmt).toBeUndefined()
      expect(router).toEqual({})
    }
  })

  it('records one initial view and retains the existing language callback through repeat initialization', async () => {
    const win = browser('https://lifelog.iofree.xyz/?email=private@example.com#secret')
    const languagePreference = vi.fn((to: string) => {
      win.localStorage.setItem('vitepress-preferred-lang', to.startsWith('/en/') ? 'en' : 'zh')
    })
    const router = { onAfterRouteChanged: languagePreference, onAfterRouteChange: undefined as ((to: string) => void | Promise<void>) | undefined }
    const initial = installAnalytics(router, { production: true, window: win })
    expect(installAnalytics(router, { production: true, window: win })).toBe(initial)
    await router.onAfterRouteChange?.('/')
    expect(languagePreference).toHaveBeenCalledTimes(1)
    expect(events(win, 'page_view')).toHaveLength(1)
    expect(events(win, 'page_view')[0]).toMatchObject({
      page_location: 'https://lifelog.iofree.xyz/', page_path: '/', locale: 'zh',
      page_referrer: 'https://example.com/search', send_to: ga4Id
    })
    expect(win.document.querySelectorAll('script[src]')).toHaveLength(1)
    const config = win.dataLayer!.map(item => Array.from(item)).filter(item => item[0] === 'config')
    expect(config).toHaveLength(1)
    expect(config[0][2]).toMatchObject({ send_page_view: false, allow_google_signals: false })
  })

  it('records real SPA page changes and back navigation but ignores hashes, queries and HTML aliases', async () => {
    const win = browser()
    const existing = vi.fn()
    const router = { onAfterRouteChange: existing as (to: string) => void | Promise<void> }
    installAnalytics(router, { production: true, window: win })
    for (const path of ['/docs/features', '/docs/features#photos', '/docs/features?email=private@example.com', '/docs/features.html']) {
      win.history.pushState({}, '', path)
      await router.onAfterRouteChange(path)
    }
    expect(events(win, 'page_view')).toHaveLength(2)
    win.history.pushState({}, '', '/en/docs/download?source=private#install')
    win.document.title = 'Download Lifelog Note'
    await router.onAfterRouteChange('/en/docs/download')
    expect(events(win, 'page_view')[2]).toMatchObject({
      locale: 'en', page_path: '/en/docs/download', page_title: 'Download Lifelog Note',
      page_referrer: 'https://lifelog.iofree.xyz/docs/features'
    })
    win.history.replaceState({}, '', '/docs/features')
    await router.onAfterRouteChange('/docs/features')
    expect(events(win, 'page_view')).toHaveLength(4)
    expect(existing).toHaveBeenCalledTimes(6)
    expect(JSON.stringify(win.dataLayer)).not.toContain('private')
  })

  it('delegates dynamic download links, identifies placements, strips URL secrets and never cancels navigation', async () => {
    const win = browser()
    const router = { onAfterRouteChange: undefined as ((to: string) => void | Promise<void>) | undefined }
    installAnalytics(router, { production: true, window: win })
    installAnalytics(router, { production: true, window: win })
    win.document.body.innerHTML = '<div class="hero-with-phone"><a href="https://apps.apple.com/cn/app/id1625209452?token=secret#private"><span id="hero">App Store</span></a></div>'
    click(win, '#hero', { ctrlKey: true })
    expect(events(win, 'download_click')[0]).toEqual({
      platform: 'ios', placement: 'hero', page_path: '/', locale: 'zh',
      destination: 'https://apps.apple.com/cn/app/id1625209452', send_to: ga4Id
    })
    win.history.pushState({}, '', '/en/docs/download?email=private@example.com')
    await router.onAfterRouteChange?.('/en/docs/download')
    win.document.body.innerHTML = '<a id="apk" href="https://apk.iofree.xyz/lifelog.apk?token=secret#private">APK</a>'
    click(win, '#apk')
    expect(events(win, 'download_click')[1]).toMatchObject({ platform: 'android', placement: 'download_page', locale: 'en', destination: 'https://apk.iofree.xyz/lifelog.apk' })
    win.history.pushState({}, '', '/docs/qa')
    await router.onAfterRouteChange?.('/docs/qa')
    win.document.body.innerHTML = '<div data-analytics-placement="guide_end"><a id="guide" href="https://play.google.com/store/apps/details?id=app.id&email=private@example.com">Download</a></div><a id="other" href="https://apps.apple.com/app/id1625209452">Install</a><a id="internal" href="/docs/download">Downloads</a><a id="email" href="mailto:private@example.com">Email</a><a id="unrelated" href="https://example.com/report.apk">Other APK</a><input value="private diary text">'
    click(win, '#guide', { detail: 0 })
    click(win, '#other')
    click(win, '#internal')
    click(win, '#email')
    click(win, '#unrelated')
    expect(events(win, 'download_click')).toHaveLength(4)
    expect(events(win, 'download_click')[2]).toMatchObject({ platform: 'android', placement: 'guide_end', page_path: '/docs/qa', destination: 'https://play.google.com/store/apps/details' })
    expect(events(win, 'download_click')[3].placement).toBe('other')
    expect(JSON.stringify(win.dataLayer)).not.toMatch(/secret|private/)
  })

  it('tracks middle-button downloads once, ignores canceled and right clicks, and can detach cleanly', () => {
    const win = browser()
    const priorHook = vi.fn()
    const router = { onAfterRouteChange: priorHook as (to: string) => void | Promise<void> }
    const analytics = installAnalytics(router, { production: true, window: win })!
    win.document.body.innerHTML = '<a id="download" href="https://apk.iofree.xyz/lifelog.apk">Download</a>'
    const link = win.document.getElementById('download')!
    link.dispatchEvent(new win.document.defaultView!.MouseEvent('auxclick', { bubbles: true, button: 1 }))
    click(win, '#download', { button: 2 })
    const canceled = new win.document.defaultView!.MouseEvent('click', { bubbles: true, cancelable: true })
    canceled.preventDefault()
    link.dispatchEvent(canceled)
    expect(events(win, 'download_click')).toHaveLength(1)
    analytics.dispose()
    click(win, '#download')
    expect(events(win, 'download_click')).toHaveLength(1)
    expect(router.onAfterRouteChange).toBe(priorHook)
  })

  it('keeps Baidu optional, disables its automatic pageview and sends sanitized manual events', () => {
    const win = browser('https://lifelog.iofree.xyz/docs/download?email=private@example.com', {
      LIFELOG_ANALYTICS_PROVIDER: 'baidu', LIFELOG_BAIDU_ID: baiduId, LIFELOG_GA4_ID: ga4Id
    })
    installAnalytics({}, { production: true, window: win })
    expect(win.dataLayer).toBeUndefined()
    expect(win._hmt?.slice(0, 2)).toEqual([['_setAutoPageview', false], ['_trackPageview', '/docs/download']])
    expect(win.document.querySelector('script[src]')?.getAttribute('src')).toBe(`https://hm.baidu.com/hm.js?${baiduId}`)
    win.document.body.innerHTML = '<a id="apk" href="https://apk.iofree.xyz/lifelog.apk?email=private@example.com">Download</a>'
    click(win, '#apk')
    expect(win._hmt?.[2]?.slice(0, 3)).toEqual(['_trackEvent', 'download_click', 'android'])
    expect(JSON.parse(win._hmt![2][3] as string)).toMatchObject({ placement: 'download_page', destination: 'https://apk.iofree.xyz/lifelog.apk' })
    expect(JSON.stringify(win._hmt)).not.toContain('private')
  })
})
