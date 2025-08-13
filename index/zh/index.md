---
layout: page
---

<script setup>
import { screenshotsConfig } from '../../config/screenshots.js'
</script>

<HeroWithPhone 
  name="人生笔记"
  text="用图文,视频,录音日记一生"
  tagline="记录生活的每一个美好瞬间"
  downloadLink="/docs/download"
  learnMoreLink="/docs/"
/>

<FeatureGallery :screenshots="screenshotsConfig.zh" />