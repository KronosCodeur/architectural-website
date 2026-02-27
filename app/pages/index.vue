<template>
  <div>
    <HeroSection />
    <ExpertiseSection />
    <ProjectsSection />
    <VisionSection />
  </div>
</template>

<script setup lang="ts">
import { useStructuredData, localBusinessSchema } from '~/composables/useStructuredData'

const pageTitle = "Taurus Concept — Architecture d'Exception à Lomé"
const pageDesc = "Cabinet d'architecture premium basé à Lomé, Togo. Conception architecturale sur-mesure, gestion de projet et développement immobilier international. 25 ans d'excellence."

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: 'https://taurusconcept.com/' }],
})

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: 'https://taurusconcept.com/',
  ogType: 'website',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
})

// Home page gets the full LocalBusiness JSON-LD
useStructuredData(localBusinessSchema)

const { init } = useReveal()

onMounted(() => {
  init()
})
</script>
