import type { ConcreteComponent } from 'vue'
import TemplateHome from '~/components/templates/TemplateHome.vue'
import TemplateServices from '~/components/templates/TemplateServices.vue'
import TemplateProjets from '~/components/templates/TemplateProjets.vue'
import TemplateAPropos from '~/components/templates/TemplateAPropos.vue'
import TemplateContact from '~/components/templates/TemplateContact.vue'

export const TEMPLATE_REGISTRY: Record<string, ConcreteComponent> = {
  home: TemplateHome,
  services: TemplateServices,
  projets: TemplateProjets,
  'a-propos': TemplateAPropos,
  contact: TemplateContact,
}

export function resolveTemplate(name: string | null | undefined): ConcreteComponent | null {
  if (!name) return null
  return TEMPLATE_REGISTRY[name] ?? null
}
