<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })
useSeoMeta({ title: 'Paramètres — Admin', robots: 'noindex,nofollow' })

const { data: rawSettings } = await useFetch<Record<string, string>>('/api/admin/settings')

const form = reactive({
  site_name: rawSettings.value?.site_name ?? '',
  site_tagline: rawSettings.value?.site_tagline ?? '',
  contact_email: rawSettings.value?.contact_email ?? '',
  contact_phone: rawSettings.value?.contact_phone ?? '',
  contact_address: rawSettings.value?.contact_address ?? '',
})

const saving = ref(false)
const saved = ref(false)
const error = ref('')

async function save() {
  saving.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/settings', { method: 'PUT', body: { ...form } })
    saved.value = true
    setTimeout(() => (saved.value = false), 2500)
  } catch {
    error.value = 'Erreur lors de la sauvegarde.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="settings-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Paramètres</h1>
        <p class="page-subtitle">Informations générales du site.</p>
      </div>
      <button class="btn-save" :disabled="saving" @click="save">
        <UIcon :name="saved ? 'lucide:check' : 'lucide:save'" />
        {{ saved ? 'Sauvegardé !' : saving ? 'Sauvegarde…' : 'Sauvegarder' }}
      </button>
    </div>

    <p v-if="error" class="error-msg">{{ error }}</p>

    <div class="settings-grid">
      <div class="settings-card">
        <h2 class="card-title">
          <UIcon name="lucide:globe" />
          Identité du site
        </h2>
        <div class="field-group">
          <label class="field-label">Nom du site</label>
          <input v-model="form.site_name" type="text" class="field-input" placeholder="Archi Design" />
        </div>
        <div class="field-group">
          <label class="field-label">Tagline</label>
          <input v-model="form.site_tagline" type="text" class="field-input" placeholder="Architecture d'Exception" />
        </div>
      </div>

      <div class="settings-card">
        <h2 class="card-title">
          <UIcon name="lucide:map-pin" />
          Coordonnées
        </h2>
        <div class="field-group">
          <label class="field-label">Email de contact</label>
          <input v-model="form.contact_email" type="email" class="field-input" placeholder="contact@archidesign.com" />
        </div>
        <div class="field-group">
          <label class="field-label">Téléphone</label>
          <input v-model="form.contact_phone" type="text" class="field-input" placeholder="+228 90 00 00 00" />
        </div>
        <div class="field-group">
          <label class="field-label">Adresse</label>
          <textarea v-model="form.contact_address" rows="2" class="field-textarea" placeholder="Boulevard du 13 Janvier, Lomé, Togo" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page { max-width: 860px; }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; gap: 16px; }
.page-title { font-size: 26px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-subtitle { font-size: 14px; color: #6b7280; margin: 0; }

.btn-save {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 18px; border-radius: 8px;
  border: none; background: #111827; color: #fff;
  font-size: 13px; font-weight: 600; cursor: pointer; flex-shrink: 0;
  transition: background 0.15s;
}
.btn-save:hover:not(:disabled) { background: #1f2937; }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

.error-msg { font-size: 13px; color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; padding: 10px 14px; border-radius: 6px; margin-bottom: 20px; }

.settings-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 640px) { .settings-grid { grid-template-columns: 1fr 1fr; } }

.settings-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; }

.card-title {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 700; color: #111827;
  margin: 0 0 20px; text-transform: uppercase; letter-spacing: 0.5px;
}

.field-group { margin-bottom: 18px; }
.field-label { display: block; font-size: 12px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 7px; }
.field-input {
  width: 100%; padding: 9px 12px; border: 1px solid #e5e7eb; border-radius: 6px;
  font-size: 14px; color: #111827; font-family: inherit; outline: none; box-sizing: border-box;
  transition: border-color 0.2s;
}
.field-input:focus { border-color: #4f8ef7; }
.field-textarea {
  width: 100%; padding: 9px 12px; border: 1px solid #e5e7eb; border-radius: 6px;
  font-size: 14px; color: #111827; font-family: inherit; outline: none; resize: vertical; box-sizing: border-box;
  transition: border-color 0.2s;
}
.field-textarea:focus { border-color: #4f8ef7; }
</style>
