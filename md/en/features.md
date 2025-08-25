---
outline: deep
title: Features
description: Discover all the features of Lifelog Note, including rich text editing, multimedia support, privacy protection, data management, and more.
keywords: Lifelog Note features,rich text editor,multimedia diary,privacy journal,data backup,data migration
---

<script setup>
import { ref } from 'vue';

const articleData = ref({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Lifelog Note Features",
  "description": "Discover all the features of Lifelog Note, including rich text editing, multimedia support, privacy protection, data management, and more.",
  "author": {
    "@type": "Organization",
    "name": "Lifelog Note"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Lifelog Note",
    "logo": {
      "@type": "ImageObject",
      "url": "https://lifelog.iofree.xyz/assets/logo.png"
    }
  }
});
</script>

<StructuredData :data="articleData" />

# Feature Introduction

Lifelog is a powerful, privacy-focused, local-first diary and note-taking application, designed to help you easily record the bits and pieces of your life, and to review and cherish your memories in multiple ways.

<img src="/assets/feature_view.png" alt="Feature View">

## Core Recording Functions

### Powerful Rich Text Editor
- **Multi-format text**: Supports multiple text styles such as headings, bold, italic, underline, strikethrough, quotes, and code blocks.
- **Lists and checklists**: Easily create ordered lists, unordered lists, and checkable to-do lists.
- **Custom styles**: Adjustable font, font size, line spacing, and paragraph spacing to create the most comfortable reading and writing experience.
- **Quick toolbar**: Provides a customizable floating toolbar with frequently used functions within reach, and supports multi-line display.

### Rich and Diverse Media Support
- **Images and Live Photos**: Easily insert photos and Live Photos from the album, with support for image editing and cropping.
- **Video and Audio**: Supports adding videos and recording/importing audio files to make your records vivid with sound and color.
- **Attachment support**: Can add attachments in various formats such as PDF, Word documents, and compressed packages.
- **Speech-to-text**: Quickly convert your voice recordings into text for easy organization and searching.

### Smart and Assisted Creation
- **Diary templates**: Built-in multiple diary templates (e.g., movie reviews, daily reflections), and supports creating and sharing your own templates.
- **Mood and weather**: Add mood icons, Emoji, or weather conditions to each diary to intuitively capture the emotion of the moment.
- **Auto-save**: All content is automatically saved in real-time, so there's no need to worry about losing content.
- **Word count**: View the word count of the current note in real-time, and provides detailed daily, monthly, and yearly writing statistics charts.

## Organization and Browsing

### Multi-dimensional Browsing Methods
- **Timeline view**: Browse all diaries in reverse or chronological order, with support for quick monthly jumps.
- **Calendar view**: Intuitively display daily records in a calendar format, and allows for customizing the calendar cover photo.
- **Map view**: View all diaries with geographic locations on a map, creating your own personal footprint map.
- **Media gallery**: Centrally browse all images and videos from your notes.
- **"Wander"**: Randomly review past diaries in a stacked card format to discover forgotten surprises.

### Powerful Organization and Management Capabilities
- **Notebooks**: Create multiple independent notebooks to completely isolate content on different topics (such as work, life, travel).
- **Multi-level tag system**: Classify diaries using tags, supporting the creation of hierarchical tags (parent-child tags) for more refined management.
- **Diary series**: Link multiple related diaries into a storyline for continuous reading and reviewing of a complete event.
- **Pinning function**: Pin important diaries to the top for quick access.
- **Batch operations**: Supports multi-selecting diaries for batch operations like deleting, moving, adding/removing tags, and merging into a diary series.

### Efficient Search Function
- **Full-text search**: Quickly search diary content, comments, and diary series titles.
- **Advanced filtering**: Supports combined filtering by tags, geographic location, and diary type (diary/comment/diary series).

## Personalization and Customization

### Interface and Appearance
- **Theme mode**: Supports three modes: light, dark, and follow system settings.
- **Custom fonts**: Supports importing and using your own favorite font files.
- **Display adjustment**: Freely adjust the home page view (timeline/calendar/cards, etc.), text line height, paragraph spacing, and image display style (nine-square grid/waterfall).
- **Timeline style**: Provides multiple timeline date display styles to meet different aesthetic preferences.

### Special Features
- **On This Day**: Review content recorded on the same day in past years.
- **Annual Report**: Generate your annual writing summary report.
- **Desktop widgets**: Quickly access "Wander", "Latest Notes", "On This Day", and other content from your phone's home screen.

## Data and Security

### Privacy and Security
- **Local-first**: All data is stored on your device locally by default, ensuring privacy and security.
- **App lock**: Supports setting a password and biometric (Face/Fingerprint ID) to lock the application.
- **Privacy view**: Automatically blurs the app interface when entering the background to prevent information leaks.

### Backup and Sync
- **iCloud**: Back up and sync data via your personal iCloud Drive.
- **WebDAV**: Supports backing up to your own NAS or other cloud services via the WebDAV protocol.
- **Aliyun Drive**: Provides Aliyun Drive as an additional backup option.
- **Automatic backup**: Can automatically perform backup tasks when the app is opened for recording.

### Import and Export
- **Data export**: Export all data (including media files) as a single .zip archive for easy migration and storage.
- **PDF export**: Export diaries as beautifully formatted PDF files based on a specified time range and tags.
- **Data import**: Supports restoring all data from a backup .zip file.

## Sharing

- **Image sharing**: Generate beautiful long images of a single diary or an entire diary series for sharing.
- **Calendar sharing**: Generate images of monthly or yearly calendar views for sharing.
