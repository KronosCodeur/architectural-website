<template>
  <div>
    <!-- Page header -->
    <section style="background-color: var(--anthracite); padding-top: 160px; padding-bottom: 80px;">
      <div class="container-brand" style="text-align: center;">
        <h1 class="font-heading reveal" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: white; margin-bottom: 24px;">
          Projets
        </h1>
        <div class="reveal" style="width: 56px; height: 2px; background-color: var(--vert); margin: 0 auto 24px;" />
        <p class="reveal" style="font-size: 18px; color: #BDBDBD; max-width: 640px; margin: 0 auto; line-height: 1.7;">
          Découvrez une sélection de nos réalisations les plus emblématiques,
          du Togo à l'international.
        </p>
      </div>
    </section>

    <!-- Projects grid -->
    <section class="section-padding" style="background-color: var(--ivory);">
      <div class="container-brand">
        <div class="projects-grid reveal-stagger">
          <NuxtLink
            v-for="(project, i) in projects"
            :key="i"
            to="#"
            class="project-card"
            style="height: 480px; text-decoration: none; display: block;"
          >
            <img
              :src="project.image"
              :alt="project.title"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
            <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);" />
            <div class="overlay-hover" />
            <div style="position: absolute; top: 24px; left: 24px;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); padding: 6px 14px; font-weight: 500;">
                {{ project.category }}
              </span>
            </div>
            <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 32px;">
              <h3 class="font-heading project-title" style="font-size: 24px; font-weight: 600; color: white; margin-bottom: 4px;">
                {{ project.title }}
              </h3>
              <p style="font-size: 14px; color: rgba(255,255,255,0.7);">
                {{ project.location }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section style="background-color: var(--vert); padding-top: 100px; padding-bottom: 100px;">
      <div class="container-brand" style="text-align: center;">
        <h2 class="font-heading reveal" style="font-size: clamp(1.6rem, 3vw, 2.25rem); font-weight: 600; color: white; margin-bottom: 24px;">
          Vous avez un projet en tête ?
        </h2>
        <p class="reveal" style="font-size: 17px; color: rgba(255,255,255,0.8); margin-bottom: 40px; max-width: 540px; margin-left: auto; margin-right: auto; line-height: 1.7;">
          Parlons-en ensemble. Notre équipe transforme vos ambitions architecturales en réalité.
        </p>
        <div class="reveal">
          <NuxtLink to="/contact" class="btn-outline-white" style="display: inline-flex;">
            Nous Contacter
            <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Projets — Taurus Concept' })

const projects = [
  { image: '/images/projet-villa-horizon.jpg', title: "Villa L'Horizon", location: "Côte d'Azur, France", category: 'Résidentiel' },
  { image: '/images/projet-tour-initiale.jpg', title: 'Tour Initiale', location: 'Genève, Suisse', category: 'Commercial' },
  { image: '/images/projet-penthouse-ciel.jpg', title: 'Penthouse Ciel', location: 'Dubaï, EAU', category: 'Résidentiel' },
  { image: '/images/hero-architecture.jpg', title: 'Résidence Palmier', location: 'Lomé, Togo', category: 'Résidentiel' },
  { image: '/images/projet-tour-initiale.jpg', title: 'Centre Affaires Étoile', location: 'Accra, Ghana', category: 'Commercial' },
  { image: '/images/projet-villa-horizon.jpg', title: 'Villa Sérénité', location: 'Paris, France', category: 'Résidentiel' },
]

const { init } = useReveal()

onMounted(() => {
  init()
})
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
