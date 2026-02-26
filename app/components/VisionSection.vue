<template>
  <section id="vision" style="position: relative; overflow: hidden; background-color: var(--anthracite); padding-top: 140px; padding-bottom: 140px;">

    <!-- Decorative vertical lines -->
    <div class="deco-line-left" style="position: absolute; top: 0; bottom: 0; left: 20%; width: 1px; background-color: rgba(255,255,255,0.04);" />
    <div class="deco-line-right" style="position: absolute; top: 0; bottom: 0; right: 20%; width: 1px; background-color: rgba(255,255,255,0.04);" />

    <div style="position: relative; z-index: 10; text-align: center; max-width: 780px; margin: 0 auto; padding: 0 24px;">

      <!-- Top decorative line -->
      <div class="reveal" style="width: 48px; height: 1px; background-color: var(--sable); margin: 0 auto 40px;" />

      <!-- Title -->
      <h2 class="font-heading reveal" style="font-size: clamp(1.8rem, 3.5vw, 2.625rem); font-weight: 600; color: white; margin-bottom: 32px;">
        Une Vision Internationale
      </h2>

      <!-- Description -->
      <p class="reveal" style="font-size: 18px; color: #BDBDBD; line-height: 1.8; margin-bottom: 56px; max-width: 640px; margin-left: auto; margin-right: auto;">
        Depuis le Togo, nous concevons des espaces qui transcendent les
        frontières, alliant l'élégance architecturale aux standards
        internationaux les plus exigeants pour donner vie à vos ambitions.
      </p>

      <!-- Stats row -->
      <div class="stats-grid reveal-stagger" style="margin-bottom: 56px;">
        <div v-for="stat in stats" :key="stat.label" style="text-align: center;">
          <div class="font-heading" style="font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 600; color: white; margin-bottom: 8px;">
            {{ stat.value }}
          </div>
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--sable);">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- Bottom decorative line -->
      <div class="reveal" style="width: 48px; height: 1px; background-color: var(--sable); margin: 0 auto 40px;" />

      <!-- CTA -->
      <div class="reveal">
        <NuxtLink to="/contact" class="btn-primary" style="display: inline-flex;">
          Contactez-nous
          <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: '120+', label: 'Projets livrés' },
  { value: '15', label: 'Pays' },
  { value: '25 ans', label: "D'expérience" },
]
</script>

<style scoped>
.deco-line-left,
.deco-line-right {
  display: none;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
@media (min-width: 1024px) {
  .deco-line-left,
  .deco-line-right {
    display: block;
  }
}
</style>
