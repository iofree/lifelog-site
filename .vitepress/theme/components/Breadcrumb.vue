<template>
  <nav class="breadcrumb" aria-label="面包屑导航" v-if="breadcrumbs.length > 1">
    <ol class="breadcrumb-list">
      <li 
        v-for="(item, index) in breadcrumbs" 
        :key="index"
        class="breadcrumb-item"
        :class="{ 'is-current': index === breadcrumbs.length - 1 }"
      >
        <a 
          v-if="index < breadcrumbs.length - 1"
          :href="item.url"
          class="breadcrumb-link"
        >
          {{ item.text }}
        </a>
        <span v-else class="breadcrumb-current">
          {{ item.text }}
        </span>
        <span 
          v-if="index < breadcrumbs.length - 1" 
          class="breadcrumb-separator"
          aria-hidden="true"
        >
          /
        </span>
      </li>
    </ol>
    
    <!-- 使用新的结构化数据组件 -->
    <StructuredData :data="structuredDataObject" />
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import StructuredData from './StructuredData.vue'

interface BreadcrumbItem {
  text: string
  url: string
}

const route = useRoute()

// 生成面包屑数据
const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const path = route.path
  const segments = path.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = [
    { text: '首页', url: '/' }
  ]

  let currentPath = ''
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // 根据路径生成面包屑文本
    let text = segment
    if (segment === 'en') {
      text = 'English'
      items[0] = { text: 'Home', url: '/en/' }
    } else if (segment === 'docs') {
      text = route.path.includes('/en/') ? 'Documentation' : '文档'
    } else if (segment === 'download') {
      text = route.path.includes('/en/') ? 'Download' : '下载'
    } else if (segment === 'privacy') {
      text = route.path.includes('/en/') ? 'Privacy Policy' : '隐私政策'
    } else if (segment === 'terms') {
      text = route.path.includes('/en/') ? 'Terms of Service' : '使用条款'
    }
    
    // 跳过英文路径段，不添加到面包屑中
    if (segment !== 'en') {
      items.push({
        text,
        url: currentPath
      })
    }
  })

  return items
})

// 生成结构化数据对象
const structuredDataObject = computed(() => {
  const items = breadcrumbs.value.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.text,
    item: `https://lifelog.iofree.xyz${item.url}`
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  }
})
</script>

<style scoped>
.breadcrumb {
  margin: 1rem 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.breadcrumb-current {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.breadcrumb-separator {
  color: var(--vp-c-text-3);
  user-select: none;
}

@media (max-width: 768px) {
  .breadcrumb {
    font-size: 0.8rem;
  }
  
  .breadcrumb-list {
    gap: 0.25rem;
  }
  
  .breadcrumb-item {
    gap: 0.25rem;
  }
}
</style>