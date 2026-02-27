// Global setup — provide Vue auto-imports that Nuxt normally handles
import { vi } from 'vitest'
import { ref, reactive, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

// Make Vue composition API available globally (as Nuxt auto-imports do)
;(globalThis as any).ref = ref
;(globalThis as any).reactive = reactive
;(globalThis as any).computed = computed
;(globalThis as any).watch = watch
;(globalThis as any).onMounted = onMounted
;(globalThis as any).onUnmounted = onUnmounted
;(globalThis as any).nextTick = nextTick

// Stub useHead (Nuxt composable)
;(globalThis as any).useHead = vi.fn()

// Stub useRoute (Nuxt composable)
;(globalThis as any).useRoute = vi.fn(() => reactive({ path: '/', params: {}, query: {} }))

// Stub useReveal
;(globalThis as any).useReveal = vi.fn(() => ({ init: vi.fn() }))
