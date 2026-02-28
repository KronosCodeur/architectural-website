import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import Navbar from '~/components/Navbar.vue'
import { NuxtLink } from '../stubs'

// Stub global components
const globalStubs = {
  NuxtLink,
}

describe('Navbar', () => {
  beforeEach(() => {
    // Reset scroll
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  it('renders without errors', () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays brand name "Archi Design"', () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })
    expect(wrapper.text()).toContain('Archi Design')
  })

  it('displays AD logo text', () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })
    expect(wrapper.text()).toContain('AD')
  })

  it('renders all 5 navigation links', () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })
    const links = wrapper.findAll('a')
    // Logo link + 5 desktop links + 5 mobile links + 1 mobile CTA = 12
    const navLabels = ['Accueil', 'Services', 'Projets', 'À propos', 'Contact']
    navLabels.forEach(label => {
      expect(wrapper.text()).toContain(label)
    })
  })

  it('has correct navigation routes', () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })
    const links = wrapper.findAll('a')
    const hrefs = links.map(l => l.attributes('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/services')
    expect(hrefs).toContain('/projets')
    expect(hrefs).toContain('/a-propos')
    expect(hrefs).toContain('/contact')
  })

  it('displays contact cities in top bar', () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })
    expect(wrapper.text()).toContain('Lomé')
    expect(wrapper.text()).toContain('Accra')
    expect(wrapper.text()).toContain('Paris')
    expect(wrapper.text()).toContain('Dubaï')
  })

  it('displays contact email in top bar', () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })
    expect(wrapper.text()).toContain('contact@archidesign.com')
  })

  it('has a mobile burger button', () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })
    const burger = wrapper.find('.mobile-burger')
    expect(burger.exists()).toBe(true)
  })

  it('toggles mobile menu on burger click', async () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })

    // Mobile menu should not be visible initially
    expect(wrapper.find('.mobile-menu').exists()).toBe(false)

    // Click burger
    await wrapper.find('.mobile-burger').trigger('click')

    // Mobile menu should appear
    expect(wrapper.find('.mobile-menu').exists()).toBe(true)

    // Click burger again
    await wrapper.find('.mobile-burger').trigger('click')

    // Mobile menu should disappear
    expect(wrapper.find('.mobile-menu').exists()).toBe(false)
  })

  it('closes mobile menu when a link is clicked', async () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })

    // Open mobile menu
    await wrapper.find('.mobile-burger').trigger('click')
    expect(wrapper.find('.mobile-menu').exists()).toBe(true)

    // Click a link in the mobile menu
    const mobileLinks = wrapper.find('.mobile-menu').findAll('a')
    if (mobileLinks.length > 0) {
      await mobileLinks[0].trigger('click')
      expect(wrapper.find('.mobile-menu').exists()).toBe(false)
    }
  })

  it('renders SVG in burger button', () => {
    const wrapper = mount(Navbar, {
      global: { components: globalStubs },
    })
    const svg = wrapper.find('.mobile-burger svg')
    expect(svg.exists()).toBe(true)
  })
})
