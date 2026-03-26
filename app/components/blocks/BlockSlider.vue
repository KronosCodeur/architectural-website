<script setup lang="ts">
import type { SliderContent } from '~/../../shared/types/blocks'

const props = defineProps<{ content: SliderContent }>()

const current = ref(0)
const transitioning = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const slides = computed(() => props.content.slides ?? [])
const minHeight = computed(() => props.content.minHeight ?? '100vh')
const textAlign = computed(() => props.content.textAlign ?? 'center')

function goTo(index: number) {
  if (transitioning.value || index === current.value) return
  transitioning.value = true
  current.value = index
  setTimeout(() => (transitioning.value = false), 700)
}

function prev() {
  goTo((current.value - 1 + slides.value.length) % slides.value.length)
}

function next() {
  goTo((current.value + 1) % slides.value.length)
}

function startAutoplay() {
  if (!props.content.autoplay || slides.value.length <= 1) return
  const interval = (props.content.interval ?? 5) * 1000
  timer = setInterval(() => {
    current.value = (current.value + 1) % slides.value.length
  }, interval)
}

function stopAutoplay() {
  if (timer) { clearInterval(timer); timer = null }
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)

watch(() => props.content.autoplay, (val) => {
  stopAutoplay()
  if (val) startAutoplay()
})
</script>

<template>
  <section
    class="block-slider"
    :style="{ minHeight }"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <div v-if="!slides.length" class="slider-empty">
      Aucune diapositive. Ajoutez des slides dans le panneau de configuration.
    </div>

    <template v-else>
      <div class="slides-track">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="slide"
          :class="{ active: i === current }"
          :style="{ backgroundImage: slide.image ? `url(${slide.image})` : undefined }"
        >
          <div v-if="slide.overlay" class="slide-overlay" :style="{ opacity: slide.overlayOpacity ?? 0.5 }" />
          <div class="slide-inner" :style="{ textAlign }">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</p>
            <NuxtLink v-if="slide.ctaText" :to="slide.ctaUrl || '/'" class="slide-cta">
              {{ slide.ctaText }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <button v-if="slides.length > 1" class="slider-arrow prev" aria-label="Précédent" @click="prev">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button v-if="slides.length > 1" class="slider-arrow next" aria-label="Suivant" @click="next">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div v-if="slides.length > 1" class="slider-dots">
        <button
          v-for="(_, i) in slides"
          :key="i"
          class="dot"
          :class="{ active: i === current }"
          :aria-label="`Slide ${i + 1}`"
          @click="goTo(i)"
        />
      </div>
    </template>
  </section>
</template>

<style scoped>
.block-slider {
  position: relative;
  overflow: hidden;
  background: var(--anthracite);
  display: flex;
  align-items: stretch;
}

.slider-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  padding: 40px;
}

.slides-track {
  position: relative;
  width: 100%;
  min-height: inherit;
}

.slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.7s ease;
  padding: 80px 5%;
  pointer-events: none;
}

.slide.active {
  opacity: 1;
  position: relative;
  pointer-events: auto;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: #000;
}

.slide-inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
  width: 100%;
}

.slide-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 20px;
  line-height: 1.15;
}

.slide-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255,255,255,0.8);
  margin: 0 0 36px;
  line-height: 1.6;
}

.slide-cta {
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
.slide-cta:hover { background: #2a5450; }

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.25);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.slider-arrow:hover { background: rgba(255,255,255,0.3); }
.slider-arrow.prev { left: 24px; }
.slider-arrow.next { right: 24px; }

.slider-dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.dot.active {
  background: #fff;
  transform: scale(1.3);
}

@media (max-width: 767px) {
  .slider-arrow { width: 36px; height: 36px; }
  .slider-arrow.prev { left: 12px; }
  .slider-arrow.next { right: 12px; }
}
</style>
