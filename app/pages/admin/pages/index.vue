<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })
useSeoMeta({ title: 'Pages — Admin', robots: 'noindex,nofollow' })

const { data: pages, refresh } = await useFetch('/api/admin/pages')

const creating = ref(false)
const newTitle = ref('')
const newSlug = ref('')
const saving = ref(false)

watch(newTitle, (val) => {
  newSlug.value = val
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
})

async function createPage() {
  if (!newTitle.value || !newSlug.value) return
  saving.value = true
  try {
    await $fetch('/api/admin/pages', { method: 'POST', body: { title: newTitle.value, slug: newSlug.value } })
    newTitle.value = ''
    newSlug.value = ''
    creating.value = false
    await refresh()
  } finally {
    saving.value = false
  }
}

async function toggleActive(id: number, current: boolean) {
  await $fetch(`/api/admin/pages/${id}`, { method: 'PUT', body: { isActive: !current } })
  await refresh()
}

async function deletePage(id: number, title: string) {
  if (!confirm(`Supprimer la page "${title}" ?`)) return
  await $fetch(`/api/admin/pages/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div class="pages-list">
    <div class="page-header">
      <div>
        <h1 class="page-title">Pages</h1>
        <p class="page-subtitle">{{ pages?.length ?? 0 }} page(s)</p>
      </div>
      <button class="btn-new" @click="creating = true">
        <UIcon name="lucide:plus" />
        Nouvelle page
      </button>
    </div>

    <div v-if="creating" class="create-form">
      <h3 class="form-title">Nouvelle page</h3>
      <div class="form-row">
        <div class="field">
          <label class="field-label">Titre</label>
          <input v-model="newTitle" class="field-input" placeholder="À propos" @keyup.enter="createPage" />
        </div>
        <div class="field">
          <label class="field-label">Slug URL</label>
          <input v-model="newSlug" class="field-input" placeholder="a-propos" />
        </div>
      </div>
      <div class="form-actions">
        <button class="btn-cancel" @click="creating = false">Annuler</button>
        <button class="btn-save" :disabled="saving || !newTitle || !newSlug" @click="createPage">
          {{ saving ? 'Création…' : 'Créer la page' }}
        </button>
      </div>
    </div>

    <div v-if="!pages?.length" class="empty-state">
      <UIcon name="lucide:file-plus" class="empty-icon" />
      <p>Aucune page. Créez votre première page.</p>
    </div>

    <div v-else class="pages-table">
      <div class="table-header">
        <span>Titre</span>
        <span>Slug</span>
        <span>Statut</span>
        <span>Actions</span>
      </div>
      <div v-for="page in pages" :key="page.id" class="table-row">
        <span class="row-title">
          {{ page.title }}
          <span v-if="page.template" class="mode-badge template-mode">Template</span>
          <span v-else class="mode-badge builder-mode">Builder</span>
        </span>
        <span class="row-slug">/{{ page.slug }}</span>
        <span>
          <button
            class="status-badge"
            :class="page.isActive ? 'active' : 'inactive'"
            @click="toggleActive(page.id, page.isActive)"
          >
            {{ page.isActive ? 'Publié' : 'Masqué' }}
          </button>
        </span>
        <span class="row-actions">
          <NuxtLink :to="`/admin/pages/${page.id}`" class="action-btn edit">
            <UIcon name="lucide:pencil" />
            Éditer
          </NuxtLink>
          <a :href="`/${page.slug}`" target="_blank" class="action-btn view">
            <UIcon name="lucide:external-link" />
          </a>
          <button class="action-btn delete" @click="deletePage(page.id, page.title)">
            <UIcon name="lucide:trash-2" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pages-list { max-width: 1100px; }

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-title { font-size: 26px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-subtitle { font-size: 14px; color: #6b7280; margin: 0; }

.btn-new {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 16px;
  background: #4f8ef7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-new:hover { background: #3b7de8; }

.create-form {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.form-title { font-size: 15px; font-weight: 600; color: #111827; margin: 0 0 16px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 12px; font-weight: 600; color: #374151; }

.field-input {
  height: 38px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  color: #111827;
  outline: none;
  font-family: inherit;
}

.field-input:focus { border-color: #4f8ef7; }

.form-actions { display: flex; gap: 8px; justify-content: flex-end; }

.btn-cancel {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  color: #374151;
}

.btn-save {
  padding: 8px 16px;
  background: #4f8ef7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

.empty-state {
  text-align: center;
  padding: 60px 24px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  color: #9ca3af;
  font-size: 14px;
}

.empty-icon { font-size: 40px; display: block; margin: 0 auto 12px; opacity: 0.4; }

.pages-table {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 100px 140px;
  gap: 16px;
  padding: 12px 20px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 100px 140px;
  gap: 16px;
  padding: 14px 20px;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
  font-size: 14px;
}

.table-row:last-child { border-bottom: none; }

.row-title { font-weight: 500; color: #111827; display: flex; align-items: center; gap: 8px; }

.mode-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
}
.template-mode { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.builder-mode { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.row-slug { color: #6b7280; font-family: monospace; font-size: 13px; }

.status-badge {
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
}

.status-badge.active { background: #dcfce7; color: #15803d; }
.status-badge.inactive { background: #f3f4f6; color: #6b7280; }
.status-badge:hover { opacity: 0.75; }

.row-actions { display: flex; align-items: center; gap: 4px; }

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: background 0.15s;
}

.action-btn.edit { background: #eff6ff; color: #3b82f6; }
.action-btn.edit:hover { background: #dbeafe; }
.action-btn.view { background: #f3f4f6; color: #6b7280; }
.action-btn.view:hover { background: #e5e7eb; }
.action-btn.delete { background: #fef2f2; color: #ef4444; }
.action-btn.delete:hover { background: #fee2e2; }
</style>
