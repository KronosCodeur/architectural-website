<script setup lang="ts">
import type { ContactFormContent } from '~/../../shared/types/blocks'

defineProps<{ content: ContactFormContent }>()

const form = reactive({ name: '', email: '', subject: '', message: '' })
const loading = ref(false)
const success = ref(false)
const error = ref('')

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    success.value = true
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch (e: unknown) {
    const err = e as { data?: { message?: string } }
    error.value = err?.data?.message ?? 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="section-padding" style="background-color: var(--ivory);">
    <div class="container-brand">
      <div class="contact-grid">
        <div>
          <h2 class="font-heading" style="font-size: 28px; font-weight: 600; color: var(--anthracite); margin-bottom: 32px;">{{ content.title || 'Nos Coordonnées' }}</h2>
          <div v-if="content.showAddress !== false" style="margin-bottom: 32px;">
            <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: var(--vert); margin-bottom: 12px;">Siège Social — Lomé</h3>
            <p style="font-size: 16px; color: var(--gray-text); line-height: 1.7;">Boulevard du 13 Janvier<br />Lomé, Togo</p>
          </div>
          <div v-if="content.showPhone !== false" style="margin-bottom: 32px;">
            <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: var(--vert); margin-bottom: 12px;">Téléphone</h3>
            <p style="font-size: 16px; color: var(--gray-text);">+228 90 00 00 00</p>
          </div>
          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: var(--vert); margin-bottom: 12px;">Email</h3>
            <p style="font-size: 16px; color: var(--gray-text);">contact@archidesign.com</p>
          </div>
          <div v-if="content.showOffices !== false">
            <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: var(--vert); margin-bottom: 12px;">Bureaux Internationaux</h3>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 16px; color: var(--gray-text);">
              <p>Lomé, Togo — Siège</p>
              <p>Accra, Ghana</p>
              <p>Paris, France</p>
              <p>Dubaï, EAU</p>
            </div>
          </div>
        </div>

        <div>
          <div v-if="success" class="success-msg">
            <UIcon name="lucide:check-circle" style="font-size: 32px; color: var(--vert); margin-bottom: 12px;" />
            <h3 style="font-size: 20px; font-weight: 600; color: var(--anthracite); margin-bottom: 8px;">Message envoyé !</h3>
            <p style="color: var(--gray-text);">Nous reviendrons vers vous dans les plus brefs délais.</p>
          </div>

          <form v-else style="display: flex; flex-direction: column; gap: 24px;" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div style="display: flex; flex-direction: column; gap: 8px; flex: 1;">
                <label class="form-label">Nom complet</label>
                <input v-model="form.name" type="text" placeholder="Votre nom" class="form-input" required />
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px; flex: 1;">
                <label class="form-label">Email</label>
                <input v-model="form.email" type="email" placeholder="votre@email.com" class="form-input" required />
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <label class="form-label">Sujet</label>
              <select v-model="form.subject" class="form-input">
                <option value="">Sélectionnez un sujet</option>
                <option value="Conception Architecturale">Conception Architecturale</option>
                <option value="Gestion de Projet">Gestion de Projet</option>
                <option value="Développement International">Développement International</option>
                <option value="Design d'Intérieur">Design d'Intérieur</option>
                <option value="Autre">Autre demande</option>
              </select>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <label class="form-label">Message</label>
              <textarea v-model="form.message" rows="6" placeholder="Décrivez votre projet..." class="form-input" style="resize: vertical;" required />
            </div>
            <p v-if="error" style="font-size: 14px; color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; padding: 10px 14px; border-radius: 4px;">{{ error }}</p>
            <button type="submit" class="btn-primary" style="align-self: flex-start;" :disabled="loading">
              {{ loading ? 'Envoi en cours…' : 'Envoyer le message' }}
              <svg v-if="!loading" style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid { display: grid; grid-template-columns: 1fr; gap: 64px; }
.form-row { display: flex; flex-direction: column; gap: 24px; }
.form-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--anthracite); }
.form-input { padding: 14px 16px; border: 1px solid var(--sable); background: white; font-size: 15px; color: var(--anthracite); font-family: inherit; outline: none; transition: border-color 0.3s; }
.form-input:focus { border-color: var(--vert); }
.success-msg { text-align: center; padding: 60px 24px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; }
@media (min-width: 1024px) {
  .contact-grid { grid-template-columns: 1fr 1.2fr; gap: 80px; }
  .form-row { flex-direction: row; }
}
</style>
