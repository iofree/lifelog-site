import { nativeMarket } from './android-download'

import { nextTick } from 'vue'

type RouteHook = (to: string) => void | Promise<void>

interface AnalyticsRouter {
  onAfterRouteChange?: RouteHook
  onAfterRouteChanged?: RouteHook
}

interface AnalyticsSettings {
  provider: 'ga4' | 'baidu'
  id: string
  hostname: string
}

interface AnalyticsController {
  trackPageView: () => void
  dispose: () => void
}

interface AnalyticsInstallation extends AnalyticsController {
  key: string
  bindRouter: (router: AnalyticsRouter) => void
}

type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  _hmt?: unknown[]
  __lifelogAnalytics?: AnalyticsInstallation
}

const androidStores = new Set([
  'play.google.com', 'appgallery.huawei.com', 'app.mi.com',
  'store.oppomobile.com', 'h5.appstore.vivo.com.cn', 'sj.qq.com'
])
const placements = new Set(['hero', 'guide_end', 'download_page', 'other'])

function withoutQueryAndHash(value: string, base: string): string {
  const market = nativeMarket(value)
  if (market) return 'android-market:' + market.id
  try {
    const url = new URL(value, base)
    return /^https?:$/.test(url.protocol) ? `${url.origin}${url.pathname}` : ''
  } catch {
    return ''
  }
}

function pagePath(win: Window): string {
  return win.location.pathname.replace(/\/index(?:\.html)?$/, '/').replace(/\.html$/, '')
}

function locale(path: string): string {
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'zh'
}

function downloadPlatform(url: URL): string | undefined {
  if (nativeMarket(url.href)) return 'android'
  if (!/^https?:$/.test(url.protocol)) return
  if (url.hostname === 'apps.apple.com' || url.hostname === 'itunes.apple.com') return 'ios'
  if (androidStores.has(url.hostname) ||
    (url.hostname === 'apk.iofree.xyz' && /\.apk$/i.test(url.pathname))) return 'android'
}

function placement(link: Element, path: string): string {
  const explicit = link.closest('[data-analytics-placement]')?.getAttribute('data-analytics-placement')
  if (explicit && placements.has(explicit)) return explicit
  if (link.closest('.hero-with-phone')) return 'hero'
  if (/^\/(?:en\/)?docs\/download\/?$/.test(path)) return 'download_page'
  return 'other'
}

export function installAnalytics(
  router: AnalyticsRouter,
  { production, window: win = window }: { production: boolean; window?: Window }
): AnalyticsController | undefined {
  if (!production) return
  const browser = win as AnalyticsWindow
  const document = win.document
  let settings: AnalyticsSettings
  try {
    settings = JSON.parse(document.getElementById('lifelog-analytics-config')?.textContent || '')
  } catch {
    return
  }
  if (!settings || settings.hostname !== 'lifelog.iofree.xyz' ||
    win.location.origin !== `https://${settings.hostname}` ||
    !(settings.provider === 'ga4' && /^G-[A-Z0-9]{6,20}$/.test(settings.id) ||
      settings.provider === 'baidu' && /^[a-f0-9]{32}$/i.test(settings.id))) return

  const key = `${settings.provider}:${settings.id}`
  if (browser.__lifelogAnalytics?.key === key) {
    browser.__lifelogAnalytics.bindRouter(router)
    return browser.__lifelogAnalytics
  }
  browser.__lifelogAnalytics?.dispose()

  let lastLocation = ''
  let boundRouter: AnalyticsRouter | undefined
  let previousModernHook: RouteHook | undefined
  let installedHook: RouteHook | undefined
  const initialReferrer = document.referrer
    ? withoutQueryAndHash(document.referrer, win.location.href)
    : ''

  const send = (name: string, parameters: Record<string, string>) => {
    if (settings.provider === 'ga4') {
      browser.gtag?.('event', name, { ...parameters, send_to: settings.id })
    } else if (name === 'page_view') {
      browser._hmt?.push(['_trackPageview', parameters.page_path])
    } else {
      browser._hmt?.push(['_trackEvent', name, parameters.platform, JSON.stringify(parameters)])
    }
  }

  const trackPageView = () => {
    const path = pagePath(win)
    const location = `${win.location.origin}${path}`
    if (location === lastLocation) return
    const referrer = lastLocation || initialReferrer
    lastLocation = location
    const page = {
      page_location: location,
      page_referrer: referrer,
      page_title: document.title,
      page_path: path,
      locale: locale(path)
    }
    // 同时更新后续事件的默认页面地址，避免带入 URL 查询参数。
    if (settings.provider === 'ga4') browser.gtag?.('set', page)
    send('page_view', page)
  }

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || (event.type === 'click' ? event.button !== 0 : event.button !== 1)) return
    const target = event.target as Element | null
    const link = target?.closest?.('a[href]')
    if (!link) return
    let destination: URL
    try {
      destination = new URL(link.getAttribute('href') || '', win.location.href)
    } catch {
      return
    }
    const platform = downloadPlatform(destination)
    if (!platform) return
    const path = pagePath(win)
    send('download_click', {
      platform,
      placement: placement(link, path),
      page_path: path,
      locale: locale(path),
      destination: withoutQueryAndHash(destination.href, win.location.href)
    })
  }

  const unbindRouter = () => {
    if (boundRouter && boundRouter.onAfterRouteChange === installedHook) {
      boundRouter.onAfterRouteChange = previousModernHook
    }
  }
  const installation: AnalyticsInstallation = {
    key,
    trackPageView,
    bindRouter(nextRouter) {
      if (boundRouter === nextRouter && nextRouter.onAfterRouteChange === installedHook) return
      unbindRouter()
      boundRouter = nextRouter
      previousModernHook = nextRouter.onAfterRouteChange
      const previous = nextRouter.onAfterRouteChange ?? nextRouter.onAfterRouteChanged
      installedHook = async (to) => {
        await previous?.(to)
        await nextTick()
        trackPageView()
      }
      nextRouter.onAfterRouteChange = installedHook
    },
    dispose() {
      document.removeEventListener('click', onClick)
      document.removeEventListener('auxclick', onClick)
      unbindRouter()
      document.getElementById('lifelog-analytics-sdk')?.remove()
      if (browser.__lifelogAnalytics === installation) delete browser.__lifelogAnalytics
    }
  }

  if (settings.provider === 'ga4') {
    browser.dataLayer = browser.dataLayer || []
    browser.gtag = browser.gtag || function (..._args: unknown[]) {
      browser.dataLayer!.push(arguments)
    }
    browser.gtag('js', new Date())
    browser.gtag('config', settings.id, {
      send_page_view: false,
      page_location: `${win.location.origin}${pagePath(win)}`,
      page_referrer: initialReferrer,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    })
  } else {
    browser._hmt = browser._hmt || []
    browser._hmt.push(['_setAutoPageview', false])
  }

  const script = document.createElement('script')
  script.id = 'lifelog-analytics-sdk'
  script.async = true
  script.referrerPolicy = 'no-referrer'
  script.src = settings.provider === 'ga4'
    ? `https://www.googletagmanager.com/gtag/js?id=${settings.id}`
    : `https://hm.baidu.com/hm.js?${settings.id}`
  document.head.appendChild(script)
  document.addEventListener('click', onClick)
  document.addEventListener('auxclick', onClick)
  browser.__lifelogAnalytics = installation
  installation.bindRouter(router)
  trackPageView()
  return installation
}
