<script setup lang="ts">
import type { GalleryContent } from '~/../../shared/types/blocks'
defineProps<{ content: GalleryContent }>()

const lightbox = ref<string | null>(null)
</script>

<template>
  <section class="block-gallery section-padding">
    <div class="container-brand">
      <h2 v-if="content.title" class="gallery-title">{{ content.title }}</h2>

      <div class="gallery-grid" :style="{ '--cols': content.columns }">
        <button
          v-for="(img, i) in content.images"
          :key="i"
          class="gallery-item"
          @click="lightbox = img.src"
        >
          <img :src="img.src" :alt="img.alt || img.caption" loading="lazy" />
          <span v-if="img.caption" class="gallery-caption">{{ img.caption }}</span>
        </button>
      </div>

      <div v-if="lightbox" class="lightbox" @click.self="lightbox = null">
        <button class="lightbox-close" @click="lightbox = null">
          <UIcon name="lucide:x" />
        </button>
        <img :src="lightbox" class="lightbox-img" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.block-gallery { background: #fff; }

.gallery-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  color: var(--anthracite);
  text-align: center;
  margin: 0 0 48px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols, 3), 1fr);
  gap: 16px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
  border: none;
  padding: 0;
  cursor: pointer;
  background: #f3f4f6;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-item:hover img { transform: scale(1.05); }

.gallery-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 12px;
  padding: 8px;
  transform: translateY(100%);
  transition: transform 0.2s;
}

.gallery-item:hover .gallery-caption { transform: translateY(0); }

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255,255,255,0.15);
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-img { max-width: 90vw; max-height: 90vh; object-fit: contain; }

@media (max-width: 767px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 479px) { .gallery-grid { grid-template-columns: 1fr; } }
</style>
