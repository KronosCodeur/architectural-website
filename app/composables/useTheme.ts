export function useTheme() {
  const { data: settings } = useFetch<Record<string, string>>('/api/settings', {
    key: 'site-settings',
    server: true,
    default: () => ({}),
  })

  function buildCssVars(s: Record<string, string>): string {
    const vars: string[] = []
    if (s.theme_color_vert) vars.push(`--vert:${s.theme_color_vert}`)
    if (s.theme_color_anthracite) vars.push(`--anthracite:${s.theme_color_anthracite}`)
    if (s.theme_color_sable) vars.push(`--sable:${s.theme_color_sable}`)
    if (s.theme_color_ivory) vars.push(`--ivory:${s.theme_color_ivory}`)
    return vars.length ? `:root{${vars.join(';')}}` : ''
  }

  const themeStyle = computed(() => buildCssVars(settings.value ?? {}))

  useHead({
    style: [{ key: 'theme-vars', innerHTML: themeStyle }],
  })

  if (import.meta.client) {
    watch(settings, (val) => {
      if (!val) return
      const root = document.documentElement
      if (val.theme_color_vert) root.style.setProperty('--vert', val.theme_color_vert)
      if (val.theme_color_anthracite) root.style.setProperty('--anthracite', val.theme_color_anthracite)
      if (val.theme_color_sable) root.style.setProperty('--sable', val.theme_color_sable)
      if (val.theme_color_ivory) root.style.setProperty('--ivory', val.theme_color_ivory)
    }, { immediate: true })
  }

  return { settings }
}
