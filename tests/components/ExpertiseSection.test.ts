import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import ExpertiseSection from '~/components/ExpertiseSection.vue'
import { NuxtLink } from '../stubs'

// Stub UIcon as a simple span with the icon name
const UIcon = defineComponent({
  name: 'UIcon',
  props: { name: { type: String, default: '' }, size: { type: [String, Number], default: '' } },
  setup(props) {
    return () => h('span', { class: 'u-icon', 'data-icon': props.name })
  },
})

describe('ExpertiseSection', () => {
  const wrapper = mount(ExpertiseSection, {
    global: { components: { NuxtLink, UIcon } },
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

  it('renders icons for each card', () => {
    const icons = wrapper.findAll('.u-icon')
    expect(icons.length).toBe(3)
    expect(icons[0].attributes('data-icon')).toBe('lucide:drafting-compass')
    expect(icons[1].attributes('data-icon')).toBe('lucide:gantt-chart')
    expect(icons[2].attributes('data-icon')).toBe('lucide:globe')
  })
})
