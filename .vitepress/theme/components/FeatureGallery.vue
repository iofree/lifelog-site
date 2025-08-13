<template>
  <div class="feature-gallery">
    <div class="gallery-container">
      <div class="screenshots-grid">
        <div 
          v-for="(screenshot, index) in displayScreenshots" 
          :key="index"
          class="screenshot-item"
        >
          <img :src="screenshot.src" :alt="screenshot.alt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  screenshots: {
    type: Array,
    default: () => []
  }
})

// 如果没有传入截图配置，使用默认配置
const displayScreenshots = computed(() => {
  if (props.screenshots.length > 0) {
    return props.screenshots
  }
  
  // 默认配置：自动生成1-10的截图
  const defaultScreenshots = []
  for (let i = 1; i <= 10; i++) {
    defaultScreenshots.push({
      src: `/assets/img/${i}.png`,
      alt: `功能截图 ${i}`
    })
  }
  return defaultScreenshots
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



.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.screenshot-item {
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

.screenshot-item img {
  width: 100%;
  height: auto;
  display: block;
}



@media (max-width: 768px) {
  .feature-gallery {
    padding: 40px 20px;
  }
  
  .screenshots-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
}
</style>