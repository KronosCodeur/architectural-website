<template>
  <section style="position: relative; display: flex; align-items: center; overflow: hidden; height: 100vh; min-height: 700px;">
    <!-- Background image with zoom animation -->
    <div style="position: absolute; inset: 0;">
      <NuxtImg
        src="/images/hero-architecture.jpg"
        alt="Architecture moderne de prestige — Taurus Concept, cabinet d'architecture à Lomé"
        format="webp"
        :quality="80"
        width="1920"
        height="1080"
        densities="x1 x2"
        loading="eager"
        fetchpriority="high"
        style="width: 100%; height: 100%; object-fit: cover;"
        :class="loaded ? 'anim-scale-in' : ''"
        :style="{ transform: loaded ? undefined : 'scale(1.08)' }"
      />
      <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.08) 100%);" />
    </div>

    <!-- Decorative vertical line -->
    <div class="deco-line" style="position: absolute; top: 0; bottom: 0; left: 8%; width: 1px; background-color: rgba(255,255,255,0.08);" />

    <!-- Content -->
    <div class="container-brand" style="position: relative; z-index: 10; width: 100%;">
      <div style="max-width: 680px;">

        <!-- Eyebrow -->
        <div
          style="display: flex; align-items: center; gap: 16px; margin-bottom: 32px; opacity: 0;"
          :class="loaded ? 'anim-fade-in' : ''"
          :style="{ animationDelay: '0.3s' }"
        >
          <div class="anim-line-grow" style="height: 1px; background-color: var(--sable);" />
          <span class="eyebrow" style="color: rgba(255,255,255,0.7);">Architecture & Design International</span>
        </div>

        <!-- Title -->
        <h1
          class="font-heading"
          :class="loaded ? 'anim-fade-in' : ''"
          style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; color: white; line-height: 1.08; letter-spacing: -0.02em; margin-bottom: 32px; opacity: 0;"
          :style="{ animationDelay: '0.5s' }"
        >
          L'Excellence<br />
          Architecturale au<br />
          Service de Votre Vision
        </h1>

        <!-- Subtitle -->
        <p
          :class="loaded ? 'anim-fade-in' : ''"
          style="font-size: 18px; color: rgba(255,255,255,0.85); line-height: 1.7; margin-bottom: 48px; max-width: 540px; opacity: 0;"
          :style="{ animationDelay: '0.7s' }"
        >
          Depuis Lomé, nous concevons des espaces d'exception pour vos projets
          immobiliers à travers le monde. Un design intemporel, une gestion
          rigoureuse et une expertise sans faille.
        </p>

        <!-- CTAs -->
        <div
          style="display: flex; flex-wrap: wrap; gap: 20px; opacity: 0;"
          :class="loaded ? 'anim-fade-in' : ''"
          :style="{ animationDelay: '0.9s' }"
        >
          <NuxtLink to="/#projets" class="btn-primary">
            Découvrir nos projets
            <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </NuxtLink>
          <NuxtLink to="/services" class="btn-outline-white">
            Notre expertise
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      style="position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0;"
      :class="loaded ? 'anim-fade-in' : ''"
      :style="{ animationDelay: '1.6s' }"
    >
      <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.4);">Scroll</span>
      <div class="anim-scroll-pulse" style="width: 1px; background-color: rgba(255,255,255,0.3);" />
    </div>
  </section>
</template>

<script setup lang="ts">
const loaded = ref(false)

onMounted(() => {
  setTimeout(() => { loaded.value = true }, 150)
})
</script>

<style scoped>
.deco-line {
  display: none;
}
@media (min-width: 1024px) {
  .deco-line {
    display: block;
  }
}
</style>
