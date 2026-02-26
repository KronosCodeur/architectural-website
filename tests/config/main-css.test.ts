import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const cssContent = readFileSync(resolve(__dirname, '../../app/assets/css/main.css'), 'utf-8')

describe('main.css - CSS Design System', () => {
  describe('CSS Custom Properties', () => {
    it('defines --ivory color', () => {
      expect(cssContent).toContain('--ivory')
    })

    it('defines --anthracite color', () => {
      expect(cssContent).toContain('--anthracite')
    })

    it('defines --vert color', () => {
      expect(cssContent).toContain('--vert')
    })

    it('defines --sable color', () => {
      expect(cssContent).toContain('--sable')
    })

    it('defines --gray-text color', () => {
      expect(cssContent).toContain('--gray-text')
    })
  })

  describe('CSS Reset', () => {
    it('applies box-sizing border-box globally', () => {
      expect(cssContent).toContain('box-sizing: border-box')
    })

    it('resets margin and padding', () => {
      expect(cssContent).toContain('margin: 0')
      expect(cssContent).toContain('padding: 0')
    })

    it('hides horizontal overflow on body', () => {
      expect(cssContent).toContain('overflow-x: hidden')
    })
  })

  describe('Typography', () => {
    it('defines font-heading class with Playfair Display', () => {
      expect(cssContent).toContain('.font-heading')
      expect(cssContent).toContain('Playfair Display')
    })

    it('sets body font to Inter', () => {
      expect(cssContent).toContain('Inter')
    })
  })

  describe('Layout Utilities', () => {
    it('defines container-brand with max-width', () => {
      expect(cssContent).toContain('.container-brand')
      expect(cssContent).toContain('1280px')
    })

    it('defines section-padding', () => {
      expect(cssContent).toContain('.section-padding')
    })
  })

  describe('Button Styles', () => {
    it('defines btn-primary class', () => {
      expect(cssContent).toContain('.btn-primary')
    })

    it('defines btn-outline class', () => {
      expect(cssContent).toContain('.btn-outline')
    })

    it('defines btn-outline-white class', () => {
      expect(cssContent).toContain('.btn-outline-white')
    })
  })

  describe('Component Styles', () => {
    it('defines card-expertise class', () => {
      expect(cssContent).toContain('.card-expertise')
    })

    it('defines project-card class', () => {
      expect(cssContent).toContain('.project-card')
    })

    it('defines nav-link class', () => {
      expect(cssContent).toContain('.nav-link')
    })

    it('defines overlay-hover class', () => {
      expect(cssContent).toContain('.overlay-hover')
    })

    it('defines line-accent class', () => {
      expect(cssContent).toContain('.line-accent')
    })

    it('defines eyebrow class', () => {
      expect(cssContent).toContain('.eyebrow')
    })
  })

  describe('Reveal Animations', () => {
    it('defines .reveal class', () => {
      expect(cssContent).toContain('.reveal')
    })

    it('defines .reveal-left class', () => {
      expect(cssContent).toContain('.reveal-left')
    })

    it('defines .reveal-right class', () => {
      expect(cssContent).toContain('.reveal-right')
    })

    it('defines .reveal-stagger class', () => {
      expect(cssContent).toContain('.reveal-stagger')
    })

    it('defines .is-visible class', () => {
      expect(cssContent).toContain('.is-visible')
    })
  })

  describe('Keyframe Animations', () => {
    it('defines fadeInUp keyframe', () => {
      expect(cssContent).toContain('@keyframes fadeInUp')
    })

    it('defines scaleIn keyframe', () => {
      expect(cssContent).toContain('@keyframes scaleIn')
    })

    it('defines lineGrow keyframe', () => {
      expect(cssContent).toContain('@keyframes lineGrow')
    })

    it('defines scrollPulse keyframe', () => {
      expect(cssContent).toContain('@keyframes scrollPulse')
    })
  })
})
