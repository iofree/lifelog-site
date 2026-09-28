<template>
  <div class="screenshot-preview">
    <button
      ref="trigger"
      type="button"
      class="screenshot-trigger"
      :aria-label="`${openLabel}: ${screenshot.title || screenshot.alt}`"
      aria-haspopup="dialog"
      :aria-expanded="opened"
      @click="openPreview"
    >
      <img :src="screenshot.src" :alt="screenshot.alt" :width="screenshot.width" :height="screenshot.height" loading="lazy" decoding="async" />
    </button>
    <dialog ref="dialog" class="preview-dialog" :aria-label="screenshot.title || screenshot.alt" @close="restoreFocus" @click="closeOnBackdrop" @keydown.tab.prevent="focusClose">
      <div class="preview-toolbar">
        <span class="preview-title">{{ screenshot.title }}</span>
        <button type="button" class="preview-close" autofocus @click="dialog.close()">{{ closeLabel }}</button>
      </div>
      <img v-if="opened" :src="screenshot.src" :alt="screenshot.alt" :width="screenshot.width" :height="screenshot.height" loading="lazy" decoding="async" />
    </dialog>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'

defineProps({
  screenshot: {
    type: Object,
    required: true
  },
  openLabel: {
    type: String,
    default: '查看大图'
  },
  closeLabel: {
    type: String,
    default: '关闭预览'
  }
})

const trigger = ref(null)
const dialog = ref(null)
const opened = ref(false)

async function openPreview() {
  opened.value = true
  await nextTick()
  dialog.value.showModal()
}

function restoreFocus() {
  opened.value = false
  trigger.value?.focus({ preventScroll: true })
}
function focusClose() {
  dialog.value?.querySelector('.preview-close')?.focus()
}

function closeOnBackdrop(event) {
  if (event.target === dialog.value) dialog.value.close()
}
</script>

<style scoped>
:global(html:has(.preview-dialog[open])) {
  overflow: hidden;
}

.screenshot-trigger {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}

.screenshot-trigger:focus-visible {
  outline: 3px solid var(--vp-c-brand);
  outline-offset: -3px;
}

.screenshot-preview img {
  display: block;
  width: 100%;
  height: auto;
}

.preview-dialog {
  width: min(640px, calc(100vw - 32px));
  max-width: none;
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  overflow: auto;
  overscroll-behavior: contain;
}

.preview-dialog::backdrop {
  background: rgba(0, 0, 0, 0.7);
}

.preview-toolbar {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-border);
}

.preview-title {
  font-weight: 600;
}

.preview-close {
  flex-shrink: 0;
  min-height: 44px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font: inherit;
  cursor: pointer;
}

.preview-close:focus-visible {
  outline: 3px solid var(--vp-c-brand);
  outline-offset: 2px;
}
</style>
