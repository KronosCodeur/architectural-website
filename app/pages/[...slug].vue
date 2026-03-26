<script setup lang="ts">
import type { AnyBlockContent } from '~/../../shared/types/blocks'
import { resolveTemplate } from '~/composables/useTemplateRegistry'
import _BlockRenderer from '~/components/blocks/BlockRenderer.vue'

const blockRendererComp = _BlockRenderer

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const { data: page, error } = await useFetch(`/api/pages/${slug}`)

if (error.value || !page.value) {
  throw createError({ statusCode: 404, fatal: true, message: 'Page introuvable' })
}

useSeoMeta({
  title: page.value.metaTitle ?? page.value.title,
  description: page.value.metaDescription ?? undefined,
  ogTitle: page.value.metaTitle ?? page.value.title,
  ogDescription: page.value.metaDescription ?? undefined,
})

useHead({
  link: [{ rel: 'canonical', href: `https://archidesign.com/${slug}` }],
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
  <component :is="blockRendererComp" v-else :blocks="blocks" />
</template>
