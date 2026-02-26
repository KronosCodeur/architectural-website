import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import ExpertiseSection from '~/components/ExpertiseSection.vue'
import { NuxtLink, SvgStub } from '../stubs'

// Mock SVG imports
vi.mock('~/assets/icons/icon-conception.svg', () => ({
  default: defineComponent({ name: 'IconConception', setup: () => () => h('svg', { class: 'icon-conception' }) }),
}))
vi.mock('~/assets/icons/icon-gestion-projet.svg', () => ({
  default: defineComponent({ name: 'IconGestionProjet', setup: () => () => h('svg', { class: 'icon-gestion-projet' }) }),
}))
vi.mock('~/assets/icons/icon-developpement.svg', () => ({
  default: defineComponent({ name: 'IconDeveloppement', setup: () => () => h('svg', { class: 'icon-developpement' }) }),
}))

describe('ExpertiseSection', () => {
  const wrapper = mount(ExpertiseSection, {
    global: { components: { NuxtLink } },
  })

  it('renders without errors', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the section eyebrow', () => {
    expect(wrapper.text()).toContain('Ce que nous faisons')
  })

  it('displays the section title', () => {
    expect(wrapper.text()).toContain('Notre Expertise')
  })

  it('displays 3 expertise cards', () => {
    const cards = wrapper.findAll('.card-expertise')
    expect(cards).toHaveLength(3)
  })

  it('displays card titles', () => {
    expect(wrapper.text()).toContain('Conception')
    expect(wrapper.text()).toContain('Gestion de Projet')
    expect(wrapper.text()).toContain('Développement International')
  })

  it('displays card descriptions', () => {
    expect(wrapper.text()).toContain('plans architecturaux sur-mesure')
    expect(wrapper.text()).toContain('Supervision complète')
    expect(wrapper.text()).toContain('investissements immobiliers')
  })

  it('has "En savoir plus" links for each card', () => {
    const text = wrapper.text()
    const matches = text.match(/En savoir plus/g)
    expect(matches).toHaveLength(3)
  })

  it('has the expertise grid class', () => {
    expect(wrapper.find('.expertise-grid').exists()).toBe(true)
  })

  it('renders SVG icons for each card', () => {
    const svgs = wrapper.findAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(3)
  })
})
