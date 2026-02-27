import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceBlock from '~/components/ServiceBlock.vue'
import { NuxtLink, NuxtImg } from '../stubs'

const baseProps = {
  title: 'Conception Architecturale',
  paragraphs: [
    'Premier paragraphe de test.',
    'Deuxième paragraphe de test.',
  ],
  ctaText: 'Discuter de votre projet',
  image: '/images/projet-villa-horizon.jpg',
  index: 0,
  reversed: false,
}

describe('ServiceBlock', () => {
  it('renders without errors', () => {
    const wrapper = mount(ServiceBlock, {
      props: baseProps,
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the service title', () => {
    const wrapper = mount(ServiceBlock, {
      props: baseProps,
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapper.text()).toContain('Conception Architecturale')
  })

  it('displays the service number (01)', () => {
    const wrapper = mount(ServiceBlock, {
      props: baseProps,
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapper.text()).toContain('01')
  })

  it('displays correct service number for index 2', () => {
    const wrapper = mount(ServiceBlock, {
      props: { ...baseProps, index: 2 },
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapper.text()).toContain('03')
  })

  it('displays all paragraphs', () => {
    const wrapper = mount(ServiceBlock, {
      props: baseProps,
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapper.text()).toContain('Premier paragraphe de test.')
    expect(wrapper.text()).toContain('Deuxième paragraphe de test.')
  })

  it('displays CTA text', () => {
    const wrapper = mount(ServiceBlock, {
      props: baseProps,
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapper.text()).toContain('Discuter de votre projet')
  })

  it('does not render CTA if ctaText is not provided', () => {
    const wrapper = mount(ServiceBlock, {
      props: { ...baseProps, ctaText: undefined },
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapper.find('.btn-outline').exists()).toBe(false)
  })

  it('renders the service image', () => {
    const wrapper = mount(ServiceBlock, {
      props: baseProps,
      global: { components: { NuxtLink, NuxtImg } },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/images/projet-villa-horizon.jpg')
    expect(img.attributes('alt')).toContain('Conception Architecturale')
  })

  it('has service-layout class', () => {
    const wrapper = mount(ServiceBlock, {
      props: baseProps,
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapper.find('.service-layout').exists()).toBe(true)
  })

  it('applies reversed modifier class when reversed=true', () => {
    const wrapper = mount(ServiceBlock, {
      props: { ...baseProps, reversed: true },
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapper.find('.service-layout--reversed').exists()).toBe(true)
  })

  it('does not apply reversed modifier when reversed=false', () => {
    const wrapper = mount(ServiceBlock, {
      props: { ...baseProps, reversed: false },
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapper.find('.service-layout--reversed').exists()).toBe(false)
  })

  it('renders icon slot content', () => {
    const wrapper = mount(ServiceBlock, {
      props: baseProps,
      global: { components: { NuxtLink, NuxtImg } },
      slots: {
        icon: '<svg class="test-icon"></svg>',
      },
    })
    expect(wrapper.find('.test-icon').exists()).toBe(true)
  })

  it('alternates background color based on index', () => {
    const wrapperEven = mount(ServiceBlock, {
      props: { ...baseProps, index: 0 },
      global: { components: { NuxtLink, NuxtImg } },
    })
    const wrapperOdd = mount(ServiceBlock, {
      props: { ...baseProps, index: 1 },
      global: { components: { NuxtLink, NuxtImg } },
    })
    expect(wrapperEven.find('section').attributes('style')).toContain('#FFFFFF')
    expect(wrapperOdd.find('section').attributes('style')).toContain('var(--offwhite)')
  })
})
