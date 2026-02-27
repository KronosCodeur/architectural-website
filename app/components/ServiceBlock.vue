<template>
  <section
    :style="{
      position: 'relative',
      backgroundColor: index % 2 === 0 ? '#FFFFFF' : 'var(--offwhite)',
      paddingTop: '120px',
      paddingBottom: '120px',
    }"
  >
    <div class="container-brand">
      <div class="service-layout" :class="{ 'service-layout--reversed': reversed }">

        <!-- Image side -->
        <div :class="reversed ? 'reveal-right' : 'reveal-left'" class="service-image-col" style="position: relative;">
          <div style="overflow: hidden; border-radius: 2px;">
            <NuxtImg
              :src="image"
              :alt="`${title} — Service architecture Taurus Concept`"
              format="webp"
              :quality="80"
              width="640"
              height="480"
              densities="x1 x2"
              loading="lazy"
              style="width: 100%; height: auto; object-fit: cover; aspect-ratio: 4 / 3; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);"
              @mouseenter="($event.target as HTMLElement).style.transform = 'scale(1.04)'"
              @mouseleave="($event.target as HTMLElement).style.transform = 'scale(1)'"
            />
          </div>
          <!-- Decorative accent corner -->
          <div
            class="deco-corner"
            :style="{
              width: '60px',
              height: '60px',
              position: 'absolute',
              [reversed ? 'right' : 'left']: '-12px',
              bottom: '-12px',
              borderBottom: '2px solid var(--sable)',
              [reversed ? 'borderRight' : 'borderLeft']: '2px solid var(--sable)',
            }"
          />
        </div>

        <!-- Text side -->
        <div :class="reversed ? 'reveal-left' : 'reveal-right'" class="service-text-col">
          <!-- Icon -->
          <div v-if="$slots.icon" style="margin-bottom: 24px;">
            <slot name="icon" />
          </div>

          <!-- Service number -->
          <div
            class="font-heading"
            style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sable); margin-bottom: 16px;"
          >
            0{{ index + 1 }}
          </div>

          <!-- Title -->
          <h3
            class="font-heading"
            style="font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 600; color: var(--anthracite); margin-bottom: 20px;"
          >
            {{ title }}
          </h3>

          <!-- Decorative line -->
          <div style="width: 56px; height: 2px; background-color: var(--vert); margin-bottom: 24px;" />

          <!-- Paragraphs -->
          <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
            <p
              v-for="(paragraph, i) in paragraphs"
              :key="i"
              style="font-size: 16px; line-height: 1.75; color: var(--gray-text);"
            >
              {{ paragraph }}
            </p>
          </div>

          <!-- CTA -->
          <NuxtLink v-if="ctaText" to="/contact" class="btn-outline">
            {{ ctaText }}
            <svg style="width: 14px; height: 14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  paragraphs: string[]
  ctaText?: string
  image: string
  reversed?: boolean
  index: number
}>()
</script>

<style scoped>
.service-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}
.deco-corner {
  display: none;
}
@media (min-width: 1024px) {
  .service-layout {
    grid-template-columns: 1.1fr 1fr;
    gap: 64px;
  }
  .service-layout--reversed {
    grid-template-columns: 1fr 1.1fr;
  }
  .service-layout--reversed .service-image-col {
    order: 2;
  }
  .service-layout--reversed .service-text-col {
    order: 1;
  }
  .deco-corner {
    display: block;
  }
}
</style>
