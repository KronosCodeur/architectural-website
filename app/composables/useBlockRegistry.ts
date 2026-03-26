import type {
  HeroContent, TextContent, ImageTextContent,
  CardsContent, CtaContent, SpacerContent, GalleryContent, SliderContent, ContactFormContent,
} from '~/../../shared/types/blocks'

export interface BlockDefinition {
  label: string
  icon: string
  defaultContent: Record<string, unknown>
}

export const BLOCK_REGISTRY: Record<string, BlockDefinition> = {
  hero: {
    label: 'Hero',
    icon: 'lucide:layout-template',
    defaultContent: {
      title: 'Titre principal',
      subtitle: 'Votre sous-titre accrocheur',
      ctaText: 'Découvrir',
      ctaUrl: '/',
      backgroundImage: '',
      overlay: true,
      overlayOpacity: 0.4,
      textAlign: 'center',
      minHeight: '500px',
    } satisfies HeroContent,
  },
  slider: {
    label: 'Slider / Carrousel',
    icon: 'lucide:gallery-horizontal',
    defaultContent: {
      slides: [
        {
          image: '',
          title: 'Titre de la diapositive',
          subtitle: 'Sous-titre accrocheur',
          ctaText: 'Découvrir',
          ctaUrl: '/',
          overlay: true,
          overlayOpacity: 0.5,
        },
      ],
      autoplay: true,
      interval: 5,
      minHeight: '100vh',
      textAlign: 'center',
    } satisfies SliderContent,
  },
  text: {
    label: 'Texte',
    icon: 'lucide:type',
    defaultContent: {
      content: '<p>Votre contenu ici...</p>',
      alignment: 'left',
    } satisfies TextContent,
  },
  image_text: {
    label: 'Image + Texte',
    icon: 'lucide:layout',
    defaultContent: {
      title: 'Titre de la section',
      content: '<p>Description de cette section...</p>',
      image: '',
      imageAlt: '',
      layout: 'image-left',
      ctaText: '',
      ctaUrl: '',
    } satisfies ImageTextContent,
  },
  cards: {
    label: 'Cards / Services',
    icon: 'lucide:layout-grid',
    defaultContent: {
      title: 'Nos services',
      subtitle: '',
      columns: 3,
      cards: [
        { icon: 'lucide:star', title: 'Service 1', description: 'Description du service', link: '' },
        { icon: 'lucide:star', title: 'Service 2', description: 'Description du service', link: '' },
        { icon: 'lucide:star', title: 'Service 3', description: 'Description du service', link: '' },
      ],
    } satisfies CardsContent,
  },
  cta: {
    label: 'Call to Action',
    icon: 'lucide:megaphone',
    defaultContent: {
      title: 'Prêt à démarrer ?',
      subtitle: 'Contactez-nous dès aujourd\'hui',
      buttonText: 'Nous contacter',
      buttonUrl: '/contact',
      background: 'dark',
    } satisfies CtaContent,
  },
  spacer: {
    label: 'Séparateur',
    icon: 'lucide:separator-horizontal',
    defaultContent: { height: 'medium' } satisfies SpacerContent,
  },
  gallery: {
    label: 'Galerie',
    icon: 'lucide:images',
    defaultContent: {
      title: '',
      columns: 3,
      images: [],
    } satisfies GalleryContent,
  },
  contact_form: {
    label: 'Formulaire de contact',
    icon: 'lucide:mail',
    defaultContent: {
      title: 'Nos Coordonnées',
      subtitle: '',
      showAddress: true,
      showPhone: true,
      showOffices: true,
    } satisfies ContactFormContent,
  },
}

export function useBlockRegistry() {
  function getDefinition(type: string): BlockDefinition {
    return BLOCK_REGISTRY[type] ?? { label: type, icon: 'lucide:box', defaultContent: {} }
  }

  function createBlock(type: string) {
    const def = getDefinition(type)
    return {
      id: undefined as number | undefined,
      type,
      content: structuredClone(def.defaultContent),
      order: 0,
      isActive: true,
    }
  }

  return { BLOCK_REGISTRY, getDefinition, createBlock }
}
