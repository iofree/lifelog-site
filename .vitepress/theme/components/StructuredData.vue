<template>
  <!-- 这个组件不渲染任何可见内容，只添加结构化数据 -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

interface StructuredDataProps {
  data: Record<string, any>
}

const props = defineProps<StructuredDataProps>()

onMounted(() => {
  // 在客户端动态添加结构化数据
  if (typeof window !== 'undefined' && props.data) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(props.data)
    document.head.appendChild(script)
  }
})
</script>