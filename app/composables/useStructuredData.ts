/**
 * Injects JSON-LD structured data into the page <head>.
 * Supports LocalBusiness, Organization, WebSite, BreadcrumbList, etc.
 */
export function useStructuredData(data: Record<string, unknown> | Record<string, unknown>[]) {
  const items = Array.isArray(data) ? data : [data]
  useHead({
    script: items.map((item) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(item),
    })),
  })
}

/** Organization schema — used on every page via default layout */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Archi Design',
  'alternateName': 'AD Architecture',
  'url': 'https://archidesign.com',
  'logo': 'https://archidesign.com/favicon.svg',
  'description': "Cabinet d'architecture premium basé à Lomé, Togo. Conception architecturale, gestion de projet et développement international.",
  'foundingDate': '2001',
  'numberOfEmployees': { '@type': 'QuantitativeValue', 'minValue': 25, 'maxValue': 50 },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Boulevard du 13 Janvier',
    'addressLocality': 'Lomé',
    'addressCountry': 'TG',
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+228-90-00-00-00',
    'contactType': 'customer service',
    'email': 'contact@archidesign.com',
    'availableLanguage': ['French', 'English'],
  },
  'sameAs': [],
}

/** LocalBusiness schema — more detailed, for contact & about pages */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ArchitectureFirm',
  'name': 'Archi Design',
  'image': 'https://archidesign.com/images/hero-architecture.jpg',
  'url': 'https://archidesign.com',
  '@id': 'https://archidesign.com/#business',
  'description': "Cabinet d'architecture premium basé à Lomé, Togo. Conception architecturale sur-mesure, gestion de projet et développement international. Plus de 120 projets livrés dans 15 pays.",
  'telephone': '+228-90-00-00-00',
  'email': 'contact@archidesign.com',
  'priceRange': '$$$',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Boulevard du 13 Janvier',
    'addressLocality': 'Lomé',
    'addressRegion': 'Maritime',
    'addressCountry': 'TG',
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 6.1375,
    'longitude': 1.2123,
  },
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    'opens': '08:00',
    'closes': '18:00',
  },
  'areaServed': [
    { '@type': 'Country', 'name': 'Togo' },
    { '@type': 'Country', 'name': 'Ghana' },
    { '@type': 'Country', 'name': 'France' },
    { '@type': 'Country', 'name': 'United Arab Emirates' },
  ],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Services Architecturaux',
    'itemListElement': [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Conception Architecturale' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Gestion de Projet' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Développement International' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': "Design d'Intérieur" } },
    ],
  },
}

/** WebSite schema with SearchAction */
export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'Archi Design',
  'url': 'https://archidesign.com',
  'inLanguage': 'fr',
}

/** Helper to build BreadcrumbList */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  }
}
