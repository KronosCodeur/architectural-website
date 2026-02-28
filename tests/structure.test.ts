import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(__dirname, '..')

describe('Project Structure', () => {
  describe('Root config files', () => {
    const files = ['nuxt.config.ts', 'package.json', 'tsconfig.json', '.gitignore']
    files.forEach(file => {
      it(`${file} exists`, () => {
        expect(existsSync(resolve(root, file))).toBe(true)
      })
    })
  })

  describe('App core files', () => {
    it('app.vue exists', () => {
      expect(existsSync(resolve(root, 'app/app.vue'))).toBe(true)
    })

    it('default layout exists', () => {
      expect(existsSync(resolve(root, 'app/layouts/default.vue'))).toBe(true)
    })

    it('main.css exists', () => {
      expect(existsSync(resolve(root, 'app/assets/css/main.css'))).toBe(true)
    })
  })

  describe('Components', () => {
    const components = [
      'Navbar.vue',
      'HeroSection.vue',
      'ExpertiseSection.vue',
      'ProjectsSection.vue',
      'VisionSection.vue',
      'ServiceBlock.vue',
      'FooterSection.vue',
    ]
    components.forEach(comp => {
      it(`${comp} exists`, () => {
        expect(existsSync(resolve(root, 'app/components', comp))).toBe(true)
      })
    })
  })

  describe('Composables', () => {
    it('useReveal.ts exists', () => {
      expect(existsSync(resolve(root, 'app/composables/useReveal.ts'))).toBe(true)
    })

    it('useStructuredData.ts exists', () => {
      expect(existsSync(resolve(root, 'app/composables/useStructuredData.ts'))).toBe(true)
    })
  })


  describe('Asset Images', () => {
    const images = [
      'hero-architecture.jpg',
      'projet-villa-horizon.jpg',
      'projet-tour-initiale.jpg',
      'projet-penthouse-ciel.jpg',
    ]
    images.forEach(img => {
      it(`${img} exists in app/assets/images/`, () => {
        expect(existsSync(resolve(root, 'app/assets/images', img))).toBe(true)
      })
    })
  })

  describe('Public Assets', () => {
    it('robots.txt exists', () => {
      expect(existsSync(resolve(root, 'public/robots.txt'))).toBe(true)
    })

    it('favicon.svg exists', () => {
      expect(existsSync(resolve(root, 'public/favicon.svg'))).toBe(true)
    })

    const publicImages = [
      'hero-architecture.jpg',
      'projet-villa-horizon.jpg',
      'projet-tour-initiale.jpg',
      'projet-penthouse-ciel.jpg',
    ]
    publicImages.forEach(img => {
      it(`${img} exists in public/images/`, () => {
        expect(existsSync(resolve(root, 'public/images', img))).toBe(true)
      })
    })
  })
})
