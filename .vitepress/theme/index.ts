import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
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

    // 语言偏好记录
    if (typeof window !== 'undefined') {
      const LANG_KEY = 'vitepress-preferred-lang';

      router.onAfterRouteChanged = (to) => {
        const isEnPath = to.startsWith('/en/');
        const currentLang = isEnPath ? 'en' : 'zh';
        try {
          localStorage.setItem(LANG_KEY, currentLang);
        } catch (e) {
          // 忽略localStorage错误
        }
      };
    }
  }
} satisfies Theme