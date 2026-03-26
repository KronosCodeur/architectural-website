<script setup lang="ts">
import type { TextContent } from '~/../../shared/types/blocks'
defineProps<{ content: TextContent }>()
</script>

<template>
  <section class="block-text section-padding">
    <div class="container-brand" :style="{ textAlign: content.alignment }">
      <div class="prose" v-html="content.content" />
    </div>
  </section>
</template>

<style scoped>
.block-text { background: var(--ivory); }

.prose {
  max-width: 780px;
  margin: 0 auto;
  color: var(--anthracite);
  font-size: 16px;
  line-height: 1.8;
}

.prose :deep(h2) {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0 0 20px;
  color: var(--anthracite);
}

.prose :deep(h3) {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 24px 0 12px;
}

.prose :deep(p) { margin: 0 0 16px; }
.prose :deep(ul), .prose :deep(ol) { padding-left: 24px; margin: 0 0 16px; }
.prose :deep(li) { margin-bottom: 8px; }
.prose :deep(strong) { font-weight: 600; }
.prose :deep(a) { color: var(--vert); text-decoration: underline; }
</style>
