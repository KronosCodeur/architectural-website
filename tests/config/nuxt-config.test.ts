import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const configContent = readFileSync(resolve(__dirname, '../../nuxt.config.ts'), 'utf-8')

describe('nuxt.config.ts', () => {
  it('registers @nuxt/ui module', () => {
    expect(configContent).toContain("'@nuxt/ui'")
  })

  it('registers nuxt-svgo module', () => {
    expect(configContent).toContain("'nuxt-svgo'")
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
    expect(configContent).toContain('Taurus Concept')
  })

  it('sets meta description', () => {
    expect(configContent).toContain("L'excellence architecturale")
  })
})
