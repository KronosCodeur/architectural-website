<script setup lang="ts">
import type { CtaContent } from '~/../../shared/types/blocks'
defineProps<{ content: CtaContent }>()
</script>

<template>
  <section class="block-cta section-padding" :class="`bg--${content.background}`">
    <div class="container-brand cta-inner">
      <div class="cta-text">
        <h2 class="cta-title">{{ content.title }}</h2>
        <p v-if="content.subtitle" class="cta-subtitle">{{ content.subtitle }}</p>
      </div>
      <NuxtLink v-if="content.buttonText" :to="content.buttonUrl" class="cta-btn">
        {{ content.buttonText }}
        <UIcon name="lucide:arrow-right" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.block-cta { padding: 80px 5%; }

.bg--dark { background: var(--anthracite); }
.bg--light { background: var(--ivory); }
.bg--brand { background: var(--vert); }

.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.cta-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  margin: 0 0 8px;
}

.bg--dark .cta-title, .bg--brand .cta-title { color: #fff; }
.bg--light .cta-title { color: var(--anthracite); }

.cta-subtitle { font-size: 15px; margin: 0; }
.bg--dark .cta-subtitle, .bg--brand .cta-subtitle { color: rgba(255,255,255,0.7); }
.bg--light .cta-subtitle { color: var(--gray-text); }

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.cta-btn:hover { opacity: 0.85; }
.bg--dark .cta-btn, .bg--brand .cta-btn { background: #fff; color: var(--anthracite); }
.bg--light .cta-btn { background: var(--vert); color: #fff; }
</style>
