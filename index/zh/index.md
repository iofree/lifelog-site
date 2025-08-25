---
layout: page
title: 人生笔记 - 用图文,视频,录音日记一生 | 免费多媒体日记应用
description: 人生笔记是一款功能强大的免费多媒体日记应用，支持富文本编辑、图片视频录音、日历视图、数据导出、云同步备份等功能。记录生活的每一个美好瞬间，支持iOS和Android免费下载。
keywords: 人生笔记,日记应用,生活记录,多媒体日记,免费日记应用,手机日记,iOS日记应用,Android日记软件,个人日记,私人日记,电子日记
---

<script setup>
import { ref } from 'vue';
import { screenshotsConfig } from '../../config/screenshots.js'

const webSiteData = ref({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://lifelog.iofree.xyz/zh/",
  "name": "人生笔记",
  "description": "一款美丽、注重隐私的日记应用，帮你捕捉、组织和重温生活的点滴，将你的记忆变为永恒的宝藏。"
});
</script>

<StructuredData :data="webSiteData" />

<HeroWithPhone 
  name="人生笔记"
  text="用图文,视频,录音日记一生"
  tagline="记录生活的每一个美好瞬间"
  downloadLink="/docs/download"
/>

<FeatureGallery :screenshots="screenshotsConfig.zh" />
