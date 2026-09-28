import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './custom.css'
import './page-styles.css'
import HeroWithPhone from './components/HeroWithPhone.vue'
import HeroWithPhoneEn from './components/HeroWithPhoneEn.vue'
import FeatureGallery from './components/FeatureGallery.vue'
import FeatureGalleryEn from './components/FeatureGalleryEn.vue'
import AndroidDownload from './components/AndroidDownload.vue'
import { installAnalytics } from '../utils/analytics'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('HeroWithPhone', HeroWithPhone)
    app.component('HeroWithPhoneEn', HeroWithPhoneEn)
    app.component('FeatureGallery', FeatureGallery)
    app.component('FeatureGalleryEn', FeatureGalleryEn)
    app.component('AndroidDownload', AndroidDownload)

    // 语言偏好记录和自动跳转
    if (typeof window !== 'undefined') {
      const LANG_KEY = 'vitepress-preferred-lang'

      // 首页访问时检查语言偏好并自动跳转
      const checkAndRedirect = () => {
        if (window.location.pathname === '/') {
          try {
            const preferredLang = localStorage.getItem(LANG_KEY)
            if (preferredLang === 'en') {
              window.location.replace('/en/')
            }
          } catch (e) {
            // 忽略localStorage错误
          }
        }
      }

      // 页面加载完成后检查
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndRedirect)
      } else {
        checkAndRedirect()
      }

      router.onAfterRouteChanged = (to) => {
        const isEnPath = to.startsWith('/en/')
        const currentLang = isEnPath ? 'en' : 'zh'
        try {
          localStorage.setItem(LANG_KEY, currentLang)
        } catch (e) {
          // 忽略localStorage错误
        }
      }

      installAnalytics(router, { production: import.meta.env.PROD })
    }
  }
} satisfies Theme
