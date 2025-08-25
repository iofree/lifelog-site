---
layout: page
title: Lifelog Note - Record Your Life with Multimedia Diary | Free Diary App
description: Lifelog Note is a powerful free multimedia diary app that supports rich text editing, photos, videos, audio recording, calendar view, data export, cloud sync and more. Capture every beautiful moment of your life. Free download for iOS and Android.
keywords: lifelog,diary app,journal,life recording,multimedia diary,free diary app,mobile diary app,iOS diary app,Android diary software,personal diary,private diary,digital diary
head:
  - - script
    - type: application/ld+json
    - innerHTML: |
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://lifelog.iofree.xyz/en/",
          "name": "Lifelog Note",
          "description": "A beautiful, private-first diary app to capture, organize, and relive your life's moments, turning your memories into a timeless treasure."
        }
---

<script setup>
import { screenshotsConfig } from '../../config/screenshots.js'
</script>

<HeroWithPhoneEn 
  name="Lifelog Note"
  text="Record your life with text, images, videos, and audio"
  tagline="Capture every beautiful moment of your life"
  downloadLink="/en/docs/download"
/>

<FeatureGalleryEn :screenshots="screenshotsConfig.en" />
