<script setup lang="ts">
import { useStructuredData, localBusinessSchema } from '~/composables/useStructuredData'

useStructuredData(localBusinessSchema)

const { init } = useReveal()
onMounted(() => init())
</script>

<template>
  <div>
    <HeroSection />
    <ExpertiseSection />
    <ProjectsSection />
    <VisionSection />
  </div>
</template>
