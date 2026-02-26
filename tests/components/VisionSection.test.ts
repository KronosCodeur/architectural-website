import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VisionSection from '~/components/VisionSection.vue'
import { NuxtLink } from '../stubs'

describe('VisionSection', () => {
  const wrapper = mount(VisionSection, {
    global: { components: { NuxtLink } },
  })

  it('renders without errors', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the section title', () => {
    expect(wrapper.text()).toContain('Une Vision Internationale')
  })

  it('displays the description about Togo', () => {
    expect(wrapper.text()).toContain('Depuis le Togo')
    expect(wrapper.text()).toContain('transcendent les frontières')
  })

  it('displays 3 statistics', () => {
    expect(wrapper.text()).toContain('120+')
    expect(wrapper.text()).toContain('15')
    expect(wrapper.text()).toContain('25 ans')
  })

  it('displays stat labels', () => {
    expect(wrapper.text()).toContain('Projets livrés')
    expect(wrapper.text()).toContain('Pays')
    expect(wrapper.text()).toContain("D'expérience")
  })

  it('has a stats grid', () => {
    expect(wrapper.find('.stats-grid').exists()).toBe(true)
  })

  it('has a contact CTA link', () => {
    const links = wrapper.findAll('a')
    const contactLink = links.find(l => l.attributes('href') === '/contact')
    expect(contactLink).toBeTruthy()
    expect(wrapper.text()).toContain('Contactez-nous')
  })

  it('uses dark background (anthracite)', () => {
    const section = wrapper.find('section')
    expect(section.attributes('style')).toContain('var(--anthracite)')
  })

  it('has decorative lines', () => {
    expect(wrapper.find('.deco-line-left').exists()).toBe(true)
    expect(wrapper.find('.deco-line-right').exists()).toBe(true)
  })
})
