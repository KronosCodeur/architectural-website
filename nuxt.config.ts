// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = 'https://taurusconcept.com'
const siteName = 'Taurus Concept'
const siteDescription = "Cabinet d'architecture premium basé à Lomé, Togo. Conception architecturale, gestion de projet et développement international. 25 ans d'excellence, 120+ projets dans 15 pays."

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ['@nuxt/ui', 'nuxt-svgo', '@nuxt/image', '@nuxtjs/sitemap'],

  css: ['~/assets/css/main.css'],

  // ── Sitemap ──────────────────────────────────────────────
  site: {
    url: siteUrl,
    name: siteName,
  },
  sitemap: {
    xslColumns: [
      { label: 'URL', width: '65%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
    ],
  },

  // ── @nuxt/image ──────────────────────────────────────────
  image: {
    quality: 80,
    format: ['webp', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // ── App Head (global) ────────────────────────────────────
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: `${siteName} — Architecture & Design Premium`,
      meta: [
        // ── Primary Meta
        { name: 'description', content: siteDescription },
        { name: 'author', content: siteName },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
        { name: 'theme-color', content: '#2C2C2C' },

        // ── Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: siteName },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:locale:alternate', content: 'en_US' },
        { property: 'og:title', content: `${siteName} — Architecture & Design Premium` },
        { property: 'og:description', content: siteDescription },
        { property: 'og:url', content: siteUrl },
        { property: 'og:image', content: `${siteUrl}/images/og-default.jpg` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: "Taurus Concept — Architecture d'exception depuis Lomé" },

        // ── Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${siteName} — Architecture & Design Premium` },
        { name: 'twitter:description', content: siteDescription },
        { name: 'twitter:image', content: `${siteUrl}/images/og-default.jpg` },

        // ── Geo & Business
        { name: 'geo.region', content: 'TG-M' },
        { name: 'geo.placename', content: 'Lomé' },
        { name: 'geo.position', content: '6.1375;1.2123' },
        { name: 'ICBM', content: '6.1375, 1.2123' },
      ],
      link: [
        { rel: 'canonical', href: siteUrl },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },
})