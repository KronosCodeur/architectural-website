interface DefaultBlock {
  type: string
  content: Record<string, unknown>
  order: number
  isActive: boolean
}

const HOME_BLOCKS: DefaultBlock[] = [
  {
    type: `hero`,
    order: 0,
    isActive: true,
    content: {
      title: `Architecture d'Exception`,
      subtitle: `Depuis Lomé, Togo, nous concevons des espaces qui transcendent le temps et les frontières.`,
      ctaText: `Découvrir nos projets`,
      ctaUrl: `/projets`,
      backgroundImage: `/images/hero-architecture.jpg`,
      overlay: true,
      overlayOpacity: 0.5,
      textAlign: `center`,
      minHeight: `100vh`,
    },
  },
  {
    type: `cards`,
    order: 1,
    isActive: true,
    content: {
      title: `Nos Expertises`,
      subtitle: `Un savoir-faire pluridisciplinaire au service de vos projets les plus ambitieux.`,
      columns: 4,
      cards: [
        {
          icon: `lucide:drafting-compass`,
          title: `Conception Architecturale`,
          description: `Du croquis préliminaire aux plans finaux, chaque détail pensé pour l'excellence.`,
          link: `/services`,
        },
        {
          icon: `lucide:gantt-chart`,
          title: `Gestion de Projet`,
          description: `Respect des délais, maîtrise budgétaire et qualité irréprochable sur chaque chantier.`,
          link: `/services`,
        },
        {
          icon: `lucide:globe`,
          title: `Développement International`,
          description: `Présence sur quatre continents, expertise des contextes locaux et réglementaires.`,
          link: `/services`,
        },
        {
          icon: `lucide:layers`,
          title: `Design d'Intérieur`,
          description: `Des intérieurs qui reflètent votre identité avec matériaux nobles et éclairages scénographiques.`,
          link: `/services`,
        },
      ],
    },
  },
  {
    type: `gallery`,
    order: 2,
    isActive: true,
    content: {
      title: `Nos Réalisations`,
      columns: 3,
      images: [
        { src: `/images/projet-villa-horizon.jpg`, alt: `Villa Horizon - Cote d'Azur`, caption: `Villa L'Horizon` },
        { src: `/images/projet-tour-initiale.jpg`, alt: `Tour Initiale - Geneve`, caption: `Tour Initiale` },
        { src: `/images/projet-penthouse-ciel.jpg`, alt: `Penthouse Ciel - Dubai`, caption: `Penthouse Ciel` },
        { src: `/images/hero-architecture.jpg`, alt: `Residence Palmier - Lome`, caption: `Résidence Palmier` },
        { src: `/images/projet-tour-initiale.jpg`, alt: `Centre Affaires Etoile - Accra`, caption: `Centre Affaires Étoile` },
        { src: `/images/projet-villa-horizon.jpg`, alt: `Villa Serenite - Paris`, caption: `Villa Sérénité` },
      ],
    },
  },
  {
    type: `cta`,
    order: 3,
    isActive: true,
    content: {
      title: `Votre Vision, Notre Expertise`,
      subtitle: `Discutons de votre projet architectural. Notre équipe est à votre écoute.`,
      buttonText: `Nous Contacter`,
      buttonUrl: `/contact`,
      background: `brand`,
    },
  },
]

const SERVICES_BLOCKS: DefaultBlock[] = [
  {
    type: `hero`,
    order: 0,
    isActive: true,
    content: {
      title: `Nos Services`,
      subtitle: `Découvrez notre savoir-faire architectural, du concept initial à la réalisation finale.`,
      ctaText: `Discuter de votre projet`,
      ctaUrl: `/contact`,
      backgroundImage: `/images/projet-villa-horizon.jpg`,
      overlay: true,
      overlayOpacity: 0.55,
      textAlign: `center`,
      minHeight: `60vh`,
    },
  },
  {
    type: `image_text`,
    order: 1,
    isActive: true,
    content: {
      title: `Conception Architecturale`,
      content: `<p>Notre approche repose sur une compréhension profonde de vos aspirations. Chaque projet débute par une immersion totale dans votre vision.</p><p>Du croquis préliminaire aux plans finaux, nous orchestrons chaque détail pour créer des espaces qui atteignent le sublime.</p>`,
      image: `/images/projet-villa-horizon.jpg`,
      imageAlt: `Conception Architecturale - Archi Design`,
      layout: `image-left`,
      ctaText: `Discuter de votre projet`,
      ctaUrl: `/contact`,
    },
  },
  {
    type: `image_text`,
    order: 2,
    isActive: true,
    content: {
      title: `Gestion de Projet`,
      content: `<p>Notre expertise garantit une exécution sans faille, du premier coup de crayon à la remise des clés.</p><p>Respect des délais, maîtrise budgétaire et qualité irréprochable : notre engagement sur chaque chantier.</p>`,
      image: `/images/projet-tour-initiale.jpg`,
      imageAlt: `Gestion de Projet - Archi Design`,
      layout: `image-right`,
      ctaText: `En savoir plus`,
      ctaUrl: `/contact`,
    },
  },
  {
    type: `image_text`,
    order: 3,
    isActive: true,
    content: {
      title: `Développement International`,
      content: `<p>Implantés au Togo et rayonnant à l'international, nous accompagnons des projets ambitieux sur quatre continents.</p><p>Notre connaissance des contextes locaux assure la réussite de vos projets.</p>`,
      image: `/images/projet-penthouse-ciel.jpg`,
      imageAlt: `Développement International - Archi Design`,
      layout: `image-left`,
      ctaText: `Nos implantations`,
      ctaUrl: `/contact`,
    },
  },
  {
    type: `image_text`,
    order: 4,
    isActive: true,
    content: {
      title: `Design d'Intérieur`,
      content: `<p>L'architecture d'intérieur est l'art de sublimer l'espace habité. Nous créons des intérieurs qui reflètent votre identité.</p><p>Matériaux nobles, éclairages scénographiques, mobilier sur mesure : une harmonie parfaite.</p>`,
      image: `/images/hero-architecture.jpg`,
      imageAlt: `Design d'Interieur - Archi Design`,
      layout: `image-right`,
      ctaText: `Découvrir nos réalisations`,
      ctaUrl: `/projets`,
    },
  },
  {
    type: `cta`,
    order: 5,
    isActive: true,
    content: {
      title: `Prêt à donner vie à votre projet ?`,
      subtitle: `Contactez notre équipe pour une consultation personnalisée.`,
      buttonText: `Nous Contacter`,
      buttonUrl: `/contact`,
      background: `brand`,
    },
  },
]

const PROJETS_BLOCKS: DefaultBlock[] = [
  {
    type: `hero`,
    order: 0,
    isActive: true,
    content: {
      title: `Nos Projets`,
      subtitle: `Une sélection de nos réalisations les plus emblématiques, du Togo à l'international.`,
      ctaText: `Nous Contacter`,
      ctaUrl: `/contact`,
      backgroundImage: `/images/projet-penthouse-ciel.jpg`,
      overlay: true,
      overlayOpacity: 0.5,
      textAlign: `center`,
      minHeight: `60vh`,
    },
  },
  {
    type: `gallery`,
    order: 1,
    isActive: true,
    content: {
      title: `Réalisations`,
      columns: 3,
      images: [
        { src: `/images/projet-villa-horizon.jpg`, alt: `Villa Horizon - Cote d'Azur, France`, caption: `Villa L'Horizon - Résidentiel` },
        { src: `/images/projet-tour-initiale.jpg`, alt: `Tour Initiale - Geneve, Suisse`, caption: `Tour Initiale - Commercial` },
        { src: `/images/projet-penthouse-ciel.jpg`, alt: `Penthouse Ciel - Dubai, EAU`, caption: `Penthouse Ciel - Résidentiel` },
        { src: `/images/hero-architecture.jpg`, alt: `Residence Palmier - Lome, Togo`, caption: `Résidence Palmier - Résidentiel` },
        { src: `/images/projet-tour-initiale.jpg`, alt: `Centre Affaires Etoile - Accra, Ghana`, caption: `Centre Affaires Étoile - Commercial` },
        { src: `/images/projet-villa-horizon.jpg`, alt: `Villa Serenite - Paris, France`, caption: `Villa Sérénité - Résidentiel` },
      ],
    },
  },
  {
    type: `cta`,
    order: 2,
    isActive: true,
    content: {
      title: `Vous avez un projet en tête ?`,
      subtitle: `Parlez-nous de votre vision, nous la transformons en réalité.`,
      buttonText: `Nous Contacter`,
      buttonUrl: `/contact`,
      background: `brand`,
    },
  },
]

const A_PROPOS_BLOCKS: DefaultBlock[] = [
  {
    type: `hero`,
    order: 0,
    isActive: true,
    content: {
      title: `À Propos`,
      subtitle: `Depuis le Togo, Archi Design repousse les frontières de l'architecture contemporaine.`,
      ctaText: `Discuter de votre projet`,
      ctaUrl: `/contact`,
      backgroundImage: `/images/hero-architecture.jpg`,
      overlay: true,
      overlayOpacity: 0.5,
      textAlign: `center`,
      minHeight: `60vh`,
    },
  },
  {
    type: `image_text`,
    order: 1,
    isActive: true,
    content: {
      title: `25 Ans d'Excellence Architecturale`,
      content: `<p>Fondé à Lomé, Archi Design est né de la conviction qu'une architecture d'exception peut émerger de n'importe quel coin du monde.</p><p>Notre équipe a livré plus de 120 projets dans 15 pays. De Lomé à Paris, chaque réalisation porte notre signature.</p>`,
      image: `/images/hero-architecture.jpg`,
      imageAlt: `Archi Design - 25 ans excellence architecturale`,
      layout: `image-left`,
      ctaText: ``,
      ctaUrl: ``,
    },
  },
  {
    type: `cards`,
    order: 2,
    isActive: true,
    content: {
      title: `Ce Qui Nous Guide`,
      subtitle: `Quatre valeurs fondamentales au coeur de chaque réalisation.`,
      columns: 4,
      cards: [
        {
          icon: `lucide:diamond`,
          title: `Excellence`,
          description: `Nous visons la perfection dans la conception, l'exécution et la livraison de chaque projet.`,
          link: ``,
        },
        {
          icon: `lucide:lightbulb`,
          title: `Innovation`,
          description: `Nous repoussons les limites du design en intégrant les technologies les plus avancées.`,
          link: ``,
        },
        {
          icon: `lucide:shield-check`,
          title: `Intégrité`,
          description: `Transparence et respect des engagements au coeur de chaque collaboration.`,
          link: ``,
        },
        {
          icon: `lucide:leaf`,
          title: `Durabilité`,
          description: `Des solutions écoresponsables pour un impact positif sur l'environnement.`,
          link: ``,
        },
      ],
    },
  },
  {
    type: `cta`,
    order: 3,
    isActive: true,
    content: {
      title: `Une Vision, Un Engagement`,
      subtitle: `Rejoignez les 120+ clients qui nous ont fait confiance à travers le monde.`,
      buttonText: `Démarrer un projet`,
      buttonUrl: `/contact`,
      background: `dark`,
    },
  },
]

const CONTACT_BLOCKS: DefaultBlock[] = [
  {
    type: `hero`,
    order: 0,
    isActive: true,
    content: {
      title: `Contact`,
      subtitle: `Discutons de votre projet. Notre équipe est à votre écoute.`,
      ctaText: ``,
      ctaUrl: ``,
      backgroundImage: `/images/hero-architecture.jpg`,
      overlay: true,
      overlayOpacity: 0.6,
      textAlign: `center`,
      minHeight: `50vh`,
    },
  },
  {
    type: `contact_form`,
    order: 1,
    isActive: true,
    content: {
      showAddress: true,
      showPhone: true,
      showOffices: true,
    },
  },
]

const TEMPLATE_BLOCKS: Record<string, DefaultBlock[]> = {
  home: HOME_BLOCKS,
  services: SERVICES_BLOCKS,
  projets: PROJETS_BLOCKS,
  'a-propos': A_PROPOS_BLOCKS,
  contact: CONTACT_BLOCKS,
}

export function getDefaultBlocks(templateName: string): DefaultBlock[] {
  return TEMPLATE_BLOCKS[templateName] ?? []
}
