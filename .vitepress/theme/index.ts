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
    
    // 自定义语言切换逻辑
    if (typeof window !== 'undefined') {
      const LANG_KEY = 'vitepress-preferred-lang';
      
      // 监听DOM变化，拦截语言切换链接
      const setupLanguageSwitchHandler = () => {
        // 等待DOM加载完成
        setTimeout(() => {
          const handleLanguageSwitch = (event: Event) => {
            const target = event.target as HTMLElement;
            const link = target.closest('a[href]') as HTMLAnchorElement;
            
            if (!link) return;
            
            const href = link.getAttribute('href');
            const currentPath = window.location.pathname;
            
            // 检查是否是语言切换链接
            if (href && (href === '/' || href === '/en/' || href.startsWith('/en'))) {
              // 如果当前在 /md 路径下
              if (currentPath.startsWith('/md/')) {
                event.preventDefault();
                
                let newPath: string;
                if (href === '/' || (!href.includes('/en'))) {
                  // 切换到中文
                  newPath = currentPath.replace('/md/en/', '/md/zh/');
                } else {
                  // 切换到英文
                  newPath = currentPath.replace('/md/zh/', '/md/en/');
                }
                
                // 导航到新路径
                router.go(newPath);
                return;
              }
            }
          };
          
          // 添加事件监听器
          document.addEventListener('click', handleLanguageSwitch);
          
          // 清理函数
          const cleanup = () => {
            document.removeEventListener('click', handleLanguageSwitch);
          };
          
          // 在路由变化时重新设置
          router.onAfterRouteChanged = () => {
            cleanup();
            setTimeout(setupLanguageSwitchHandler, 100);
          };
        }, 100);
      };
      
      // 初始设置
      setupLanguageSwitchHandler();
      
      router.onAfterRouteChanged = (to) => {
        const isEnPath = to.startsWith('/en/') || to.startsWith('/md/en/');
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