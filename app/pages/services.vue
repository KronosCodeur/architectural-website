<template>
  <div>
    <!-- Page header -->
    <section style="background-color: var(--anthracite); padding-top: 160px; padding-bottom: 80px;">
      <div class="container-brand" style="text-align: center;">
        <div class="reveal" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--sable); margin-bottom: 20px;">
          Nos Expertises
        </div>
        <h1 class="font-heading reveal" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: white; margin-bottom: 24px;">
          Services
        </h1>
        <div class="reveal" style="width: 56px; height: 2px; background-color: var(--vert); margin: 0 auto 24px;" />
        <p class="reveal" style="font-size: 18px; color: #BDBDBD; max-width: 640px; margin: 0 auto; line-height: 1.7;">
          Découvrez l'étendue de notre savoir-faire architectural,
          du concept initial à la réalisation finale.
        </p>
      </div>
    </section>

    <!-- Service blocks -->
    <ServiceBlock
      title="Conception Architecturale"
      :paragraphs="[
        'Notre approche de la conception architecturale repose sur une compréhension profonde de vos aspirations et du contexte local. Chaque projet débute par une immersion totale dans votre vision.',
        'Du croquis préliminaire aux plans d\'exécution, nous orchestrons chaque détail pour créer des espaces qui transcendent le fonctionnel et atteignent le sublime.'
      ]"
      ctaText="Discuter de votre projet"
      image="/images/projet-villa-horizon.jpg"
      :index="0"
    >
      <template #icon>
        <SvgConception style="width: 48px; height: 48px;" />
      </template>
    </ServiceBlock>

    <ServiceBlock
      title="Gestion de Projet"
      :paragraphs="[
        'Notre expertise en gestion de projet garantit une exécution sans faille, du premier coup de crayon à la remise des clés. Nous coordonnons l\'ensemble des intervenants avec une rigueur exemplaire.',
        'Respect des délais, maîtrise budgétaire et qualité irréprochable : notre engagement sur chaque chantier, au Togo comme à l\'international.'
      ]"
      ctaText="En savoir plus"
      image="/images/projet-tour-initiale.jpg"
      :index="1"
      reversed
    >
      <template #icon>
        <SvgGestionProjet style="width: 48px; height: 48px;" />
      </template>
    </ServiceBlock>

    <ServiceBlock
      title="Développement International"
      :paragraphs="[
        'Implantés au Togo et rayonnant à l\'international, nous accompagnons des projets ambitieux sur quatre continents. Notre réseau de partenaires à Lomé, Accra, Paris et Dubaï nous confère une expertise multiculturelle unique.',
        'Chaque marché a ses spécificités réglementaires et culturelles. Notre connaissance approfondie des contextes locaux assure la réussite de vos projets partout dans le monde.'
      ]"
      ctaText="Nos implantations"
      image="/images/projet-penthouse-ciel.jpg"
      :index="2"
    >
      <template #icon>
        <SvgDeveloppement style="width: 48px; height: 48px;" />
      </template>
    </ServiceBlock>

    <ServiceBlock
      title="Design d'Intérieur"
      :paragraphs="[
        'L\'architecture d\'intérieur est l\'art de sublimer l\'espace habité. Nous créons des intérieurs qui reflètent votre identité tout en offrant un confort absolu et une esthétique intemporelle.',
        'Matériaux nobles, éclairages scénographiques, mobilier sur mesure : chaque élément est pensé pour composer une harmonie parfaite entre forme et fonction.'
      ]"
      ctaText="Découvrir nos réalisations"
      image="/images/hero-architecture.jpg"
      :index="3"
      reversed
    >
      <template #icon>
        <SvgDesignInterieur style="width: 48px; height: 48px;" />
      </template>
    </ServiceBlock>

    <!-- CTA Section -->
    <section style="background-color: var(--vert); padding-top: 100px; padding-bottom: 100px;">
      <div class="container-brand" style="text-align: center;">
        <h2 class="font-heading reveal" style="font-size: clamp(1.6rem, 3vw, 2.25rem); font-weight: 600; color: white; margin-bottom: 24px;">
          Prêt à donner vie à votre projet ?
        </h2>
        <p class="reveal" style="font-size: 17px; color: rgba(255,255,255,0.8); margin-bottom: 40px; max-width: 540px; margin-left: auto; margin-right: auto; line-height: 1.7;">
          Contactez notre équipe pour une consultation personnalisée
          et découvrez comment nous pouvons transformer votre vision en réalité.
        </p>
        <div class="reveal">
          <NuxtLink to="/contact" class="btn-outline-white" style="display: inline-flex;">
            Nous Contacter
            <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SvgConception from '~/assets/icons/icon-conception.svg'
import SvgGestionProjet from '~/assets/icons/icon-gestion-projet.svg'
import SvgDeveloppement from '~/assets/icons/icon-developpement.svg'
import SvgDesignInterieur from '~/assets/icons/icon-design-interieur.svg'

import { useStructuredData, breadcrumbSchema } from '~/composables/useStructuredData'

const pageTitle = 'Services — Archi Design | Architecture & Design'
const pageDesc = "Découvrez nos services : conception architecturale, gestion de projet, développement international et design d'intérieur. Expertise premium depuis Lomé, Togo."

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: 'https://archidesign.com/services' }],
})

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: 'https://archidesign.com/services',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
})

useStructuredData([
  breadcrumbSchema([
    { name: 'Accueil', url: 'https://archidesign.com/' },
    { name: 'Services', url: 'https://archidesign.com/services' },
  ]),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Architectural Services',
    'provider': { '@type': 'Organization', 'name': 'Archi Design', 'url': 'https://archidesign.com' },
    'areaServed': ['Togo', 'Ghana', 'France', 'United Arab Emirates'],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Services Architecturaux',
      'itemListElement': [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Conception Architecturale', 'description': 'Création de plans architecturaux sur-mesure' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Gestion de Projet', 'description': 'Supervision complète du chantier' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Développement International', 'description': 'Accompagnement stratégique pour investissements immobiliers' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': "Design d'Intérieur", 'description': "Architecture d'intérieur et mobilier sur mesure" } },
      ],
    },
  },
])

const { init } = useReveal()

onMounted(() => {
  init()
})
</script>
