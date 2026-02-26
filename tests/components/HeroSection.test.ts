import { describe, it, expect, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// HeroSection uses a template image src="~/assets/images/hero-architecture.jpg"
// which gets compiled by the Vue SFC compiler into a bare import.
// Since vitest doesn't have Nuxt's full asset pipeline, we test via source analysis.
const heroContent = readFileSync(resolve(__dirname, '../../app/components/HeroSection.vue'), 'utf-8')

describe('HeroSection', () => {
  it('source file exists and is not empty', () => {
    expect(heroContent.length).toBeGreaterThan(0)
  })

  it('has a template section', () => {
    expect(heroContent).toContain('<template>')
    expect(heroContent).toContain('</template>')
  })

  it('has a script setup section', () => {
    expect(heroContent).toContain('<script setup')
  })

  it('contains the main heading text', () => {
    expect(heroContent).toContain("L'Excellence")
    expect(heroContent).toContain('Architecturale au')
    expect(heroContent).toContain('Service de Votre Vision')
  })

  it('contains the eyebrow text', () => {
    expect(heroContent).toContain('Architecture & Design International')
  })

  it('contains subtitle about Lomé', () => {
    expect(heroContent).toContain('Depuis Lomé')
    expect(heroContent).toContain("espaces d'exception")
  })

  it('has "Découvrir nos projets" CTA', () => {
    expect(heroContent).toContain('Découvrir nos projets')
  })

  it('has "Notre expertise" CTA', () => {
    expect(heroContent).toContain('Notre expertise')
  })

  it('links to services page', () => {
    expect(heroContent).toContain('/services')
  })

  it('has a scroll indicator', () => {
    expect(heroContent).toContain('Scroll')
  })

  it('references hero background image', () => {
    expect(heroContent).toContain('hero-architecture.jpg')
  })

  it('uses 100vh height', () => {
    expect(heroContent).toContain('100vh')
  })

  it('uses loaded ref for animations', () => {
    expect(heroContent).toContain('loaded')
    expect(heroContent).toContain("ref(false)")
  })

  it('has gradient overlay on background', () => {
    expect(heroContent).toContain('linear-gradient')
  })

  it('has animation classes (anim-fade-in)', () => {
    expect(heroContent).toContain('anim-fade-in')
  })

  it('has staggered animation delays', () => {
    expect(heroContent).toContain('animationDelay')
  })
})
