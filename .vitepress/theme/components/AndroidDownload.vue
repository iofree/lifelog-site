<template>
  <div class="android-download" :class="{ 'android-download-full': full }">
    <a
      v-if="!full || !download.harmony"
      :href="full && !download.android ? androidApk : download.href"
      class="android-download-button"
      :aria-label="english ? 'Download for Android: ' + subtitle : 'Android 下载：' + subtitle"
    >
      <span class="android-icon" aria-hidden="true">🤖</span>
      <span class="android-button-text">
        <span class="android-title">{{ english ? 'Android' : 'Android 下载' }}</span>
        <span class="android-subtitle">{{ subtitle }}</span>
      </span>
    </a>
    <div v-if="!full" class="android-download-options">
      <a v-if="download.market" :href="androidApk">{{ english ? 'Direct APK' : '直接下载 APK' }}</a>
      <a :href="downloadPage">{{ english ? 'More options' : '其他下载方式' }}</a>
    </div>
    <template v-else>
      <p v-if="download.harmony" class="android-download-hint">
        {{ english ? 'On HarmonyOS, check your app market for a compatible version.' : 'HarmonyOS 设备请先在应用市场确认兼容版本。' }}
      </p>
      <p v-else-if="download.market" class="android-download-hint">
        <a :href="androidApk">{{ english ? 'Download the official APK' : '直接下载官方 APK' }}</a>
      </p>
      <p class="android-download-hint">{{ english ? 'More download options' : '其他下载方式' }}</p>
      <div class="android-market-links">
        <a v-for="market in availableMarkets" :key="market.id" :href="useNativeMarket ? marketIntent(market) : market.webUrl">
          {{ english ? market.englishName : market.name }}
        </a>
      </div>
      <p v-if="!useNativeMarket" class="android-download-hint">
        {{ english ? 'You can also search for 人生笔记Real in your phone’s app market.' : '也可在手机应用市场搜索「人生笔记Real」。' }}
      </p>
      <p v-if="download.embedded" class="android-download-hint">
        {{ english ? 'If downloading is blocked in this browser, use its menu to open this page in your browser.' : '如内置浏览器限制下载，可从右上角菜单选择「在浏览器中打开」。' }}
      </p>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { androidApk, androidDownload, androidMarkets, marketIntent } from '../../utils/android-download'

const props = defineProps({
  english: Boolean,
  full: Boolean
})

const userAgent = ref('')
const download = computed(() => androidDownload(userAgent.value, props.english))
const downloadPage = computed(() => (props.english ? '/en' : '') + '/docs/download#android')
const useNativeMarket = computed(() => download.value.android && !download.value.embedded)
const availableMarkets = computed(() => androidMarkets.filter(market =>
  market.id !== download.value.market?.id && (useNativeMarket.value || market.webUrl)
))
const subtitle = computed(() => {
  if (download.value.market) return props.english ? download.value.market.englishName : download.value.market.name
  if (download.value.harmony) return props.english ? 'Check compatibility' : '查看兼容下载方式'
  if (download.value.android || props.full) return props.english ? 'Official APK' : '官方 APK'
  return props.english ? 'App markets & APK' : '应用市场 / APK'
})

onMounted(() => { userAgent.value = navigator.userAgent })
</script>

<style scoped>
.android-download-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  text-decoration: none;
  transition: border-color 0.2s ease;
}

.android-download-button:hover,
.android-download-button:focus-visible {
  border-color: var(--vp-c-brand);
}

.android-icon {
  font-size: 1.6rem;
}

.android-button-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.android-title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
}

.android-subtitle {
  font-size: 0.8rem;
  line-height: 1.4;
  margin-top: 2px;
  color: var(--vp-c-text-2);
}

.android-download-options {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin-top: 8px;
  font-size: 0.75rem;
  line-height: 1.5;
}

.android-download-options a,
.android-download-hint a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.android-download-full .android-download-button {
  width: fit-content;
  min-width: 200px;
}

.android-download-hint {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.android-market-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.android-market-links a {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.android-market-links a:hover,
.android-market-links a:focus-visible {
  border-color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .android-download-button {
    padding: 14px 12px;
    gap: 8px;
  }

  .android-icon {
    font-size: 1.35rem;
  }

  .android-title {
    font-size: 0.95rem;
  }

  .android-subtitle {
    font-size: 0.75rem;
  }
}
</style>
