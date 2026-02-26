import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const pagesDir = resolve(__dirname, '../../app/pages')

describe('Pages Structure', () => {
  const expectedPages = ['index.vue', 'services.vue', 'projets.vue', 'a-propos.vue', 'contact.vue']

  expectedPages.forEach(page => {
    it(`${page} exists`, () => {
      expect(existsSync(resolve(pagesDir, page))).toBe(true)
    })
  })

  describe('index.vue', () => {
    const content = readFileSync(resolve(pagesDir, 'index.vue'), 'utf-8')

    it('includes HeroSection component', () => {
      expect(content).toContain('<HeroSection')
    })

    it('includes ExpertiseSection component', () => {
      expect(content).toContain('<ExpertiseSection')
    })

    it('includes ProjectsSection component', () => {
      expect(content).toContain('<ProjectsSection')
    })

    it('includes VisionSection component', () => {
      expect(content).toContain('<VisionSection')
    })

    it('sets page title', () => {
      expect(content).toContain('useHead')
      expect(content).toContain('Taurus Concept')
    })

    it('initializes reveal animations', () => {
      expect(content).toContain('useReveal')
      expect(content).toContain('init()')
    })
  })

  describe('services.vue', () => {
    const content = readFileSync(resolve(pagesDir, 'services.vue'), 'utf-8')

    it('includes ServiceBlock components', () => {
      expect(content).toContain('<ServiceBlock')
    })

    it('has 4 service blocks (index 0-3)', () => {
      expect(content).toContain(':index="0"')
      expect(content).toContain(':index="1"')
      expect(content).toContain(':index="2"')
      expect(content).toContain(':index="3"')
    })

    it('imports SVG icons', () => {
      expect(content).toContain('icon-conception.svg')
      expect(content).toContain('icon-gestion-projet.svg')
      expect(content).toContain('icon-developpement.svg')
      expect(content).toContain('icon-design-interieur.svg')
    })

    it('has page header with title "Services"', () => {
      expect(content).toContain('Services')
    })

    it('has a CTA section linking to contact', () => {
      expect(content).toContain('/contact')
    })

    it('sets page title', () => {
      expect(content).toContain('Services — Taurus Concept')
    })
  })

  describe('projets.vue', () => {
    const content = readFileSync(resolve(pagesDir, 'projets.vue'), 'utf-8')

    it('has page header with title "Projets"', () => {
      expect(content).toContain('Projets')
    })

    it('defines 6 projects', () => {
      // Count project entries in the array
      const projectMatches = content.match(/title:/g)
      expect(projectMatches?.length).toBeGreaterThanOrEqual(6)
    })

    it('uses project-card class', () => {
      expect(content).toContain('project-card')
    })

    it('has responsive grid breakpoints', () => {
      expect(content).toContain('768px')
      expect(content).toContain('1024px')
    })

    it('sets page title', () => {
      expect(content).toContain('Projets — Taurus Concept')
    })
  })

  describe('a-propos.vue', () => {
    const content = readFileSync(resolve(pagesDir, 'a-propos.vue'), 'utf-8')

    it('has page header with title "À Propos"', () => {
      expect(content).toContain('À Propos')
    })

    it('includes story section about the company', () => {
      expect(content).toContain('Notre Histoire')
      expect(content).toContain('25 Ans')
    })

    it('has values section', () => {
      expect(content).toContain('Nos Valeurs')
    })

    it('defines 4 values', () => {
      expect(content).toContain('Excellence')
      expect(content).toContain('Innovation')
      expect(content).toContain('Intégrité')
      expect(content).toContain('Durabilité')
    })

    it('includes VisionSection component', () => {
      expect(content).toContain('<VisionSection')
    })

    it('sets page title', () => {
      expect(content).toContain('À Propos — Taurus Concept')
    })
  })

  describe('contact.vue', () => {
    const content = readFileSync(resolve(pagesDir, 'contact.vue'), 'utf-8')

    it('has page header with title "Contact"', () => {
      expect(content).toContain('Contact')
    })

    it('has a contact form', () => {
      expect(content).toContain('<form')
      expect(content).toContain('</form>')
    })

    it('has name input', () => {
      expect(content).toContain('Nom complet')
      expect(content).toContain('type="text"')
    })

    it('has email input', () => {
      expect(content).toContain('type="email"')
    })

    it('has subject select', () => {
      expect(content).toContain('<select')
      expect(content).toContain('Conception Architecturale')
    })

    it('has message textarea', () => {
      expect(content).toContain('<textarea')
    })

    it('has submit button', () => {
      expect(content).toContain('type="submit"')
      expect(content).toContain('Envoyer le message')
    })

    it('displays company address', () => {
      expect(content).toContain('Boulevard du 13 Janvier')
      expect(content).toContain('Lomé, Togo')
    })

    it('displays international offices', () => {
      expect(content).toContain('Accra, Ghana')
      expect(content).toContain('Paris, France')
      expect(content).toContain('Dubaï, EAU')
    })

    it('sets page title', () => {
      expect(content).toContain('Contact — Taurus Concept')
    })
  })
})
