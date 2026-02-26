<template>
  <div>
    <HeroSection />
    <ExpertiseSection />
    <ProjectsSection />
    <VisionSection />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Taurus Concept — Architecture d\'Exception' })

const { init } = useReveal()

onMounted(() => {
  init()
})
</script>
