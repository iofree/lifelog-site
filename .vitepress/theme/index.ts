import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { applySeo } from '../utils/seo'
import './custom.css'
import './page-styles.css'
import HeroWithPhone from './components/HeroWithPhone.vue'
import HeroWithPhoneEn from './components/HeroWithPhoneEn.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import FeaturesSectionEn from './components/FeaturesSectionEn.vue'
import FeatureGallery from './components/FeatureGallery.vue'
import FeatureGalleryEn from './components/FeatureGalleryEn.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import StructuredData from './components/StructuredData.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { frontmatter, site } = useData()
    const route = useRoute()

    watch(
      () => route.path,
      () => {
        applySeo(frontmatter.value, site.value)
      },
      { immediate: true }
    )

    return h(DefaultTheme.Layout, null, {
      // pass through slots
    })
  },
  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('HeroWithPhone', HeroWithPhone)
    app.component('HeroWithPhoneEn', HeroWithPhoneEn)
    app.component('FeaturesSection', FeaturesSection)
    app.component('FeaturesSectionEn', FeaturesSectionEn)
    app.component('FeatureGallery', FeatureGallery)
    app.component('FeatureGalleryEn', FeatureGalleryEn)
    app.component('Breadcrumb', Breadcrumb)
    app.component('StructuredData', StructuredData)

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
    }
  }
} satisfies Theme
