export function useReveal() {
  function init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    // Small delay so DOM is ready after Vue render
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger').forEach((el) => {
        observer.observe(el)
      })
    }, 100)
  }

  return { init }
}
