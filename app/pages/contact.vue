<template>
  <div>
    <!-- Page header -->
    <section style="background-color: var(--anthracite); padding-top: 160px; padding-bottom: 80px;">
      <div class="container-brand" style="text-align: center;">
        <div class="reveal" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--sable); margin-bottom: 20px;">
          Nous Contacter
        </div>
        <h1 class="font-heading reveal" style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: white; margin-bottom: 24px;">
          Contact
        </h1>
        <div class="reveal" style="width: 56px; height: 2px; background-color: var(--vert); margin: 0 auto 24px;" />
        <p class="reveal" style="font-size: 18px; color: #BDBDBD; max-width: 640px; margin: 0 auto; line-height: 1.7;">
          Discutons de votre projet. Notre équipe est à votre écoute
          pour transformer votre vision en réalité architecturale.
        </p>
      </div>
    </section>

    <!-- Contact content -->
    <section class="section-padding" style="background-color: var(--ivory);">
      <div class="container-brand">
        <div class="contact-grid">

          <!-- Left: Contact info -->
          <div class="reveal-left">
            <h2 class="font-heading" style="font-size: 28px; font-weight: 600; color: var(--anthracite); margin-bottom: 32px;">
              Nos Coordonnées
            </h2>

            <!-- Address -->
            <div style="margin-bottom: 32px;">
              <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: var(--vert); margin-bottom: 12px;">
                Siège Social — Lomé
              </h3>
              <p style="font-size: 16px; color: var(--gray-text); line-height: 1.7;">
                Boulevard du 13 Janvier<br />
                Lomé, Togo
              </p>
            </div>

            <!-- Phone -->
            <div style="margin-bottom: 32px;">
              <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: var(--vert); margin-bottom: 12px;">
                Téléphone
              </h3>
              <p style="font-size: 16px; color: var(--gray-text); line-height: 1.7;">
                +228 90 00 00 00
              </p>
            </div>

            <!-- Email -->
            <div style="margin-bottom: 32px;">
              <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: var(--vert); margin-bottom: 12px;">
                Email
              </h3>
              <p style="font-size: 16px; color: var(--gray-text); line-height: 1.7;">
                contact@archidesign.com
              </p>
            </div>

            <!-- Offices -->
            <div style="margin-bottom: 32px;">
              <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: var(--vert); margin-bottom: 12px;">
                Bureaux Internationaux
              </h3>
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 16px; color: var(--gray-text); line-height: 1.7;">
                <p>Lomé, Togo — Siège</p>
                <p>Accra, Ghana</p>
                <p>Paris, France</p>
                <p>Dubaï, EAU</p>
              </div>
            </div>

            <!-- Decorative line -->
            <div style="width: 56px; height: 2px; background-color: var(--sable); margin-top: 40px;" />
          </div>

          <!-- Right: Contact form -->
          <div class="reveal-right">
            <form @submit.prevent style="display: flex; flex-direction: column; gap: 24px;">
              <div class="form-row">
                <div style="display: flex; flex-direction: column; gap: 8px; flex: 1;">
                  <label style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--anthracite);">Nom complet</label>
                  <input type="text" placeholder="Votre nom" style="padding: 14px 16px; border: 1px solid var(--sable); background: white; font-size: 15px; color: var(--anthracite); font-family: var(--font-body); outline: none; transition: border-color 0.3s;" />
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; flex: 1;">
                  <label style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--anthracite);">Email</label>
                  <input type="email" placeholder="votre@email.com" style="padding: 14px 16px; border: 1px solid var(--sable); background: white; font-size: 15px; color: var(--anthracite); font-family: var(--font-body); outline: none; transition: border-color 0.3s;" />
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px;">
                <label style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--anthracite);">Sujet</label>
                <select style="padding: 14px 16px; border: 1px solid var(--sable); background: white; font-size: 15px; color: var(--gray-text); font-family: var(--font-body); outline: none; transition: border-color 0.3s; cursor: pointer;">
                  <option value="">Sélectionnez un sujet</option>
                  <option value="conception">Conception Architecturale</option>
                  <option value="gestion">Gestion de Projet</option>
                  <option value="international">Développement International</option>
                  <option value="interieur">Design d'Intérieur</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px;">
                <label style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--anthracite);">Message</label>
                <textarea rows="6" placeholder="Décrivez votre projet..." style="padding: 14px 16px; border: 1px solid var(--sable); background: white; font-size: 15px; color: var(--anthracite); font-family: var(--font-body); outline: none; resize: vertical; transition: border-color 0.3s;" />
              </div>

              <button type="submit" class="btn-primary" style="align-self: flex-start;">
                Envoyer le message
                <svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useStructuredData, localBusinessSchema, breadcrumbSchema } from '~/composables/useStructuredData'

const pageTitle = 'Contact — Archi Design | Parlons de Votre Projet'
const pageDesc = 'Contactez Archi Design pour discuter de votre projet architectural. Siège à Lomé, bureaux à Accra, Paris et Dubaï. Consultation personnalisée.'

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: 'https://archidesign.com/contact' }],
})

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: 'https://archidesign.com/contact',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
})

useStructuredData([
  localBusinessSchema,
  breadcrumbSchema([
    { name: 'Accueil', url: 'https://archidesign.com/' },
    { name: 'Contact', url: 'https://archidesign.com/contact' },
  ]),
])

const { init } = useReveal()

onMounted(() => {
  init()
})
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;
}
.form-row {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
@media (min-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
  }
  .form-row {
    flex-direction: row;
    gap: 24px;
  }
}
input:focus,
select:focus,
textarea:focus {
  border-color: var(--vert) !important;
}
</style>
