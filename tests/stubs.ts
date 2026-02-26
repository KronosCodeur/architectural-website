// Stubs for Nuxt auto-imported components & composables used in tests
import { vi } from 'vitest'
import { defineComponent, h } from 'vue'

// Stub NuxtLink as a simple <a> tag
export const NuxtLink = defineComponent({
  name: 'NuxtLink',
  props: { to: { type: [String, Object], default: '' } },
  setup(props, { slots }) {
    return () => h('a', { href: typeof props.to === 'string' ? props.to : '#' }, slots.default?.())
  },
})

// Stub NuxtPage
export const NuxtPage = defineComponent({
  name: 'NuxtPage',
  setup() {
    return () => h('div', { class: 'nuxt-page-stub' })
  },
})

// Stub NuxtLayout
export const NuxtLayout = defineComponent({
  name: 'NuxtLayout',
  setup(_, { slots }) {
    return () => h('div', { class: 'nuxt-layout-stub' }, slots.default?.())
  },
})

// Stub NuxtRouteAnnouncer
export const NuxtRouteAnnouncer = defineComponent({
  name: 'NuxtRouteAnnouncer',
  setup() {
    return () => h('div', { class: 'nuxt-route-announcer-stub' })
  },
})

// Stub useHead
export const useHead = vi.fn()

// Stub useReveal
export const useReveal = vi.fn(() => ({ init: vi.fn() }))

// SVG component stub
export const SvgStub = defineComponent({
  name: 'SvgStub',
  setup() {
    return () => h('svg', { class: 'svg-stub' })
  },
})
