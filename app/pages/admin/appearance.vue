<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })
useSeoMeta({ title: 'Apparence — Admin', robots: 'noindex,nofollow' })

const { data: rawSettings } = await useFetch<Record<string, string>>('/api/admin/settings')

const colors = reactive({
  theme_color_vert: rawSettings.value?.theme_color_vert ?? '#5C7A5C',
  theme_color_anthracite: rawSettings.value?.theme_color_anthracite ?? '#2C2C2C',
  theme_color_sable: rawSettings.value?.theme_color_sable ?? '#C4B49A',
  theme_color_ivory: rawSettings.value?.theme_color_ivory ?? '#F5F0E8',
})

const branding = reactive({
  logo_url: rawSettings.value?.logo_url ?? '',
  favicon_url: rawSettings.value?.favicon_url ?? '',
})

const saving = ref(false)
const saved = ref(false)
const uploadingLogo = ref(false)
const uploadingFavicon = ref(false)
const logoInput = ref<HTMLInputElement | null>(null)
const faviconInput = ref<HTMLInputElement | null>(null)

const COLOR_DEFS = [
  { key: 'theme_color_vert' as const, label: 'Couleur accent', desc: 'Boutons, CTAs, icônes, soulignements', sample: 'CTA' },
  { key: 'theme_color_anthracite' as const, label: 'Anthracite', desc: 'Headers, fonds sombres, textes forts', sample: 'Titre' },
  { key: 'theme_color_sable' as const, label: 'Sable', desc: 'Sous-titres, eyebrows, détails', sample: 'Label' },
  { key: 'theme_color_ivory' as const, label: 'Ivory', desc: 'Fonds de sections claires', sample: 'Fond' },
]

async function uploadFile(file: File, target: 'logo' | 'favicon') {
  const ref = target === 'logo' ? uploadingLogo : uploadingFavicon
  ref.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)
    const result = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: formData })
    if (target === 'logo') branding.logo_url = result.url
    else branding.favicon_url = result.url
  } finally {
    ref.value = false
  }
}

function onLogoChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) uploadFile(file, 'logo')
}

function onFaviconChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) uploadFile(file, 'favicon')
}

function applyColorsToDOM() {
  const root = document.documentElement
  root.style.setProperty('--vert', colors.theme_color_vert)
  root.style.setProperty('--anthracite', colors.theme_color_anthracite)
  root.style.setProperty('--sable', colors.theme_color_sable)
  root.style.setProperty('--ivory', colors.theme_color_ivory)
}

watch(colors, applyColorsToDOM, { deep: true })

async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/settings', {
      method: 'PUT',
      body: { ...colors, ...branding },
    })
    applyColorsToDOM()
    await refreshNuxtData('site-settings')
    saved.value = true
    setTimeout(() => (saved.value = false), 2500)
  } finally {
    saving.value = false
  }
}

function reset() {
  colors.theme_color_vert = '#5C7A5C'
  colors.theme_color_anthracite = '#2C2C2C'
  colors.theme_color_sable = '#C4B49A'
  colors.theme_color_ivory = '#F5F0E8'
}
</script>

<template>
  <div class="appearance-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Apparence</h1>
        <p class="page-subtitle">Couleurs, logo et identité visuelle du site.</p>
      </div>
      <div class="header-actions">
        <button class="btn-reset" @click="reset">
          <UIcon name="lucide:rotate-ccw" />
          Réinitialiser
        </button>
        <button class="btn-save" :disabled="saving" @click="save">
          <UIcon :name="saved ? 'lucide:check' : 'lucide:save'" />
          {{ saved ? 'Sauvegardé !' : saving ? 'Sauvegarde…' : 'Sauvegarder' }}
        </button>
      </div>
    </div>

    <div class="appearance-grid">
      <!-- Couleurs -->
      <div class="card">
        <h2 class="card-title">
          <UIcon name="lucide:palette" />
          Palette de couleurs
        </h2>
        <p class="card-hint">Les modifications sont appliquées en temps réel sur le site après sauvegarde.</p>

        <div class="color-list">
          <div v-for="def in COLOR_DEFS" :key="def.key" class="color-row">
            <label :for="`picker-${def.key}`" class="color-swatch-btn">
              <span class="color-swatch" :style="{ background: colors[def.key] }" />
              <input
                :id="`picker-${def.key}`"
                v-model="colors[def.key]"
                type="color"
                class="color-hidden-input"
              />
            </label>
            <div class="color-meta">
              <span class="color-name">{{ def.label }}</span>
              <span class="color-desc">{{ def.desc }}</span>
            </div>
            <div class="color-controls">
              <input
                v-model="colors[def.key]"
                type="text"
                class="hex-input"
                maxlength="7"
              />
              <span class="color-badge" :style="{ background: colors[def.key], color: def.key === 'theme_color_ivory' || def.key === 'theme_color_sable' ? '#333' : '#fff' }">
                {{ def.sample }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview live -->
      <div class="card">
        <h2 class="card-title">
          <UIcon name="lucide:monitor" />
          Aperçu temps réel
        </h2>
        <div
          class="preview-site"
          :style="{
            '--p-vert': colors.theme_color_vert,
            '--p-anthracite': colors.theme_color_anthracite,
            '--p-sable': colors.theme_color_sable,
            '--p-ivory': colors.theme_color_ivory,
          }"
        >
          <div class="p-nav">
            <span class="p-logo">Archi Design</span>
            <div class="p-links">
              <span>Services</span><span>Projets</span><span>Contact</span>
            </div>
          </div>
          <div class="p-hero">
            <div class="p-eyebrow">Cabinet d'Architecture</div>
            <div class="p-h1">Excellence &amp; Innovation</div>
            <div class="p-line" />
            <button class="p-cta">Nos projets</button>
          </div>
          <div class="p-section">
            <div class="p-tag">Nos Services</div>
            <div class="p-cards">
              <div v-for="i in 3" :key="i" class="p-card">
                <div class="p-card-dot" />
                <span>Service {{ i }}</span>
              </div>
            </div>
          </div>
          <div class="p-cta-section">
            <span>Démarrer un projet</span>
            <button class="p-cta-btn">Contact</button>
          </div>
        </div>
      </div>

      <!-- Logo & Favicon -->
      <div class="card card--full">
        <h2 class="card-title">
          <UIcon name="lucide:image" />
          Logo &amp; Favicon
        </h2>
        <div class="branding-grid">
          <!-- Logo -->
          <div class="branding-item">
            <p class="branding-label">Logo principal <span class="field-hint">SVG ou PNG transparent recommandé</span></p>
            <div class="logo-preview-wrap">
              <div v-if="branding.logo_url" class="logo-preview">
                <NuxtImg :src="branding.logo_url" alt="Logo" height="64" style="max-height:64px;max-width:240px;object-fit:contain;" />
              </div>
              <div v-else class="logo-placeholder">
                <UIcon name="lucide:image-off" />
                <span>Aucun logo</span>
              </div>
            </div>
            <div class="upload-row">
              <button class="btn-upload" :disabled="uploadingLogo" @click="logoInput?.click()">
                <UIcon :name="uploadingLogo ? 'lucide:loader-2' : 'lucide:upload'" />
                {{ uploadingLogo ? 'Upload…' : 'Uploader un logo' }}
              </button>
              <input ref="logoInput" type="file" accept="image/*" class="file-hidden" @change="onLogoChange" />
              <input v-model="branding.logo_url" type="text" class="field-input" placeholder="/uploads/logo.svg" />
            </div>
          </div>

          <!-- Favicon -->
          <div class="branding-item">
            <p class="branding-label">Favicon <span class="field-hint">32×32px ICO ou PNG recommandé</span></p>
            <div class="logo-preview-wrap">
              <div v-if="branding.favicon_url" class="logo-preview favicon-preview">
                <NuxtImg :src="branding.favicon_url" alt="Favicon" width="32" height="32" style="object-fit:contain;" />
              </div>
              <div v-else class="logo-placeholder logo-placeholder--sm">
                <UIcon name="lucide:globe" />
                <span>Aucun favicon</span>
              </div>
            </div>
            <div class="upload-row">
              <button class="btn-upload" :disabled="uploadingFavicon" @click="faviconInput?.click()">
                <UIcon :name="uploadingFavicon ? 'lucide:loader-2' : 'lucide:upload'" />
                {{ uploadingFavicon ? 'Upload…' : 'Uploader un favicon' }}
              </button>
              <input ref="faviconInput" type="file" accept="image/*,.ico" class="file-hidden" @change="onFaviconChange" />
              <input v-model="branding.favicon_url" type="text" class="field-input" placeholder="/uploads/favicon.ico" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appearance-page { max-width: 1100px; }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; gap: 16px; flex-wrap: wrap; }
.page-title { font-size: 26px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-subtitle { font-size: 14px; color: #6b7280; margin: 0; }
.header-actions { display: flex; gap: 10px; flex-wrap: wrap; }

.btn-save {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 18px; border-radius: 8px;
  border: none; background: #111827; color: #fff;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s;
}
.btn-save:hover:not(:disabled) { background: #1f2937; }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-reset {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px; border-radius: 8px;
  border: 1px solid #e5e7eb; background: #fff;
  font-size: 13px; font-weight: 500; color: #6b7280; cursor: pointer;
  transition: all 0.15s;
}
.btn-reset:hover { background: #f9fafb; }

.appearance-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 768px) { .appearance-grid { grid-template-columns: 1fr 1fr; } }

.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; }
.card--full { grid-column: 1 / -1; }

.card-title {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 700; color: #111827;
  margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.5px;
}
.card-hint { font-size: 12px; color: #9ca3af; margin: 0 0 20px; }

/* Color rows */
.color-list { display: flex; flex-direction: column; gap: 14px; }
.color-row { display: flex; align-items: center; gap: 14px; }

.color-swatch-btn {
  width: 48px; height: 48px; border-radius: 10px;
  border: 2px solid #e5e7eb; overflow: hidden;
  cursor: pointer; flex-shrink: 0; position: relative;
  transition: border-color 0.2s; display: block;
}
.color-swatch-btn:hover { border-color: #9ca3af; }
.color-swatch { position: absolute; inset: 0; pointer-events: none; }
.color-hidden-input { opacity: 0; position: absolute; inset: 0; width: 100%; height: 100%; cursor: pointer; border: none; padding: 0; }

.color-meta { flex: 1; min-width: 0; }
.color-name { display: block; font-size: 13px; font-weight: 600; color: #111827; }
.color-desc { display: block; font-size: 11px; color: #9ca3af; margin-top: 1px; }

.color-controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.hex-input {
  width: 80px; padding: 6px 8px; border: 1px solid #e5e7eb; border-radius: 6px;
  font-size: 12px; font-family: monospace; color: #374151; outline: none; text-align: center;
  transition: border-color 0.2s;
}
.hex-input:focus { border-color: #4f8ef7; }
.color-badge {
  font-size: 11px; font-weight: 700; padding: 4px 10px;
  border-radius: 20px; white-space: nowrap; flex-shrink: 0;
}

/* Live preview */
.preview-site { border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb; font-size: 11px; }

.p-nav {
  background: var(--p-anthracite);
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 16px;
}
.p-logo { color: #fff; font-weight: 700; font-size: 12px; letter-spacing: 0.05em; }
.p-links { display: flex; gap: 10px; }
.p-links span { color: rgba(255,255,255,0.6); font-size: 10px; cursor: default; }

.p-hero {
  background: var(--p-anthracite);
  padding: 24px 16px 28px;
  display: flex; flex-direction: column; align-items: center; text-align: center;
}
.p-eyebrow { color: var(--p-sable); font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 8px; }
.p-h1 { color: #fff; font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.p-line { width: 32px; height: 2px; background: var(--p-vert); margin-bottom: 14px; }
.p-cta {
  background: var(--p-vert); color: #fff; border: none; cursor: default;
  padding: 8px 18px; border-radius: 2px; font-size: 10px; font-weight: 600;
}

.p-section { background: var(--p-ivory); padding: 18px 16px; }
.p-tag { font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--p-vert); font-weight: 600; margin-bottom: 12px; text-align: center; }
.p-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.p-card {
  background: #fff; border: 1px solid #e5e7eb; border-radius: 6px;
  padding: 10px 6px; display: flex; flex-direction: column; align-items: center; gap: 5px;
}
.p-card-dot { width: 20px; height: 20px; border-radius: 50%; background: var(--p-vert); opacity: 0.4; }
.p-card span { font-size: 9px; color: var(--p-anthracite); font-weight: 600; }

.p-cta-section {
  background: var(--p-vert); padding: 14px 16px;
  display: flex; justify-content: space-between; align-items: center;
  color: #fff; font-size: 11px; font-weight: 600;
}
.p-cta-btn {
  background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.7);
  padding: 5px 12px; border-radius: 4px; font-size: 10px; font-weight: 600; cursor: default;
}

/* Branding */
.branding-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 640px) { .branding-grid { grid-template-columns: 1fr 1fr; } }

.branding-item {}
.branding-label {
  font-size: 12px; font-weight: 600; color: #374151;
  text-transform: uppercase; letter-spacing: 0.4px; margin: 0 0 10px;
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
}
.field-hint { font-size: 11px; font-weight: 400; color: #9ca3af; text-transform: none; letter-spacing: 0; }

.logo-preview-wrap { margin-bottom: 12px; }
.logo-preview {
  background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;
  padding: 16px; display: flex; align-items: center; justify-content: center; min-height: 80px;
}
.favicon-preview { min-height: 56px; max-width: 80px; }
.logo-placeholder {
  background: #f9fafb; border: 2px dashed #e5e7eb; border-radius: 8px;
  padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; color: #d1d5db; font-size: 12px; min-height: 80px;
}
.logo-placeholder--sm { min-height: 56px; max-width: 80px; }

.upload-row { display: flex; flex-direction: column; gap: 8px; }
.btn-upload {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; border-radius: 6px; border: 1px solid #e5e7eb;
  background: #fff; font-size: 13px; font-weight: 500; color: #374151; cursor: pointer;
  transition: all 0.15s; align-self: flex-start;
}
.btn-upload:hover:not(:disabled) { background: #f9fafb; }
.btn-upload:disabled { opacity: 0.6; cursor: not-allowed; }
.file-hidden { display: none; }

.field-input {
  width: 100%; padding: 9px 12px; border: 1px solid #e5e7eb; border-radius: 6px;
  font-size: 13px; color: #111827; font-family: inherit; outline: none; box-sizing: border-box;
  transition: border-color 0.2s;
}
.field-input:focus { border-color: #4f8ef7; }
</style>
