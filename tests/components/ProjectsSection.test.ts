import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectsSection from '~/components/ProjectsSection.vue'
import { NuxtLink } from '../stubs'

// Mock image imports
vi.mock('~/assets/images/projet-villa-horizon.jpg', () => ({ default: '/images/projet-villa-horizon.jpg' }))
vi.mock('~/assets/images/projet-tour-initiale.jpg', () => ({ default: '/images/projet-tour-initiale.jpg' }))
vi.mock('~/assets/images/projet-penthouse-ciel.jpg', () => ({ default: '/images/projet-penthouse-ciel.jpg' }))

describe('ProjectsSection', () => {
  const wrapper = mount(ProjectsSection, {
    global: { components: { NuxtLink } },
  })

  it('renders without errors', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the section eyebrow', () => {
    expect(wrapper.text()).toContain('Portfolio')
  })

  it('displays the section title', () => {
    expect(wrapper.text()).toContain('Projets Récents')
  })

  it('renders 3 project cards', () => {
    const cards = wrapper.findAll('.project-card')
    expect(cards).toHaveLength(3)
  })

  it('displays project titles', () => {
    expect(wrapper.text()).toContain("Villa L'Horizon")
    expect(wrapper.text()).toContain('Tour Initiale')
    expect(wrapper.text()).toContain('Penthouse Ciel')
  })

  it('displays project locations', () => {
    expect(wrapper.text()).toContain("Côte d'Azur, France")
    expect(wrapper.text()).toContain('Genève, Suisse')
    expect(wrapper.text()).toContain('Dubaï, EAU')
  })

  it('displays project categories', () => {
    expect(wrapper.text()).toContain('Résidentiel')
    expect(wrapper.text()).toContain('Commercial')
  })

  it('has a projects grid', () => {
    expect(wrapper.find('.projects-grid').exists()).toBe(true)
  })

  it('renders images for each project', () => {
    const imgs = wrapper.findAll('img')
    expect(imgs).toHaveLength(3)
    imgs.forEach(img => {
      expect(img.attributes('src')).toBeTruthy()
    })
  })

  it('has overlay hover elements', () => {
    const overlays = wrapper.findAll('.overlay-hover')
    expect(overlays).toHaveLength(3)
  })
})
