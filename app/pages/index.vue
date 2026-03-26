<script setup lang="ts">
import type { AnyBlockContent } from '~/../../shared/types/blocks'
import { resolveTemplate } from '~/composables/useTemplateRegistry'
import _BlockRenderer from '~/components/blocks/BlockRenderer.vue'

const blockRendererComp = _BlockRenderer

const { data: page } = await useFetch('/api/pages/home')

const seoTitle = computed(() => page.value?.metaTitle ?? page.value?.title ?? "Archi Design — Architecture d'Exception à Lomé")
const seoDesc = computed(() => page.value?.metaDescription ?? "Cabinet d'architecture premium basé à Lomé, Togo. Conception architecturale sur-mesure, gestion de projet et développement immobilier international. 25 ans d'excellence.")

useSeoMeta({
  title: seoTitle,
  description: seoDesc,
  ogTitle: seoTitle,
  ogDescription: seoDesc,
  ogUrl: 'https://archidesign.com/',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://archidesign.com/' }],
})

const templateComponent = computed(() => resolveTemplate(page.value?.template))

const blocks = computed(() =>
  (page.value?.blocks ?? []).map((b) => ({
    id: b.id,
    type: b.type,
    content: b.content as AnyBlockContent,
    isActive: b.isActive,
  }))
)
</script>

<template>
  <component :is="templateComponent" v-if="templateComponent" />
  <component :is="blockRendererComp" v-else-if="blocks.length" :blocks="blocks" />
  <div v-else>
    <HeroSection />
    <ExpertiseSection />
    <ProjectsSection />
    <VisionSection />
  </div>
</template>
