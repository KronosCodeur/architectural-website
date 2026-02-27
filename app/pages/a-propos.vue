<template>
  <div>
    <!-- Page header -->
    <section style="background-color: var(--anthracite); padding-top: 160px; padding-bottom: 80px;">
      <div class="container-brand" style="text-align: center;">
        <div class="reveal" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--sable); margin-bottom: 20px;">
          Qui Sommes-Nous
        </div>
        <h1 class="font-heading reveal" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: white; margin-bottom: 24px;">
          À Propos
        </h1>
        <div class="reveal" style="width: 56px; height: 2px; background-color: var(--vert); margin: 0 auto 24px;" />
        <p class="reveal" style="font-size: 18px; color: #BDBDBD; max-width: 640px; margin: 0 auto; line-height: 1.7;">
          Depuis le Togo, Taurus Concept repousse les frontières de l'architecture
          contemporaine avec une vision internationale.
        </p>
      </div>
    </section>

    <!-- Story -->
    <section class="section-padding" style="background-color: var(--ivory);">
      <div class="container-brand">
        <div class="about-grid">
          <div class="reveal-left">
            <div style="overflow: hidden; border-radius: 2px;">
              <NuxtImg
                src="/images/hero-architecture.jpg"
                alt="Taurus Concept — 25 ans d'excellence architecturale depuis Lomé"
                format="webp"
                quality="80"
                width="640"
                height="480"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                style="width: 100%; height: auto; object-fit: cover; aspect-ratio: 4/3;"
              />
            </div>
          </div>
          <div class="reveal-right">
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
              <span class="line-accent" />
              <span class="eyebrow">Notre Histoire</span>
            </div>
            <h2 class="font-heading" style="font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 600; color: var(--anthracite); margin-bottom: 24px;">
              25 Ans d'Excellence Architecturale
            </h2>
            <div style="width: 56px; height: 2px; background-color: var(--vert); margin-bottom: 24px;" />
            <p style="font-size: 16px; color: var(--gray-text); line-height: 1.75; margin-bottom: 16px;">
              Fondé à Lomé, Taurus Concept est né de la conviction qu'une architecture
              d'exception peut émerger de n'importe quel coin du monde. Depuis plus de 25 ans,
              nous concevons des espaces qui allient élégance contemporaine et respect
              des identités locales.
            </p>
            <p style="font-size: 16px; color: var(--gray-text); line-height: 1.75; margin-bottom: 16px;">
              Notre équipe pluridisciplinaire, forte de sa diversité culturelle et de son
              expertise technique, a livré plus de 120 projets dans 15 pays. De Lomé à
              Paris, d'Accra à Dubaï, chaque réalisation porte notre signature :
              l'alliance de l'innovation et de l'intemporalité.
            </p>
            <p style="font-size: 16px; color: var(--gray-text); line-height: 1.75;">
              Nous croyons que l'architecture a le pouvoir de transformer les vies
              et de façonner les communautés. C'est cette philosophie qui guide
              chacune de nos créations.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-padding" style="background-color: white;">
      <div class="container-brand">
        <div class="reveal" style="text-align: center; margin-bottom: 64px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 16px;">
            <span class="line-accent" />
            <span class="eyebrow">Nos Valeurs</span>
            <span class="line-accent" />
          </div>
          <h2 class="font-heading" style="font-size: clamp(1.8rem, 3.5vw, 2.625rem); font-weight: 600; color: var(--anthracite);">
            Ce Qui Nous Guide
          </h2>
        </div>
        <div class="values-grid reveal-stagger">
          <div v-for="value in values" :key="value.title" class="card-expertise">
            <div style="font-size: 32px; margin-bottom: 24px;">{{ value.icon }}</div>
            <h3 class="font-heading" style="font-size: 20px; font-weight: 600; color: var(--anthracite); margin-bottom: 16px;">
              {{ value.title }}
            </h3>
            <p style="font-size: 16px; color: var(--gray-text); line-height: 1.7;">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <VisionSection />
  </div>
</template>

<script setup lang="ts">
import { useStructuredData, breadcrumbSchema } from '~/composables/useStructuredData'

const pageTitle = 'À Propos — Taurus Concept | Notre Histoire & Nos Valeurs'
const pageDesc = 'Depuis 25 ans, Taurus Concept repousse les frontières de l\'architecture contemporaine depuis Lomé, Togo. 120+ projets dans 15 pays. Excellence, innovation, intégrité.'

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: 'https://taurusconcept.com/a-propos' }],
})

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: 'https://taurusconcept.com/a-propos',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
})

useStructuredData(
  breadcrumbSchema([
    { name: 'Accueil', url: 'https://taurusconcept.com/' },
    { name: 'À Propos', url: 'https://taurusconcept.com/a-propos' },
  ]),
)

const values = [
  { icon: '◆', title: 'Excellence', description: "Chaque détail compte. Nous visons la perfection dans la conception, l'exécution et la livraison de nos projets." },
  { icon: '◈', title: 'Innovation', description: "Nous repoussons les limites du design en intégrant les technologies et matériaux les plus avancés." },
  { icon: '◇', title: 'Intégrité', description: "Transparence, respect des engagements et éthique irréprochable sont au cœur de chaque collaboration." },
  { icon: '▣', title: 'Durabilité', description: "Nos conceptions privilégient des solutions écoresponsables pour un impact positif sur l'environnement." },
]

const { init } = useReveal()

onMounted(() => {
  init()
})
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}
.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}
@media (min-width: 768px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
  .values-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
