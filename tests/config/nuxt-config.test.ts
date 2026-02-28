import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const configContent = readFileSync(resolve(__dirname, '../../nuxt.config.ts'), 'utf-8')

describe('nuxt.config.ts', () => {
  it('registers @nuxt/ui module', () => {
    expect(configContent).toContain("'@nuxt/ui'")
  })


  it('registers @nuxt/image module', () => {
    expect(configContent).toContain("'@nuxt/image'")
  })

  it('references main.css as global CSS', () => {
    expect(configContent).toContain('~/assets/css/main.css')
  })

  it('configures Google Fonts (Inter)', () => {
    expect(configContent).toContain('Inter')
  })

  it('configures Google Fonts (Playfair Display)', () => {
    expect(configContent).toContain('Playfair+Display')
  })

  it('has preconnect to Google Fonts', () => {
    expect(configContent).toContain('fonts.googleapis.com')
    expect(configContent).toContain('fonts.gstatic.com')
  })

  it('sets default page title', () => {
    expect(configContent).toContain('Archi Design')
  })

  it('sets meta description', () => {
    expect(configContent).toContain("architecture premium")
  })

  it('registers @nuxtjs/sitemap module', () => {
    expect(configContent).toContain("'@nuxtjs/sitemap'")
  })

  it('sets htmlAttrs lang=fr', () => {
    expect(configContent).toContain("lang: 'fr'")
  })

  it('configures Open Graph meta', () => {
    expect(configContent).toContain("og:type")
    expect(configContent).toContain("og:title")
    expect(configContent).toContain("og:description")
    expect(configContent).toContain("og:image")
    expect(configContent).toContain("og:locale")
  })

  it('configures Twitter Card meta', () => {
    expect(configContent).toContain("twitter:card")
    expect(configContent).toContain("summary_large_image")
  })

  it('sets canonical URL', () => {
    expect(configContent).toContain("rel: 'canonical'")
  })

  it('configures @nuxt/image with quality and formats', () => {
    expect(configContent).toContain('quality: 80')
    expect(configContent).toContain("'webp'")
  })

  it('configures sitemap', () => {
    expect(configContent).toContain('sitemap:')
    expect(configContent).toContain('archidesign.com')
  })
})
