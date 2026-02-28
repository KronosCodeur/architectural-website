<template>
  <header style="position: fixed; top: 0; left: 0; right: 0; z-index: 50; width: 100%;">
    <!-- Top accent bar -->
    <div class="top-bar" style="background-color: var(--anthracite); color: rgba(255,255,255,0.5); font-size: 12px; padding: 8px 0;">
      <div class="container-brand" style="display: flex; justify-content: space-between; align-items: center;">
        <span>Lomé &bull; Accra &bull; Paris &bull; Dubaï</span>
        <span>contact@archidesign.com</span>
      </div>
    </div>

    <!-- Main navigation -->
    <nav
      aria-label="Navigation principale"
      :style="{
        backgroundColor: scrolled ? 'rgba(248,248,246,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.5s ease'
      }"
    >
      <div class="container-brand" style="display: flex; align-items: center; justify-content: space-between; height: 80px;">
        <!-- Logo -->
        <NuxtLink to="/" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
          <div
            :style="{
              width: '36px', height: '36px',
              border: `2px solid ${darkBg ? '#fff' : 'var(--vert)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.5s ease'
            }"
          >
            <span :style="{ fontSize: '12px', fontWeight: 700, color: darkBg ? '#fff' : 'var(--vert)', transition: 'color 0.5s ease' }">AD</span>
          </div>
          <span
            class="font-heading"
            :style="{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em', color: darkBg ? '#fff' : 'var(--vert)', transition: 'color 0.5s ease' }"
          >
            Archi Design
          </span>
        </NuxtLink>

        <!-- Desktop nav links -->
        <div class="desktop-nav" style="align-items: center; gap: 40px;">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            class="nav-link"
            :class="{ 'nav-link--cta': link.label === 'Contact', 'nav-link--light': darkBg }"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <!-- Mobile burger -->
        <button
          class="mobile-burger"
          :style="{ color: darkBg ? '#fff' : 'var(--anthracite)', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.5s ease' }"
          aria-label="Menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <Transition name="slide-down">
        <div v-if="mobileOpen" class="mobile-menu" style="background-color: var(--ivory); border-top: 1px solid rgba(214,198,184,0.3); padding: 32px 24px;">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            style="display: block; padding: 14px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gray-text); border-bottom: 1px solid rgba(214,198,184,0.2); text-decoration: none;"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="btn-primary"
            style="margin-top: 24px; width: 100%; justify-content: center;"
            @click="mobileOpen = false"
          >
            Contact
          </NuxtLink>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

const isHome = computed(() => route.path === '/')
const darkBg = computed(() => !isHome.value && !scrolled.value)

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Projets', to: '/projets' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
]

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 20 }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
</script>

<style scoped>
/* Desktop: show nav links, hide burger */
.top-bar { display: none; }
.desktop-nav { display: none; }
.mobile-burger { display: block; }
.mobile-menu { display: block; }

@media (min-width: 1024px) {
  .top-bar { display: block; }
  .desktop-nav { display: flex; }
  .mobile-burger { display: none !important; }
  .mobile-menu { display: none !important; }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
