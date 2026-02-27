<script setup lang="ts">
const expertises = [
  {
    icon: 'lucide:drafting-compass',
    title: 'Conception',
    description:
      'Création de plans architecturaux sur-mesure alliant esthétique intemporelle et fonctionnalité rigoureuse.',
  },
  {
    icon: 'lucide:gantt-chart',
    title: 'Gestion de Projet',
    description:
      'Supervision complète du chantier, garantissant le respect des délais, du budget et de la vision initiale.',
  },
  {
    icon: 'lucide:globe',
    title: 'Développement International',
    description:
      'Accompagnement stratégique pour vos investissements immobiliers à travers le monde.',
  },
]
</script>

<template>
  <section class="section-padding" style="background-color: var(--ivory);">
    <div class="container-brand">

      <!-- Section header -->
      <div class="reveal" style="margin-bottom: 64px;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
          <span class="line-accent" />
          <span class="eyebrow">Ce que nous faisons</span>
        </div>
        <h2 class="font-heading" style="font-size: clamp(1.8rem, 3.5vw, 2.625rem); font-weight: 600; color: var(--anthracite);">
          Notre Expertise
        </h2>
      </div>

      <!-- Cards grid -->
      <div class="expertise-grid reveal-stagger">
        <div
          v-for="(item, i) in expertises"
          :key="i"
          class="card-expertise"
        >
          <!-- Icon -->
          <div style="width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; margin-bottom: 32px;">
            <UIcon :name="item.icon" size="32" style="color: var(--vert);" />
          </div>

          <!-- Title -->
          <h3 class="font-heading" style="font-size: 20px; font-weight: 600; color: var(--anthracite); margin-bottom: 16px;">
            {{ item.title }}
          </h3>

          <!-- Description -->
          <p style="font-size: 16px; color: var(--gray-text); line-height: 1.7; margin-bottom: 24px;">
            {{ item.description }}
          </p>

          <!-- Link -->
          <span style="font-size: 14px; font-weight: 500; color: var(--vert);">
            En savoir plus →
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expertise-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}
@media (min-width: 768px) {
  .expertise-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
