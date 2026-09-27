<template>
  <div class="hero-with-phone">
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-name">{{ name }}</h1>
        <p class="hero-text">{{ text }}</p>
        <p class="hero-tagline">{{ tagline }}</p>
        
        <div class="feature-highlights">
          <div class="highlight-item">
            <div class="highlight-icon">📝</div>
            <div class="highlight-content">
              <a href="/en/docs/thread" class="highlight-title">Diary Threads</a>
              <span class="highlight-desc">Connect related entries into one story</span>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">📸</div>
            <div class="highlight-content">
              <span class="highlight-title">Live Photos, Video & Audio</span>
              <span class="highlight-desc">Keep motion and sound with membership features</span>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🔒</div>
            <div class="highlight-content">
              <a href="/en/docs/backup-and-migration" class="highlight-title">Local Storage & Backups</a>
              <span class="highlight-desc">Keep entries on your device and choose your own backups</span>
            </div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">📅</div>
            <div class="highlight-content">
              <span class="highlight-title">Photo Calendar</span>
              <span class="highlight-desc">Revisit recorded days in your calendar and timeline</span>
            </div>
          </div>
        </div>
        
        <p class="hero-note">Known as 人生笔记Real in China. Free to download, with optional paid features.</p>

        <div class="hero-actions">
          <a :href="downloadLink" class="hero-btn primary">
            <div class="btn-content">
              <span class="btn-icon">📱</span>
              <div class="btn-text">
                <span class="btn-title">App Store</span>
                <span class="btn-subtitle">iPhone & iPad</span>
              </div>
            </div>
          </a>
          <a href="/en/docs/download" class="hero-btn secondary">
            <div class="btn-content">
              <span class="btn-icon">🤖</span>
              <div class="btn-text">
                <span class="btn-title">Android</span>
                <span class="btn-subtitle">Download options</span>
              </div>
            </div>
          </a>
        </div>
      </div>
      
      <div class="hero-phone">
        <div class="phone-mockup">
          <div class="phone-shadow"></div>
          <img :src="heroScreenshot.src" :alt="heroScreenshot.alt" :width="heroScreenshot.width" :height="heroScreenshot.height" class="phone-frame" fetchpriority="high" decoding="async" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { screenshotsConfig } from '../../../config/screenshots'

const heroScreenshot = screenshotsConfig.en[0]

defineProps({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  downloadLink: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.hero-with-phone {
  position: relative;
  padding: 120px 20px 60px;
  background: var(--vp-c-bg);
  min-height: 70vh;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  color: var(--vp-c-text-1);
}



.hero-name {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.1;
  color: var(--vp-c-text-1);
}

.hero-text {
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  line-height: 1.4;
  font-weight: 500;
}

.hero-tagline {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
  line-height: 1.6;
}

.feature-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 32px;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--vp-c-bg-soft);
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  transition: all 0.2s ease;
}

.highlight-item:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand);
}

.highlight-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.highlight-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}

.highlight-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.3;
}

.highlight-icon {
  font-size: 1.1rem;
}

.hero-note {
  margin-bottom: 20px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.hero-btn.secondary {
  border: 1px solid var(--vp-c-border);
}

.hero-btn.secondary .btn-content {
  color: var(--vp-c-text-1);
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-btn {
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 16px;
  font-weight: 600;
}

.hero-btn.primary {
  background: var(--vp-c-brand, #007AFF);
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-brand, #007AFF);
}

/* 暗色模式下使用更深的蓝色 */
.dark .hero-btn.primary {
  background: #0056CC;
  border-color: #0056CC;
}

.hero-btn.primary:hover {
  background: var(--vp-c-brand-darker, #0056CC);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.hero-btn.primary:hover .btn-content {
  color: white !important;
}



.btn-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  color: white;
}

.btn-icon {
  font-size: 1.6rem;
}

.btn-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn-title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
}

.btn-subtitle {
  font-size: 0.8rem;
  opacity: 0.9;
  margin-top: 1px;
}

.hero-phone {
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone-mockup {
  position: relative;
  width: 320px;
  height: auto;
  transition: transform 0.3s ease;
}

.phone-mockup:hover {
  transform: scale(1.02);
}

.phone-shadow {
  position: absolute;
  top: 15px;
  left: 15px;
  right: -15px;
  bottom: -15px;
  background: var(--vp-c-shadow);
  border-radius: 40px;
  filter: blur(20px);
  z-index: -1;
  opacity: 0.1;
}

.phone-frame {
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .hero-with-phone {
    padding: 80px 20px 40px;
    min-height: auto;
  }
  
  .hero-container {
    grid-template-columns: 1fr;
    gap: 50px;
    text-align: center;
  }
  
  .hero-name {
    font-size: 3rem;
  }
  
  .hero-text {
    font-size: 1.3rem;
  }
  
  .hero-tagline {
    font-size: 1.1rem;
  }
  
  .feature-highlights {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .highlight-item {
    padding: 10px 12px;
  }
  
  .hero-actions {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  

  
  .phone-mockup {
    width: 280px;
    transform: none;
  }
  
  .phone-mockup:hover {
    transform: scale(1.02);
  }
  
  .floating-shape {
    display: none;
  }
}
</style>