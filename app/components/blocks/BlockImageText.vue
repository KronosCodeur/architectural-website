<script setup lang="ts">
import type { ImageTextContent } from '~/../../shared/types/blocks'
defineProps<{ content: ImageTextContent }>()
</script>

<template>
  <section class="block-image-text section-padding">
    <div
      class="container-brand image-text-inner"
      :class="{ reversed: content.layout === 'image-right' }"
    >
      <div class="image-col">
        <img
          v-if="content.image"
          :src="content.image"
          :alt="content.imageAlt || content.title"
          class="block-img"
          loading="lazy"
        />
        <div v-else class="img-placeholder">
          <UIcon name="lucide:image" />
        </div>
      </div>

      <div class="text-col">
        <h2 v-if="content.title" class="block-title">{{ content.title }}</h2>
        <div class="prose" v-html="content.content" />
        <NuxtLink v-if="content.ctaText" :to="content.ctaUrl" class="btn-primary">
          {{ content.ctaText }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.block-image-text { background: #fff; }

.image-text-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.image-text-inner.reversed { direction: rtl; }
.image-text-inner.reversed > * { direction: ltr; }

.block-img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}

.img-placeholder {
  width: 100%;
  aspect-ratio: 4/3;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #d1d5db;
}

.block-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  color: var(--anthracite);
  margin: 0 0 20px;
}

.prose { color: var(--gray-text); line-height: 1.8; margin-bottom: 24px; }
.prose :deep(p) { margin: 0 0 12px; }

@media (max-width: 767px) {
  .image-text-inner { grid-template-columns: 1fr; gap: 32px; }
  .image-text-inner.reversed { direction: ltr; }
}
</style>
