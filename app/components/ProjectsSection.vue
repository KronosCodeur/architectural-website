<script setup lang="ts">
const projects = [
  {
    image: '/images/projet-villa-horizon.jpg',
    title: "Villa L'Horizon",
    location: "Côte d'Azur, France",
    category: 'Résidentiel',
  },
  {
    image: '/images/projet-tour-initiale.jpg',
    title: 'Tour Initiale',
    location: 'Genève, Suisse',
    category: 'Commercial',
  },
  {
    image: '/images/projet-penthouse-ciel.jpg',
    title: 'Penthouse Ciel',
    location: 'Dubaï, EAU',
    category: 'Résidentiel',
  },
]
</script>

<template>
  <section id="projets" class="section-padding" style="background-color: white;">
    <div class="container-brand">

      <!-- Section header -->
      <div class="reveal" style="display: flex; flex-direction: column; margin-bottom: 64px;">
        <div>
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
            <span class="line-accent" />
            <span class="eyebrow">Portfolio</span>
          </div>
          <h2 class="font-heading" style="font-size: clamp(1.8rem, 3.5vw, 2.625rem); font-weight: 600; color: var(--anthracite);">
            Projets Récents
          </h2>
        </div>
      </div>

      <!-- Projects grid -->
      <div class="projects-grid reveal-stagger">
        <NuxtLink
          v-for="(project, i) in projects"
          :key="i"
          to="#"
          class="project-card"
          style="height: 480px; text-decoration: none; display: block;"
        >
          <NuxtImg
            :src="project.image"
            :alt="`${project.title} — ${project.location} | Taurus Concept`"
            format="webp"
            quality="80"
            width="600"
            height="480"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            style="width: 100%; height: 100%; object-fit: cover;"
          />

          <!-- Default gradient overlay -->
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);" />

          <!-- Green hover overlay -->
          <div class="overlay-hover" />

          <!-- Category badge -->
          <div style="position: absolute; top: 24px; left: 24px;">
            <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); padding: 6px 14px; font-weight: 500;">
              {{ project.category }}
            </span>
          </div>

          <!-- Project info -->
          <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 32px;">
            <h3 class="font-heading project-title" style="font-size: 24px; font-weight: 600; color: white; margin-bottom: 4px;">
              {{ project.title }}
            </h3>
            <p style="font-size: 14px; color: rgba(255,255,255,0.7); letter-spacing: 0.02em;">
              {{ project.location }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>