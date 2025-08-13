<template>
  <div class="app-showcase">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    
    <div class="showcase-container">
      <div class="app-preview">
        <div class="phone-mockup">
          <div class="phone-shadow"></div>
          <img src="/assets/black.png" alt="Phone mockup" class="phone-frame" />
          <div class="screen-content">
            <img src="/assets/screenshot/main.png" alt="App screenshot" class="app-screenshot" />
          </div>
          <div class="phone-glow"></div>
        </div>
      </div>
      <div class="app-info">
        <div class="badge">✨ New Experience</div>
        <h2 class="app-title">{{ title }}</h2>
        <p class="app-description">{{ description }}</p>
        <div class="feature-highlights">
          <div class="highlight-item">
            <div class="highlight-icon">📝</div>
            <span>Rich Text</span>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">📸</div>
            <span>Multimedia</span>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🔒</div>
            <span>Secure</span>
          </div>
        </div>
        <div class="download-buttons">
          <a href="/md/en/download" class="download-btn primary">
            <div class="btn-content">
              <span class="btn-icon">📱</span>
              <div class="btn-text">
                <span class="btn-title">Download Now</span>
                <span class="btn-subtitle">iOS & Android</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Lifelog Note'
  },
  description: {
    type: String,
    default: 'Record your life with text, images, videos, and audio'
  }
})
</script>

<style scoped>
.app-showcase {
  position: relative;
  padding: 100px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  top: 10%;
  right: 30%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.showcase-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.app-preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone-mockup {
  position: relative;
  width: 320px;
  height: auto;
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.3s ease;
}

.phone-mockup:hover {
  transform: perspective(1000px) rotateY(0deg) scale(1.02);
}

.phone-shadow {
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 40px;
  filter: blur(30px);
  z-index: -1;
}

.phone-frame {
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 2;
}

.screen-content {
  position: absolute;
  top: 12%;
  left: 12%;
  right: 12%;
  bottom: 12%;
  border-radius: 25px;
  overflow: hidden;
  z-index: 3;
}

.app-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.phone-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50px;
  opacity: 0.3;
  filter: blur(20px);
  z-index: -1;
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  from { opacity: 0.3; }
  to { opacity: 0.6; }
}

.app-info {
  padding: 20px 0;
  color: white;
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.app-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 24px;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.app-description {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  line-height: 1.6;
}

.feature-highlights {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
  font-weight: 600;
}

.highlight-icon {
  font-size: 1.2rem;
}

.download-buttons {
  display: flex;
  gap: 16px;
}

.download-btn {
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;
}

.download-btn.primary {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.download-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(255, 107, 107, 0.4);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 32px;
  color: white;
}

.btn-icon {
  font-size: 2rem;
}

.btn-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn-title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
}

.btn-subtitle {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .app-showcase {
    padding: 60px 20px;
  }
  
  .showcase-container {
    grid-template-columns: 1fr;
    gap: 50px;
    text-align: center;
  }
  
  .phone-mockup {
    width: 280px;
    transform: none;
  }
  
  .phone-mockup:hover {
    transform: scale(1.02);
  }
  
  .app-title {
    font-size: 2.8rem;
  }
  
  .app-description {
    font-size: 1.1rem;
  }
  
  .feature-highlights {
    flex-direction: column;
    gap: 12px;
  }
  
  .highlight-item {
    justify-content: center;
  }
  
  .download-buttons {
    justify-content: center;
  }
  
  .floating-shape {
    display: none;
  }
}
</style>