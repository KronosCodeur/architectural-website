import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(__dirname, '..')

function readFile(relativePath: string): string {
  return readFileSync(resolve(root, relativePath), 'utf-8')
}

describe('SEO — Meta Tags & Open Graph', () => {
  const nuxtConfig = readFile('nuxt.config.ts')

  describe('Global head configuration', () => {
    it('sets lang="fr" on HTML', () => {
      expect(nuxtConfig).toContain("lang: 'fr'")
    })

    it('sets charset utf-8', () => {
      expect(nuxtConfig).toContain("charset: 'utf-8'")
    })

    it('sets viewport', () => {
      expect(nuxtConfig).toContain("viewport: 'width=device-width, initial-scale=1'")
    })

    it('sets theme-color', () => {
      expect(nuxtConfig).toContain("theme-color")
      expect(nuxtConfig).toContain("#2C2C2C")
    })

    it('sets robots meta with index,follow', () => {
      expect(nuxtConfig).toContain("'index, follow")
    })

    it('configures Open Graph type', () => {
      expect(nuxtConfig).toContain("og:type")
      expect(nuxtConfig).toContain("'website'")
    })

    it('configures OG locale fr_FR', () => {
      expect(nuxtConfig).toContain("og:locale")
      expect(nuxtConfig).toContain("'fr_FR'")
    })

    it('configures OG locale:alternate en_US', () => {
      expect(nuxtConfig).toContain("og:locale:alternate")
      expect(nuxtConfig).toContain("'en_US'")
    })

    it('configures OG image with dimensions', () => {
      expect(nuxtConfig).toContain("og:image")
      expect(nuxtConfig).toContain("og:image:width")
      expect(nuxtConfig).toContain("'1200'")
      expect(nuxtConfig).toContain("og:image:height")
      expect(nuxtConfig).toContain("'630'")
    })

    it('configures Twitter Card as summary_large_image', () => {
      expect(nuxtConfig).toContain("twitter:card")
      expect(nuxtConfig).toContain("summary_large_image")
    })

    it('sets canonical URL', () => {
      expect(nuxtConfig).toContain("rel: 'canonical'")
    })

    it('configures geo tags for Lomé', () => {
      expect(nuxtConfig).toContain("geo.region")
      expect(nuxtConfig).toContain("TG-M")
      expect(nuxtConfig).toContain("geo.placename")
      expect(nuxtConfig).toContain("Lomé")
    })

    it('sets favicon.svg link', () => {
      expect(nuxtConfig).toContain("favicon.svg")
    })
  })

  describe('Per-page SEO meta', () => {
    const pages = [
      { path: 'app/pages/index.vue', contains: ['useSeoMeta', 'ogTitle', 'ogDescription', 'twitterTitle', 'canonical'] },
      { path: 'app/pages/services.vue', contains: ['useSeoMeta', 'ogTitle', 'ogDescription', 'twitterTitle', 'canonical'] },
      { path: 'app/pages/projets.vue', contains: ['useSeoMeta', 'ogTitle', 'ogDescription', 'twitterTitle', 'canonical'] },
      { path: 'app/pages/a-propos.vue', contains: ['useSeoMeta', 'ogTitle', 'ogDescription', 'twitterTitle', 'canonical'] },
      { path: 'app/pages/contact.vue', contains: ['useSeoMeta', 'ogTitle', 'ogDescription', 'twitterTitle', 'canonical'] },
    ]

    pages.forEach(({ path, contains }) => {
      const fileName = path.split('/').pop()!
      describe(fileName, () => {
        const content = readFile(path)
        contains.forEach(keyword => {
          it(`includes ${keyword}`, () => {
            expect(content).toContain(keyword)
          })
        })
      })
    })
  })
})

describe('SEO — Structured Data (schema.org)', () => {
  const structuredData = readFile('app/composables/useStructuredData.ts')

  it('defines Organization schema', () => {
    expect(structuredData).toContain("'@type': 'Organization'")
    expect(structuredData).toContain("'Archi Design'")
  })

  it('defines ArchitectureFirm (LocalBusiness) schema', () => {
    expect(structuredData).toContain("'@type': 'ArchitectureFirm'")
  })

  it('includes address with Lomé, Togo', () => {
    expect(structuredData).toContain("'Lomé'")
    expect(structuredData).toContain("'TG'")
    expect(structuredData).toContain("Boulevard du 13 Janvier")
  })

  it('includes geo coordinates', () => {
    expect(structuredData).toContain('6.1375')
    expect(structuredData).toContain('1.2123')
  })

  it('includes contact information', () => {
    expect(structuredData).toContain('+228-90-00-00-00')
    expect(structuredData).toContain('contact@archidesign.com')
  })

  it('defines WebSite schema', () => {
    expect(structuredData).toContain("'@type': 'WebSite'")
    expect(structuredData).toContain("'fr'")
  })

  it('defines breadcrumbSchema helper', () => {
    expect(structuredData).toContain('breadcrumbSchema')
    expect(structuredData).toContain("'BreadcrumbList'")
  })

  it('includes service offerings', () => {
    expect(structuredData).toContain('Conception Architecturale')
    expect(structuredData).toContain('Gestion de Projet')
    expect(structuredData).toContain('Développement International')
    expect(structuredData).toContain("Design d'Intérieur")
  })

  it('includes area served (countries)', () => {
    expect(structuredData).toContain("'Togo'")
    expect(structuredData).toContain("'Ghana'")
    expect(structuredData).toContain("'France'")
    expect(structuredData).toContain("'United Arab Emirates'")
  })

  it('includes opening hours', () => {
    expect(structuredData).toContain('OpeningHoursSpecification')
    expect(structuredData).toContain("'08:00'")
    expect(structuredData).toContain("'18:00'")
  })

  describe('Structured data injection in pages', () => {
    it('index.vue injects LocalBusiness schema', () => {
      const index = readFile('app/pages/index.vue')
      expect(index).toContain('useStructuredData')
      expect(index).toContain('localBusinessSchema')
    })

    it('contact.vue injects LocalBusiness + breadcrumbs', () => {
      const contact = readFile('app/pages/contact.vue')
      expect(contact).toContain('useStructuredData')
      expect(contact).toContain('localBusinessSchema')
      expect(contact).toContain('breadcrumbSchema')
    })

    it('services.vue injects Service + breadcrumbs', () => {
      const services = readFile('app/pages/services.vue')
      expect(services).toContain('useStructuredData')
      expect(services).toContain('breadcrumbSchema')
      expect(services).toContain("'@type': 'Service'")
    })

    it('a-propos.vue injects breadcrumbs', () => {
      const about = readFile('app/pages/a-propos.vue')
      expect(about).toContain('useStructuredData')
      expect(about).toContain('breadcrumbSchema')
    })

    it('projets.vue injects breadcrumbs', () => {
      const projets = readFile('app/pages/projets.vue')
      expect(projets).toContain('useStructuredData')
      expect(projets).toContain('breadcrumbSchema')
    })

    it('default layout injects Organization + WebSite schemas', () => {
      const layout = readFile('app/layouts/default.vue')
      expect(layout).toContain('organizationSchema')
      expect(layout).toContain('webSiteSchema')
    })
  })
})

describe('SEO — Sitemap & Robots', () => {
  const robotsTxt = readFile('public/robots.txt')

  it('robots.txt allows all crawlers', () => {
    expect(robotsTxt).toContain('User-Agent: *')
    expect(robotsTxt).toContain('Allow: /')
  })

  it('robots.txt blocks _nuxt and api directories', () => {
    expect(robotsTxt).toContain('Disallow: /_nuxt/')
    expect(robotsTxt).toContain('Disallow: /api/')
  })

  it('robots.txt includes sitemap URL', () => {
    expect(robotsTxt).toContain('Sitemap: https://archidesign.com/sitemap.xml')
  })

  it('nuxt.config registers @nuxtjs/sitemap module', () => {
    const config = readFile('nuxt.config.ts')
    expect(config).toContain("'@nuxtjs/sitemap'")
  })

  it('nuxt.config sets site URL for sitemap', () => {
    const config = readFile('nuxt.config.ts')
    expect(config).toContain('archidesign.com')
  })
})

describe('SEO — Semantic HTML5', () => {
  it('layout uses role="main" on main element', () => {
    const layout = readFile('app/layouts/default.vue')
    expect(layout).toContain('role="main"')
  })

  it('footer has role="contentinfo"', () => {
    const footer = readFile('app/components/FooterSection.vue')
    expect(footer).toContain('role="contentinfo"')
  })

  it('navbar has aria-label on nav', () => {
    const navbar = readFile('app/components/Navbar.vue')
    expect(navbar).toContain('aria-label')
  })

  it('footer has secondary navigation with aria-label', () => {
    const footer = readFile('app/components/FooterSection.vue')
    expect(footer).toContain('aria-label="Navigation secondaire"')
  })

  it('footer uses address element for contact info', () => {
    const footer = readFile('app/components/FooterSection.vue')
    expect(footer).toContain('<address')
    expect(footer).toContain('</address>')
  })
})

describe('SEO — Image Optimization', () => {
  it('nuxt.config configures @nuxt/image with quality 80', () => {
    const config = readFile('nuxt.config.ts')
    expect(config).toContain('quality: 80')
  })

  it('nuxt.config sets webp format', () => {
    const config = readFile('nuxt.config.ts')
    expect(config).toContain("'webp'")
  })

  it('nuxt.config defines responsive screen breakpoints', () => {
    const config = readFile('nuxt.config.ts')
    expect(config).toContain('screens:')
    expect(config).toContain('xs: 320')
    expect(config).toContain('xxl: 1536')
  })

  const componentsUsingImages = [
    { path: 'app/components/HeroSection.vue', hasEager: true },
    { path: 'app/components/ProjectsSection.vue', hasEager: false },
    { path: 'app/components/ServiceBlock.vue', hasEager: false },
  ]

  componentsUsingImages.forEach(({ path, hasEager }) => {
    const name = path.split('/').pop()!
    const content = readFile(path)

    it(`${name} uses <NuxtImg> instead of raw <img>`, () => {
      expect(content).toContain('<NuxtImg')
    })

    it(`${name} sets format="webp"`, () => {
      expect(content).toContain('format="webp"')
    })

    it(`${name} sets quality="80"`, () => {
      const hasStaticQuality = content.includes('quality="80"')
      const hasBoundQuality = content.includes(':quality="80"')
      expect(hasStaticQuality || hasBoundQuality).toBe(true)
    })

    it(`${name} includes descriptive alt text`, () => {
      expect(content).toMatch(/alt="[^"]{10,}"/)
    })

    if (hasEager) {
      it(`${name} uses loading="eager" for above-the-fold`, () => {
        expect(content).toContain('loading="eager"')
      })

      it(`${name} sets fetchpriority="high"`, () => {
        expect(content).toContain('fetchpriority="high"')
      })
    } else {
      it(`${name} uses loading="lazy" for below-the-fold`, () => {
        expect(content).toContain('loading="lazy"')
      })
    }

    it(`${name} sets explicit width and height`, () => {
      expect(content).toContain('width="')
      expect(content).toContain('height="')
    })

    it(`${name} includes densities or sizes attribute for responsive images`, () => {
      const hasDensities = content.includes('densities="')
      const hasSizes = content.includes('sizes="')
      expect(hasDensities || hasSizes).toBe(true)
    })
  })

  it('a-propos.vue uses <NuxtImg> with lazy loading', () => {
    const content = readFile('app/pages/a-propos.vue')
    expect(content).toContain('<NuxtImg')
    expect(content).toContain('loading="lazy"')
    expect(content).toContain('format="webp"')
  })

  it('projets.vue uses <NuxtImg> with lazy loading', () => {
    const content = readFile('app/pages/projets.vue')
    expect(content).toContain('<NuxtImg')
    expect(content).toContain('loading="lazy"')
    expect(content).toContain('format="webp"')
  })
})
