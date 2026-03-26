export interface HeroContent {
  title: string
  subtitle: string
  ctaText: string
  ctaUrl: string
  backgroundImage: string
  overlay: boolean
  overlayOpacity: number
  textAlign: 'left' | 'center' | 'right'
  minHeight: string
}

export interface TextContent {
  content: string
  alignment: 'left' | 'center' | 'right'
}

export interface ImageTextContent {
  title: string
  content: string
  image: string
  imageAlt: string
  layout: 'image-left' | 'image-right'
  ctaText: string
  ctaUrl: string
}

export interface CardsContent {
  title: string
  subtitle: string
  columns: 2 | 3 | 4
  cards: Array<{
    icon: string
    title: string
    description: string
    link: string
  }>
}

export interface CtaContent {
  title: string
  subtitle: string
  buttonText: string
  buttonUrl: string
  background: 'light' | 'dark' | 'brand'
}

export interface SpacerContent {
  height: 'small' | 'medium' | 'large'
}

export interface GalleryContent {
  title: string
  columns: 2 | 3 | 4
  images: Array<{ src: string; alt: string; caption: string }>
}

export interface SliderSlide {
  image: string
  title: string
  subtitle: string
  ctaText: string
  ctaUrl: string
  overlay: boolean
  overlayOpacity: number
}

export interface SliderContent {
  slides: SliderSlide[]
  autoplay: boolean
  interval: number
  minHeight: string
  textAlign: 'left' | 'center' | 'right'
}

export interface ContactFormContent {
  title?: string
  subtitle?: string
  showAddress?: boolean
  showPhone?: boolean
  showOffices?: boolean
}

export type AnyBlockContent =
  | HeroContent
  | TextContent
  | ImageTextContent
  | CardsContent
  | CtaContent
  | SpacerContent
  | GalleryContent
  | SliderContent
  | ContactFormContent
  | Record<string, unknown>
