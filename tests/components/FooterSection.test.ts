import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FooterSection from '~/components/FooterSection.vue'
import { NuxtLink } from '../stubs'

describe('FooterSection', () => {
  const wrapper = mount(FooterSection, {
    global: { components: { NuxtLink } },
  })

  it('renders without errors', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays brand name "Taurus Concept"', () => {
    expect(wrapper.text()).toContain('Taurus Concept')
  })

  it('displays TC logo', () => {
    expect(wrapper.text()).toContain('TC')
  })

  it('displays brand tagline', () => {
    expect(wrapper.text()).toContain("L'excellence architecturale")
    expect(wrapper.text()).toContain('Du Togo vers le monde')
  })

  it('has navigation section with correct title', () => {
    expect(wrapper.text()).toContain('Navigation')
  })

  it('renders all 5 footer navigation links', () => {
    const navLabels = ['Accueil', 'Services', 'Projets', 'À propos', 'Contact']
    navLabels.forEach(label => {
      expect(wrapper.text()).toContain(label)
    })
  })

  it('has correct navigation routes', () => {
    const links = wrapper.findAll('a')
    const hrefs = links.map(l => l.attributes('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/services')
    expect(hrefs).toContain('/projets')
    expect(hrefs).toContain('/a-propos')
    expect(hrefs).toContain('/contact')
  })

  it('has contact section', () => {
    expect(wrapper.text()).toContain('Contact')
  })

  it('displays Togo address', () => {
    expect(wrapper.text()).toContain('Boulevard du 13 Janvier')
    expect(wrapper.text()).toContain('Lomé, Togo')
  })

  it('displays contact email', () => {
    expect(wrapper.text()).toContain('contact@taurusconcept.com')
  })

  it('displays phone number', () => {
    expect(wrapper.text()).toContain('+228 90 00 00 00')
  })

  it('displays copyright notice with current year', () => {
    const year = new Date().getFullYear().toString()
    expect(wrapper.text()).toContain(year)
    expect(wrapper.text()).toContain('Taurus Concept. Tous droits réservés')
  })

  it('displays legal text placeholders', () => {
    expect(wrapper.text()).toContain('Mentions légales')
    expect(wrapper.text()).toContain('Politique de confidentialité')
  })

  it('uses footer tag as root', () => {
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('has the footer grid', () => {
    expect(wrapper.find('.footer-grid').exists()).toBe(true)
  })

  it('has the footer bottom bar', () => {
    expect(wrapper.find('.footer-bottom').exists()).toBe(true)
  })
})
