---
layout: page
---

<script setup>
import { screenshotsConfig } from '../../config/screenshots.js'
</script>

<HeroWithPhoneEn 
  name="Lifelog Note"
  text="Record your life with text, images, videos, and audio"
  tagline="Capture every beautiful moment of your life"
  downloadLink="/en/download"
  learnMoreLink="/en/"
/>

<FeatureGalleryEn :screenshots="screenshotsConfig.en" />