// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-svgo', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Taurus Concept — Architecture & Design',
      meta: [
        { name: 'description', content: "Taurus Concept — L'excellence architecturale au service de votre vision. Conception, gestion de projet et développement international." }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap' }
      ]
    }
  }
})