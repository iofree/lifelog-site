<template>
  <div class="features-section">
    <div class="features-container">
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-card"
        >
          <div class="feature-icon">
            <span v-if="index === 0">📝</span>
            <span v-else-if="index === 1">📸</span>
            <span v-else-if="index === 2">🔒</span>
            <span v-else>✨</span>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-details">{{ feature.details }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.features-section {
  padding: 100px 20px;
  background: var(--vp-c-bg-soft);
  position: relative;
}

.features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--vp-c-border);
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.feature-card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 32px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--vp-c-border);
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--vp-c-brand);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  border-radius: 12px 12px 0 0;
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
  display: inline-block;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  background: var(--vp-c-brand);
  transform: scale(1.05);
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  line-height: 1.3;
}

.feature-details {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .features-section {
    padding: 60px 20px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .feature-card {
    padding: 32px 24px;
  }
  
  .feature-icon {
    font-size: 2.5rem;
    padding: 16px;
  }
  
  .feature-title {
    font-size: 1.3rem;
  }
  
  .feature-details {
    font-size: 1rem;
  }
}
</style>