<script setup lang="ts">
import type { HeroContent } from '~/../../shared/types/blocks'
defineProps<{ content: HeroContent }>()
</script>

<template>
  <section
    class="block-hero"
    :style="{
      minHeight: content.minHeight,
      backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
    }"
  >
    <div v-if="content.overlay" class="hero-overlay" :style="{ opacity: content.overlayOpacity }" />
    <div class="hero-inner" :style="{ textAlign: content.textAlign }">
      <h1 class="hero-title">{{ content.title }}</h1>
      <p v-if="content.subtitle" class="hero-subtitle">{{ content.subtitle }}</p>
      <NuxtLink v-if="content.ctaText" :to="content.ctaUrl" class="hero-cta">
        {{ content.ctaText }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.block-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--anthracite);
  background-size: cover;
  background-position: center;
  padding: 80px 5%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: #000;
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
  width: 100%;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 20px;
  line-height: 1.15;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255,255,255,0.8);
  margin: 0 0 36px;
  line-height: 1.6;
}

.hero-cta {
  display: inline-block;
  padding: 14px 36px;
  background: var(--vert);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.5px;
  transition: background 0.2s;
}

.hero-cta:hover { background: #2a5450; }
</style>
