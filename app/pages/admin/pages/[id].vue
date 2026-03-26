<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { useBlockRegistry } from '~/composables/useBlockRegistry'
import type { AnyBlockContent } from '~/../../shared/types/blocks'
import _BlockRenderer from '~/components/blocks/BlockRenderer.vue'

const blockRendererComp = _BlockRenderer

definePageMeta({ layout: 'admin', middleware: ['admin'] })

const route = useRoute()
const pageId = Number(route.params.id)

const { BLOCK_REGISTRY, createBlock, getDefinition } = useBlockRegistry()

interface EditBlock {
  id?: number
  type: string
  content: AnyBlockContent
  isActive: boolean
  _key: string
}

const { data: page, refresh } = await useFetch(`/api/admin/pages/${pageId}`)
useSeoMeta({ title: `${page.value?.title ?? 'Page'} — Admin`, robots: 'noindex,nofollow' })

const isTemplatePage = computed(() => !!page.value?.template)
const hasOriginalTemplate = computed(() => !!page.value?.originalTemplate)
const converting = ref(false)
const restoring = ref(false)

async function convertToBlocks() {
  if (!confirm('Passer en mode Page Builder ?\n\nLes blocs par défaut reproduisant le design actuel seront créés. Vous pourrez restaurer le template d\'origine à tout moment.')) return
  converting.value = true
  try {
    await $fetch(`/api/admin/pages/${pageId}/convert`, { method: 'POST' })
    await refresh()
    editorBlocks.value = (page.value?.blocks ?? []).map((b) => ({
      id: b.id,
      type: b.type,
      content: (typeof b.content === 'string' ? JSON.parse(b.content) : b.content) as AnyBlockContent,
      isActive: Boolean(b.isActive),
      _key: `${b.id}-${b.type}`,
    }))
  } finally {
    converting.value = false
  }
}

async function restoreTemplate() {
  if (!confirm(`Restaurer le layout d'origine "${page.value?.originalTemplate}" ?\n\nTous les blocs créés dans le builder seront supprimés.`)) return
  restoring.value = true
  try {
    await $fetch(`/api/admin/pages/${pageId}/restore`, { method: 'POST' })
    await refresh()
    editorBlocks.value = []
    activeBlock.value = null
  } finally {
    restoring.value = false
  }
}

const seoForm = reactive({
  title: page.value?.title ?? '',
  metaTitle: page.value?.metaTitle ?? '',
  metaDescription: page.value?.metaDescription ?? '',
})

const editorBlocks = ref<EditBlock[]>(
  (page.value?.blocks ?? []).map((b) => ({
    id: b.id,
    type: b.type,
    content: (typeof b.content === 'string' ? JSON.parse(b.content) : b.content) as AnyBlockContent,
    isActive: Boolean(b.isActive),
    _key: `${b.id}-${b.type}`,
  }))
)

const activeBlock = ref<EditBlock | null>(null)
const addingBlock = ref(false)
const saving = ref(false)
const saved = ref(false)
const saveError = ref('')

function selectBlock(block: EditBlock) {
  activeBlock.value = block
}

function handleContentUpdate(content: AnyBlockContent) {
  if (!activeBlock.value) return
  const idx = editorBlocks.value.findIndex((b) => b._key === activeBlock.value!._key)
  if (idx !== -1) editorBlocks.value[idx].content = content
}

function addBlock(type: string) {
  const block = createBlock(type)
  const newBlock: EditBlock = { ...block, _key: `new-${Date.now()}` }
  editorBlocks.value.push(newBlock)
  addingBlock.value = false
  activeBlock.value = newBlock
}

function removeBlock(block: EditBlock) {
  if (!confirm('Supprimer ce bloc ?')) return
  editorBlocks.value = editorBlocks.value.filter((b) => b._key !== block._key)
  if (activeBlock.value?._key === block._key) activeBlock.value = null
}

function toggleBlock(block: EditBlock) {
  const idx = editorBlocks.value.findIndex((b) => b._key === block._key)
  if (idx !== -1) editorBlocks.value[idx].isActive = !editorBlocks.value[idx].isActive
}

async function save() {
  saving.value = true
  saveError.value = ''
  try {
    await $fetch(`/api/admin/pages/${pageId}`, {
      method: 'PUT',
      body: {
        title: seoForm.title || undefined,
        metaTitle: seoForm.metaTitle || undefined,
        metaDescription: seoForm.metaDescription || undefined,
      },
    })

    if (!isTemplatePage.value) {
      const savedBlocks = await $fetch<Array<{ id: number; type: string; content: unknown; order: number; isActive: boolean }>>(`/api/admin/blocks/${pageId}`, {
        method: 'PUT',
        body: {
          blocks: editorBlocks.value.map((b, i) => ({
            id: b.id ?? undefined,
            type: b.type,
            content: JSON.parse(JSON.stringify(b.content)),
            order: i,
            isActive: Boolean(b.isActive),
          })),
        },
      })
      editorBlocks.value = savedBlocks.map((b) => ({
        id: b.id,
        type: b.type,
        content: (typeof b.content === 'string' ? JSON.parse(b.content) : b.content) as AnyBlockContent,
        isActive: Boolean(b.isActive),
        _key: `${b.id}-${b.type}`,
      }))
      activeBlock.value = null
    }

    saved.value = true
    setTimeout(() => (saved.value = false), 2000)
  } catch (e: unknown) {
    const err = e as { data?: { message?: string } }
    saveError.value = err?.data?.message ?? 'Erreur lors de la sauvegarde'
    setTimeout(() => (saveError.value = ''), 4000)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="editor-shell">
    <div class="editor-topbar">
      <NuxtLink to="/admin/pages" class="back-btn">
        <UIcon name="lucide:arrow-left" />
        Pages
      </NuxtLink>
      <div class="editor-page-title">
        {{ page?.title }}
        <span v-if="isTemplatePage" class="template-badge">
          <UIcon name="lucide:layout-template" />
          Template : {{ page?.template }}
        </span>
        <span v-else-if="hasOriginalTemplate" class="blocks-badge">
          <UIcon name="lucide:blocks" />
          Page Builder
        </span>
      </div>
      <div style="display: flex; gap: 8px; align-items: center;">
        <a
          :href="`/${page?.slug === 'home' ? '' : page?.slug}`"
          target="_blank"
          class="preview-btn"
        >
          <UIcon name="lucide:external-link" />
          Voir la page
        </a>
        <button
          v-if="isTemplatePage"
          class="convert-btn"
          :disabled="converting"
          @click="convertToBlocks"
        >
          <UIcon name="lucide:wand-2" />
          {{ converting ? 'Conversion…' : 'Éditer avec le Builder' }}
        </button>
        <button
          v-if="!isTemplatePage && hasOriginalTemplate"
          class="restore-btn"
          :disabled="restoring"
          @click="restoreTemplate"
        >
          <UIcon name="lucide:rotate-ccw" />
          {{ restoring ? 'Restauration…' : 'Restaurer le layout d\'origine' }}
        </button>
        <span v-if="saveError" class="save-error">{{ saveError }}</span>
        <button class="save-btn" :class="{ error: saveError }" :disabled="saving" @click="save">
          <UIcon :name="saved ? 'lucide:check' : saveError ? 'lucide:alert-circle' : 'lucide:save'" />
          {{ saved ? 'Sauvegardé' : saving ? 'Sauvegarde…' : saveError ? 'Erreur' : 'Sauvegarder' }}
        </button>
      </div>
    </div>

    <!-- Mode Template : formulaire SEO uniquement -->
    <div v-if="isTemplatePage" class="template-editor">
      <div class="template-info">
        <UIcon name="lucide:info" />
        Cette page utilise un template Vue personnalisé. Seules les métadonnées SEO sont modifiables ici.
      </div>

      <div class="seo-form">
        <h2 class="seo-title">Métadonnées SEO</h2>
        <div class="field-group">
          <label class="field-label">Titre de la page</label>
          <input v-model="seoForm.title" type="text" class="field-input" placeholder="Titre de la page" />
        </div>
        <div class="field-group">
          <label class="field-label">Meta Title <span class="char-count">{{ seoForm.metaTitle.length }}/60</span></label>
          <input v-model="seoForm.metaTitle" type="text" class="field-input" maxlength="70" placeholder="Titre affiché dans l'onglet et Google" />
        </div>
        <div class="field-group">
          <label class="field-label">Meta Description <span class="char-count">{{ seoForm.metaDescription.length }}/160</span></label>
          <textarea v-model="seoForm.metaDescription" class="field-textarea" rows="3" maxlength="200" placeholder="Description courte pour les moteurs de recherche (150-160 caractères)" />
        </div>
        <div class="field-preview">
          <div class="preview-title">{{ seoForm.metaTitle || seoForm.title || 'Titre de la page' }}</div>
          <div class="preview-url">https://archidesign.com/{{ page?.slug }}</div>
          <div class="preview-desc">{{ seoForm.metaDescription || 'Aucune description.' }}</div>
        </div>
      </div>
    </div>

    <!-- Mode Blocks : éditeur complet -->
    <div v-else class="editor-body">
      <aside class="blocks-panel" :class="{ 'has-config': activeBlock && !addingBlock }">
        <template v-if="!activeBlock && !addingBlock">
          <div class="panel-header">
            <span class="panel-label">Blocs ({{ editorBlocks.length }})</span>
            <button class="add-btn" @click="addingBlock = true">
              <UIcon name="lucide:plus" />
            </button>
          </div>

          <VueDraggable
            v-model="editorBlocks"
            class="blocks-list"
            item-key="_key"
            handle=".drag-handle"
            ghost-class="block-ghost"
          >
            <div
              v-for="block in editorBlocks"
              :key="block._key"
              class="block-item"
              :class="{ inactive: !block.isActive }"
              @click="selectBlock(block)"
            >
              <span class="drag-handle">
                <UIcon name="lucide:grip-vertical" />
              </span>
              <UIcon :name="getDefinition(block.type).icon" class="block-type-icon" />
              <span class="block-type-label">{{ getDefinition(block.type).label }}</span>
              <div class="block-item-actions">
                <button class="item-btn" :title="block.isActive ? 'Désactiver' : 'Activer'" @click.stop="toggleBlock(block)">
                  <UIcon :name="block.isActive ? 'lucide:eye' : 'lucide:eye-off'" />
                </button>
                <button class="item-btn delete" title="Supprimer" @click.stop="removeBlock(block)">
                  <UIcon name="lucide:trash-2" />
                </button>
              </div>
            </div>
          </VueDraggable>

          <div v-if="!editorBlocks.length" class="blocks-empty">
            Aucun bloc. Ajoutez-en un.
          </div>

          <!-- SEO panel (pages blocks) -->
          <div class="seo-mini-panel">
            <div class="panel-header">
              <span class="panel-label">SEO</span>
            </div>
            <div class="seo-mini-fields">
              <input v-model="seoForm.metaTitle" type="text" class="field-input" placeholder="Meta Title" maxlength="70" />
              <textarea v-model="seoForm.metaDescription" class="field-textarea" rows="2" placeholder="Meta Description" maxlength="200" />
            </div>
          </div>
        </template>

        <template v-else-if="addingBlock">
          <div class="panel-header">
            <span class="panel-label">Choisir un type</span>
            <button class="add-btn" @click="addingBlock = false">
              <UIcon name="lucide:x" />
            </button>
          </div>
          <div class="block-types-list">
            <button
              v-for="(def, type) in BLOCK_REGISTRY"
              :key="type"
              class="block-type-item"
              @click="addBlock(type)"
            >
              <UIcon :name="def.icon" class="type-icon" />
              <span>{{ def.label }}</span>
            </button>
          </div>
        </template>

        <AdminBlockConfigPanel
          v-else-if="activeBlock"
          :block="activeBlock"
          @update:content="handleContentUpdate"
          @close="activeBlock = null"
        />
      </aside>

      <div class="preview-panel">
        <div class="preview-label">Aperçu</div>
        <div class="preview-content">
          <component :is="blockRendererComp" :blocks="editorBlocks" />
          <div v-if="!editorBlocks.length" class="preview-empty">
            <UIcon name="lucide:layout-template" />
            <p>Ajoutez des blocs pour composer votre page.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-shell {
  margin: -32px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  background: #f4f5f7;
}

.editor-topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 20px;
  height: 52px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.15s;
}
.back-btn:hover { background: #f3f4f6; color: #111827; }

.editor-page-title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}

.template-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  padding: 3px 10px;
  white-space: nowrap;
}

.blocks-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  background: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
  border-radius: 20px;
  padding: 3px 10px;
  white-space: nowrap;
}

.preview-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #fff;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  transition: all 0.15s;
}
.preview-btn:hover { background: #f3f4f6; color: #111827; border-color: #9ca3af; }

.convert-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #7c3aed;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}
.convert-btn:hover:not(:disabled) { background: #6d28d9; }
.convert-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.restore-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #fff;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}
.restore-btn:hover:not(:disabled) { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
.restore-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.save-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #4f8ef7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.save-btn:hover:not(:disabled) { background: #3b7de8; }
.save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.save-btn.error { background: #ef4444; }
.save-btn.error:hover:not(:disabled) { background: #dc2626; }

.save-error {
  font-size: 12px;
  color: #ef4444;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 4px 10px;
  white-space: nowrap;
}

/* Template mode */
.template-editor {
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
}

.template-info {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 13px;
  color: #1d4ed8;
  margin-bottom: 32px;
  line-height: 1.5;
}

.seo-form { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px; }
.seo-title { font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 24px; }

.field-group { margin-bottom: 20px; }
.field-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 8px;
}
.char-count { font-weight: 400; color: #9ca3af; }
.field-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.field-input:focus { border-color: #4f8ef7; }
.field-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  font-family: inherit;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.field-textarea:focus { border-color: #4f8ef7; }

.field-preview {
  margin-top: 24px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #f3f4f6;
}
.preview-title { font-size: 18px; color: #1a0dab; font-weight: 400; margin-bottom: 2px; }
.preview-url { font-size: 13px; color: #006621; margin-bottom: 4px; }
.preview-desc { font-size: 13px; color: #545454; line-height: 1.5; }

/* Blocks mode */
.editor-body { display: flex; flex: 1; overflow: hidden; }

.blocks-panel {
  width: 280px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.2s;
}
.blocks-panel.has-config { width: 300px; }

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid #f3f4f6;
}

.panel-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }

.add-btn {
  width: 28px; height: 28px;
  border-radius: 6px;
  border: 1.5px solid #e5e7eb;
  background: transparent;
  cursor: pointer;
  color: #374151;
  display: flex; align-items: center; justify-content: center;
}

.blocks-list { flex: 1; overflow-y: auto; padding: 8px; }

.block-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s;
  margin-bottom: 4px;
}
.block-item:hover { background: #f9fafb; border-color: #e5e7eb; }
.block-item.inactive { opacity: 0.45; }

.drag-handle { color: #d1d5db; cursor: grab; display: flex; align-items: center; flex-shrink: 0; }
.block-type-icon { color: #6b7280; flex-shrink: 0; }
.block-type-label { flex: 1; font-size: 13px; font-weight: 500; color: #374151; }
.block-item-actions { display: flex; gap: 2px; margin-left: auto; }

.item-btn {
  width: 26px; height: 26px;
  border-radius: 5px; border: none;
  background: transparent;
  cursor: pointer;
  color: #9ca3af;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px;
  transition: background 0.15s, color 0.15s;
}
.item-btn:hover { background: #f3f4f6; color: #374151; }
.item-btn.delete:hover { background: #fef2f2; color: #ef4444; }

.blocks-empty { padding: 40px 16px; text-align: center; font-size: 13px; color: #9ca3af; }

.seo-mini-panel { border-top: 1px solid #f3f4f6; flex-shrink: 0; }
.seo-mini-fields { padding: 10px; display: flex; flex-direction: column; gap: 8px; }

.block-types-list { padding: 8px; display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }

.block-type-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  transition: background 0.15s, border-color 0.15s;
  text-align: left;
}
.block-type-item:hover { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
.type-icon { color: #6b7280; }

.preview-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

.preview-label {
  padding: 8px 16px;
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f4f5f7;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.preview-content { flex: 1; overflow-y: auto; background: #fff; }

/* Limite la hauteur min des blocs dans l'aperçu admin */
.preview-content :deep(.block-hero) { min-height: 320px !important; }
.preview-content :deep(section) { scroll-snap-align: start; }

.preview-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #d1d5db;
  font-size: 14px;
  gap: 12px;
  min-height: 300px;
}

:deep(.block-ghost) { opacity: 0.4; background: #eff6ff; }
</style>
