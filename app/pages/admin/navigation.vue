<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

definePageMeta({ layout: 'admin', middleware: ['admin'] })
useSeoMeta({ title: 'Navigation — Admin', robots: 'noindex,nofollow' })

interface NavItem {
  id: number
  label: string
  url: string
  order: number
  isActive: boolean
  parentId: number | null
}

const { data, refresh } = await useFetch<NavItem[]>('/api/admin/navigation')

const items = ref<NavItem[]>([])

watch(data, (val) => { items.value = val ? [...val] : [] }, { immediate: true })

const editing = ref<NavItem | null>(null)
const editForm = reactive({ label: '', url: '', isActive: true })
const adding = ref(false)
const addForm = reactive({ label: '', url: '' })
const saving = ref(false)
const saved = ref(false)

function startEdit(item: NavItem) {
  editing.value = item
  editForm.label = item.label
  editForm.url = item.url
  editForm.isActive = item.isActive
}

function cancelEdit() {
  editing.value = null
}

async function saveEdit() {
  if (!editing.value) return
  await $fetch(`/api/admin/navigation/${editing.value.id}`, {
    method: 'PATCH',
    body: { label: editForm.label, url: editForm.url, isActive: editForm.isActive },
  })
  editing.value = null
  await refresh()
  items.value = data.value ? [...data.value] : []
}

async function toggleActive(item: NavItem) {
  await $fetch(`/api/admin/navigation/${item.id}`, {
    method: 'PATCH',
    body: { isActive: !item.isActive },
  })
  await refresh()
  items.value = data.value ? [...data.value] : []
}

async function deleteItem(item: NavItem) {
  if (!confirm(`Supprimer "${item.label}" ?`)) return
  await $fetch(`/api/admin/navigation/${item.id}`, { method: 'DELETE' })
  await refresh()
  items.value = data.value ? [...data.value] : []
}

async function addItem() {
  if (!addForm.label || !addForm.url) return
  await $fetch('/api/admin/navigation', {
    method: 'POST',
    body: { label: addForm.label, url: addForm.url, order: items.value.length },
  })
  addForm.label = ''
  addForm.url = ''
  adding.value = false
  await refresh()
  items.value = data.value ? [...data.value] : []
}

async function saveOrder() {
  saving.value = true
  try {
    await $fetch('/api/admin/navigation/reorder', {
      method: 'PUT',
      body: { items: items.value.map((item, i) => ({ id: item.id, order: i })) },
    })
    saved.value = true
    setTimeout(() => (saved.value = false), 2000)
    await refresh()
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="nav-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Navigation</h1>
        <p class="page-subtitle">Glissez pour réordonner, puis sauvegardez.</p>
      </div>
      <div class="header-actions">
        <button class="btn-add" @click="adding = !adding">
          <UIcon name="lucide:plus" />
          Ajouter un lien
        </button>
        <button class="btn-save" :disabled="saving" @click="saveOrder">
          <UIcon :name="saved ? 'lucide:check' : 'lucide:save'" />
          {{ saved ? 'Sauvegardé' : saving ? 'Sauvegarde…' : 'Sauvegarder l\'ordre' }}
        </button>
      </div>
    </div>

    <!-- Ajout rapide -->
    <div v-if="adding" class="add-panel">
      <div class="add-fields">
        <input v-model="addForm.label" type="text" class="field-input" placeholder="Libellé (ex: Blog)" @keyup.enter="addItem" />
        <input v-model="addForm.url" type="text" class="field-input" placeholder="URL (ex: /blog)" @keyup.enter="addItem" />
      </div>
      <div class="add-actions">
        <button class="btn-confirm" :disabled="!addForm.label || !addForm.url" @click="addItem">Ajouter</button>
        <button class="btn-cancel" @click="adding = false; addForm.label = ''; addForm.url = ''">Annuler</button>
      </div>
    </div>

    <div class="nav-card">
      <div v-if="!items.length" class="empty-state">
        <UIcon name="lucide:menu" />
        <p>Aucun item de navigation.</p>
      </div>

      <VueDraggable
        v-model="items"
        class="nav-list"
        item-key="id"
        handle=".drag-handle"
        ghost-class="item-ghost"
      >
        <div
          v-for="item in items"
          :key="item.id"
          class="nav-item"
          :class="{ inactive: !item.isActive }"
        >
          <!-- Mode lecture -->
          <template v-if="editing?.id !== item.id">
            <span class="drag-handle">
              <UIcon name="lucide:grip-vertical" />
            </span>
            <div class="item-info">
              <span class="item-label">{{ item.label }}</span>
              <span class="item-url">{{ item.url }}</span>
            </div>
            <span class="item-badge" :class="item.isActive ? 'active' : 'inactive'">
              {{ item.isActive ? 'Actif' : 'Inactif' }}
            </span>
            <div class="item-actions">
              <button class="icon-btn" title="Modifier" @click="startEdit(item)">
                <UIcon name="lucide:pencil" />
              </button>
              <button class="icon-btn" :title="item.isActive ? 'Désactiver' : 'Activer'" @click="toggleActive(item)">
                <UIcon :name="item.isActive ? 'lucide:eye-off' : 'lucide:eye'" />
              </button>
              <button class="icon-btn danger" title="Supprimer" @click="deleteItem(item)">
                <UIcon name="lucide:trash-2" />
              </button>
            </div>
          </template>

          <!-- Mode édition inline -->
          <template v-else>
            <span class="drag-handle drag-handle--disabled">
              <UIcon name="lucide:grip-vertical" />
            </span>
            <div class="edit-fields">
              <input v-model="editForm.label" type="text" class="field-input" placeholder="Libellé" @keyup.enter="saveEdit" @keyup.escape="cancelEdit" />
              <input v-model="editForm.url" type="text" class="field-input" placeholder="URL" @keyup.enter="saveEdit" @keyup.escape="cancelEdit" />
            </div>
            <label class="toggle-label">
              <input v-model="editForm.isActive" type="checkbox" class="toggle-input" />
              <span class="toggle-track" />
            </label>
            <div class="item-actions">
              <button class="icon-btn confirm" title="Confirmer" @click="saveEdit">
                <UIcon name="lucide:check" />
              </button>
              <button class="icon-btn" title="Annuler" @click="cancelEdit">
                <UIcon name="lucide:x" />
              </button>
            </div>
          </template>
        </div>
      </VueDraggable>
    </div>

    <p class="hint">
      <UIcon name="lucide:info" />
      Les modifications de l'ordre ne sont effectives qu'après avoir cliqué sur "Sauvegarder l'ordre".
    </p>
  </div>
</template>

<style scoped>
.nav-page { max-width: 800px; }

.page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
.page-title { font-size: 26px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-subtitle { font-size: 14px; color: #6b7280; margin: 0; }

.header-actions { display: flex; gap: 10px; flex-wrap: wrap; }

.btn-add {
  display: flex; align-items: center; gap: 6px;
  padding: 9px 16px; border-radius: 8px;
  border: 1px solid #e5e7eb; background: #fff;
  font-size: 13px; font-weight: 600; color: #374151; cursor: pointer;
  transition: all 0.15s;
}
.btn-add:hover { background: #f9fafb; }

.btn-save {
  display: flex; align-items: center; gap: 6px;
  padding: 9px 16px; border-radius: 8px;
  border: none; background: #111827; color: #fff;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s;
}
.btn-save:hover:not(:disabled) { background: #1f2937; }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

.add-panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.add-fields { display: flex; gap: 10px; flex: 1; flex-wrap: wrap; }
.add-actions { display: flex; gap: 8px; }

.btn-confirm {
  padding: 8px 16px; border-radius: 6px;
  border: none; background: #4f8ef7; color: #fff;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s;
}
.btn-confirm:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-confirm:hover:not(:disabled) { background: #3b7de8; }

.btn-cancel {
  padding: 8px 14px; border-radius: 6px;
  border: 1px solid #e5e7eb; background: #fff;
  font-size: 13px; font-weight: 500; color: #6b7280; cursor: pointer;
}
.btn-cancel:hover { background: #f9fafb; }

.nav-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
}

.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 60px; color: #d1d5db; font-size: 14px; gap: 12px;
}

.nav-list { padding: 8px; }

.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 10px; border-radius: 8px;
  border: 1px solid transparent;
  margin-bottom: 4px;
  transition: background 0.12s, border-color 0.12s;
  min-height: 56px;
}
.nav-item:hover { background: #f9fafb; border-color: #f3f4f6; }
.nav-item.inactive { opacity: 0.55; }

.drag-handle {
  color: #d1d5db; cursor: grab;
  display: flex; align-items: center; flex-shrink: 0;
}
.drag-handle--disabled { cursor: default; }

.item-info { flex: 1; min-width: 0; display: flex; align-items: center; gap: 16px; }
.item-label { font-size: 14px; font-weight: 600; color: #111827; white-space: nowrap; }
.item-url { font-size: 13px; color: #9ca3af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.item-badge {
  font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px;
  white-space: nowrap; flex-shrink: 0;
}
.item-badge.active { background: #dcfce7; color: #15803d; }
.item-badge.inactive { background: #f3f4f6; color: #9ca3af; }

.item-actions { display: flex; gap: 4px; flex-shrink: 0; }

.icon-btn {
  width: 30px; height: 30px; border-radius: 6px; border: none;
  background: transparent; cursor: pointer; color: #9ca3af;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; transition: all 0.15s;
}
.icon-btn:hover { background: #f3f4f6; color: #374151; }
.icon-btn.danger:hover { background: #fef2f2; color: #ef4444; }
.icon-btn.confirm:hover { background: #dcfce7; color: #15803d; }

.edit-fields { flex: 1; display: flex; gap: 10px; flex-wrap: wrap; }

.field-input {
  padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 6px;
  font-size: 13px; color: #111827; font-family: inherit; outline: none;
  min-width: 120px; flex: 1; transition: border-color 0.2s;
}
.field-input:focus { border-color: #4f8ef7; }

.toggle-label { display: flex; align-items: center; cursor: pointer; flex-shrink: 0; }
.toggle-input { display: none; }
.toggle-track {
  width: 36px; height: 20px; border-radius: 10px; background: #e5e7eb;
  position: relative; transition: background 0.2s;
}
.toggle-track::after {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 16px; height: 16px; border-radius: 50%; background: #fff;
  transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.toggle-input:checked + .toggle-track { background: #4f8ef7; }
.toggle-input:checked + .toggle-track::after { transform: translateX(16px); }

.hint {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #9ca3af;
}

:deep(.item-ghost) { opacity: 0.35; background: #eff6ff; border-radius: 8px; }
</style>
