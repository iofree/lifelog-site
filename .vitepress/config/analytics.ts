// 分析工具配置
export const analyticsConfig = {
  // Google Analytics 4 - 需要配置实际ID
  googleAnalytics: {
    id: '', // 请替换为实际的GA4测量ID，如：G-XXXXXXXXXX
    enabled: false // 配置ID后设为true
  },

  // 百度统计 - 需要配置实际ID
  baiduAnalytics: {
    id: '', // 请替换为实际的百度统计ID
    enabled: false // 配置ID后设为true
  }
}

// 生成分析工具脚本
export function generateAnalyticsScripts() {
  const scripts = []

  // Google Analytics 4
  if (analyticsConfig.googleAnalytics.enabled && analyticsConfig.googleAnalytics.id) {
    scripts.push(
      ['script', { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalytics.id}` }],
      ['script', {}, `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${analyticsConfig.googleAnalytics.id}');
      `]
    )
  }

  // 百度统计
  if (analyticsConfig.baiduAnalytics.enabled && analyticsConfig.baiduAnalytics.id) {
    scripts.push(
      ['script', {}, `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?${analyticsConfig.baiduAnalytics.id}";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `]
    )
  }

  return scripts
}