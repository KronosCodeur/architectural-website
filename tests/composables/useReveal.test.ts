import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useReveal } from '~/composables/useReveal'

describe('useReveal', () => {
  let observerInstances: any[] = []
  let originalIntersectionObserver: typeof IntersectionObserver

  beforeEach(() => {
    observerInstances = []
    originalIntersectionObserver = globalThis.IntersectionObserver

    // Mock IntersectionObserver as a class constructor
    const MockObserver = vi.fn(function (this: any, callback: any, options: any) {
      this.callback = callback
      this.options = options
      this.observedElements = [] as Element[]
      this.observe = vi.fn((el: Element) => { this.observedElements.push(el) })
      this.unobserve = vi.fn()
      this.disconnect = vi.fn()
      this.takeRecords = vi.fn(() => [])
      this.root = null
      this.rootMargin = options?.rootMargin ?? ''
      this.thresholds = Array.isArray(options?.threshold) ? options.threshold : [options?.threshold ?? 0]
      observerInstances.push(this)
    }) as any
    globalThis.IntersectionObserver = MockObserver
  })

  afterEach(() => {
    globalThis.IntersectionObserver = originalIntersectionObserver
  })

  it('returns an init function', () => {
    const { init } = useReveal()
    expect(typeof init).toBe('function')
  })

  it('creates an IntersectionObserver with correct config', () => {
    const { init } = useReveal()
    init()
    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
  })

  it('observes all reveal elements after a delay', async () => {
    // Add reveal elements to the DOM
    const el1 = document.createElement('div')
    el1.classList.add('reveal')
    const el2 = document.createElement('div')
    el2.classList.add('reveal-left')
    const el3 = document.createElement('div')
    el3.classList.add('reveal-right')
    const el4 = document.createElement('div')
    el4.classList.add('reveal-stagger')
    document.body.append(el1, el2, el3, el4)

    const { init } = useReveal()
    init()

    // Wait for the 100ms setTimeout
    await new Promise(r => setTimeout(r, 150))

    const observer = observerInstances[0]
    expect(observer.observedElements).toHaveLength(4)
    expect(observer.observedElements).toContain(el1)
    expect(observer.observedElements).toContain(el2)
    expect(observer.observedElements).toContain(el3)
    expect(observer.observedElements).toContain(el4)

    // Cleanup
    el1.remove()
    el2.remove()
    el3.remove()
    el4.remove()
  })

  it('adds is-visible class and unobserves when intersecting', async () => {
    const el = document.createElement('div')
    el.classList.add('reveal')
    document.body.appendChild(el)

    const { init } = useReveal()
    init()

    await new Promise(r => setTimeout(r, 150))

    const observer = observerInstances[0]

    // Simulate intersection
    observer.callback([
      { isIntersecting: true, target: el },
    ])

    expect(el.classList.contains('is-visible')).toBe(true)
    expect(observer.unobserve).toHaveBeenCalledWith(el)

    el.remove()
  })

  it('does NOT add is-visible when not intersecting', async () => {
    const el = document.createElement('div')
    el.classList.add('reveal')
    document.body.appendChild(el)

    const { init } = useReveal()
    init()

    await new Promise(r => setTimeout(r, 150))

    const observer = observerInstances[0]

    // Simulate non-intersection
    observer.callback([
      { isIntersecting: false, target: el },
    ])

    expect(el.classList.contains('is-visible')).toBe(false)
    expect(observer.unobserve).not.toHaveBeenCalled()

    el.remove()
  })
})
