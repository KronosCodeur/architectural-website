<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })
useSeoMeta({ title: 'SEO — Admin', robots: 'noindex,nofollow' })

const { data: rawSettings } = await useFetch<Record<string, string>>('/api/admin/settings')

const form = reactive({
  seo_title_suffix: rawSettings.value?.seo_title_suffix ?? '',
  seo_default_description: rawSettings.value?.seo_default_description ?? '',
  seo_og_image: rawSettings.value?.seo_og_image ?? '',
  seo_robots: rawSettings.value?.seo_robots ?? 'index,follow',
  social_twitter: rawSettings.value?.social_twitter ?? '',
  social_instagram: rawSettings.value?.social_instagram ?? '',
  social_linkedin: rawSettings.value?.social_linkedin ?? '',
  social_facebook: rawSettings.value?.social_facebook ?? '',
})

const saving = ref(false)
const saved = ref(false)
const showMediaSelector = ref(false)

async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/settings', { method: 'PUT', body: { ...form } })
    saved.value = true
    setTimeout(() => (saved.value = false), 2500)
  } finally {
    saving.value = false
  }
}

const previewTitle = computed(() =>
  `Titre de la page ${form.seo_title_suffix ? ' ' + form.seo_title_suffix : ''}`
)
</script>

<template>
  <div class="seo-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">SEO Global</h1>
        <p class="page-subtitle">Métadonnées par défaut, Open Graph et réseaux sociaux.</p>
      </div>
      <button class="btn-save" :disabled="saving" @click="save">
        <UIcon :name="saved ? 'lucide:check' : 'lucide:save'" />
        {{ saved ? 'Sauvegardé !' : saving ? 'Sauvegarde…' : 'Sauvegarder' }}
      </button>
    </div>

    <div class="seo-grid">
      <!-- Métadonnées générales -->
      <div class="seo-card">
        <h2 class="card-title">
          <UIcon name="lucide:search" />
          Métadonnées générales
        </h2>

        <div class="field-group">
          <label class="field-label">Suffixe du titre <span class="field-hint">Ajouté à la fin de chaque titre de page</span></label>
          <input v-model="form.seo_title_suffix" type="text" class="field-input" placeholder="— Archi Design" />
        </div>

        <div class="field-group">
          <label class="field-label">
            Description par défaut
            <span class="char-count">{{ form.seo_default_description.length }}/160</span>
          </label>
          <textarea v-model="form.seo_default_description" rows="3" class="field-textarea" maxlength="200" placeholder="Description affichée si une page n'en a pas de spécifique." />
        </div>

        <div class="field-group">
          <label class="field-label">Indexation robots</label>
          <select v-model="form.seo_robots" class="field-input">
            <option value="index,follow">index, follow (recommandé)</option>
            <option value="noindex,follow">noindex, follow (site privé)</option>
            <option value="noindex,nofollow">noindex, nofollow (maintenance)</option>
          </select>
        </div>

        <!-- Preview Google SERP -->
        <div class="serp-preview">
          <p class="serp-label">Aperçu Google</p>
          <div class="serp-card">
            <div class="serp-title">{{ previewTitle }}</div>
            <div class="serp-url">https://archidesign.com/</div>
            <div class="serp-desc">{{ form.seo_default_description || 'Aucune description par défaut.' }}</div>
          </div>
        </div>
      </div>

      <!-- Open Graph -->
      <div class="seo-card">
        <h2 class="card-title">
          <UIcon name="lucide:share-2" />
          Open Graph / Partage social
        </h2>

        <div class="field-group">
          <label class="field-label">Image OG par défaut <span class="field-hint">1200×630px recommandé</span></label>
          <div class="og-image-wrap">
            <div v-if="form.seo_og_image" class="og-preview">
              <NuxtImg :src="form.seo_og_image" alt="OG Image" width="320" height="168" style="width:100%;height:100%;object-fit:cover;border-radius:6px;" />
            </div>
            <div v-else class="og-placeholder">
              <UIcon name="lucide:image" />
              <span>Aucune image sélectionnée</span>
            </div>
            <div class="og-actions">
              <button class="btn-select-media" @click="showMediaSelector = true">
                <UIcon name="lucide:image-plus" />
                Choisir depuis la médiathèque
              </button>
              <input v-model="form.seo_og_image" type="text" class="field-input" placeholder="/images/og-default.jpg" style="margin-top:8px;" />
            </div>
          </div>
        </div>

        <!-- Preview card sociale -->
        <div class="social-preview">
          <p class="serp-label">Aperçu carte sociale</p>
          <div class="social-card">
            <div class="social-card-image" :style="form.seo_og_image ? { backgroundImage: `url(${form.seo_og_image})` } : {}">
              <span v-if="!form.seo_og_image">Image OG</span>
            </div>
            <div class="social-card-body">
              <div class="social-card-domain">archidesign.com</div>
              <div class="social-card-title">{{ previewTitle }}</div>
              <div class="social-card-desc">{{ form.seo_default_description.slice(0, 80) || 'Description...' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Réseaux sociaux -->
      <div class="seo-card seo-card--full">
        <h2 class="card-title">
          <UIcon name="lucide:at-sign" />
          Profils réseaux sociaux
        </h2>
        <div class="social-grid">
          <div class="field-group">
            <label class="field-label">
              <UIcon name="lucide:twitter" style="color:#1da1f2;" />
              Twitter / X
            </label>
            <input v-model="form.social_twitter" type="text" class="field-input" placeholder="@archidesign" />
          </div>
          <div class="field-group">
            <label class="field-label">
              <UIcon name="lucide:instagram" style="color:#e1306c;" />
              Instagram
            </label>
            <input v-model="form.social_instagram" type="text" class="field-input" placeholder="https://instagram.com/archidesign" />
          </div>
          <div class="field-group">
            <label class="field-label">
              <UIcon name="lucide:linkedin" style="color:#0a66c2;" />
              LinkedIn
            </label>
            <input v-model="form.social_linkedin" type="text" class="field-input" placeholder="https://linkedin.com/company/archidesign" />
          </div>
          <div class="field-group">
            <label class="field-label">
              <UIcon name="lucide:facebook" style="color:#1877f2;" />
              Facebook
            </label>
            <input v-model="form.social_facebook" type="text" class="field-input" placeholder="https://facebook.com/archidesign" />
          </div>
        </div>
      </div>
    </div>

    <AdminMediaSelector
      v-if="showMediaSelector"
      @select="(url: string) => { form.seo_og_image = url; showMediaSelector = false }"
      @close="showMediaSelector = false"
    />
  </div>
</template>

<style scoped>
.seo-page { max-width: 1100px; }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; gap: 16px; flex-wrap: wrap; }
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

.seo-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 768px) { .seo-grid { grid-template-columns: 1fr 1fr; } }

.seo-card {
  background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;
}
.seo-card--full { grid-column: 1 / -1; }

.card-title {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 700; color: #111827;
  margin: 0 0 20px; text-transform: uppercase; letter-spacing: 0.5px;
}

.field-group { margin-bottom: 18px; }
.field-label {
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 4px;
  font-size: 12px; font-weight: 600; color: #374151;
  text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 7px;
}
.field-hint { font-size: 11px; font-weight: 400; color: #9ca3af; text-transform: none; letter-spacing: 0; }
.char-count { font-size: 11px; font-weight: 400; color: #9ca3af; }

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

/* SERP Preview */
.serp-preview, .social-preview { margin-top: 20px; }
.serp-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
.serp-card { background: #f9fafb; border-radius: 8px; padding: 14px 16px; border: 1px solid #f3f4f6; }
.serp-title { font-size: 17px; color: #1a0dab; font-weight: 400; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.serp-url { font-size: 12px; color: #006621; margin-bottom: 4px; }
.serp-desc { font-size: 13px; color: #545454; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* OG image */
.og-image-wrap { display: flex; flex-direction: column; gap: 10px; }
.og-preview { width: 100%; height: 160px; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
.og-placeholder {
  width: 100%; height: 100px; border-radius: 8px; border: 2px dashed #e5e7eb;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; color: #d1d5db; font-size: 13px;
}
.btn-select-media {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; border-radius: 6px; border: 1px solid #e5e7eb;
  background: #fff; font-size: 13px; font-weight: 500; color: #374151; cursor: pointer;
  transition: all 0.15s;
}
.btn-select-media:hover { background: #f9fafb; }

/* Social card preview */
.social-card { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
.social-card-image {
  height: 140px; background: #f3f4f6; background-size: cover; background-position: center;
  display: flex; align-items: center; justify-content: center; font-size: 13px; color: #9ca3af;
}
.social-card-body { padding: 12px 14px; }
.social-card-domain { font-size: 11px; color: #9ca3af; text-transform: uppercase; margin-bottom: 4px; }
.social-card-title { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 4px; }
.social-card-desc { font-size: 12px; color: #6b7280; line-height: 1.4; }

/* Social grid */
.social-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 640px) { .social-grid { grid-template-columns: 1fr 1fr; } }
</style>
