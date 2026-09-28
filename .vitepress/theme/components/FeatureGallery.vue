<template>
  <div class="feature-gallery">
    <div class="gallery-container">
      <h2 class="gallery-title">看看日常如何被记住</h2>
      <p class="gallery-hint"><span class="swipe-hint">左右滑动浏览 · </span>点击图片放大</p>
      <div class="screenshots-grid">
        <div 
          v-for="(screenshot, index) in screenshots"
          :key="index"
          class="screenshot-item"
        >
          <div v-if="screenshot.title || screenshot.description" class="screenshot-caption">
            <h3 v-if="screenshot.title">{{ screenshot.title }}</h3>
            <p v-if="screenshot.description">{{ screenshot.description }}</p>
          </div>
          <ScreenshotPreview :screenshot="screenshot" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ScreenshotPreview from './ScreenshotPreview.vue'

defineProps({
  screenshots: {
    type: Array,
    required: true
  }
})

</script>

<style scoped>
.feature-gallery {
  padding: 60px 20px;
  background: var(--vp-c-bg);
}

.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-title {
  margin: 0 0 12px;
  font-size: 1.75rem;
  line-height: 1.3;
}

.gallery-hint {
  margin: 0 0 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.swipe-hint {
  display: none;
}

.screenshot-caption {
  flex: 1;
  padding: 20px;
}

.screenshot-caption h3 {
  margin: 0 0 8px;
  font-size: 18px;
  line-height: 1.4;
}

.screenshot-caption p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}



.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.screenshot-item {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--vp-c-border);
}

.screenshot-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand);
}




@media (max-width: 768px) {
  .feature-gallery {
    padding: 40px 20px;
  }
  
  .screenshots-grid {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: min(80%, 300px);
    gap: 16px;
    overflow-x: auto;
    padding: 4px 2px 18px;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: thin;
  }

  .screenshot-item {
    scroll-snap-align: start;
  }

  .screenshot-item:hover {
    transform: none;
  }

  .swipe-hint {
    display: inline;
  }
}
</style>