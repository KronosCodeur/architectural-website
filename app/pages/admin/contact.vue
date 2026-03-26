<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })
useSeoMeta({ title: 'Contact — Admin', robots: 'noindex,nofollow' })

interface Contact {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: 'unread' | 'read' | 'archived'
  createdAt: string | number
}

const activeFilter = ref<'all' | 'unread' | 'read' | 'archived'>('all')
const selected = ref<Contact | null>(null)
const deleting = ref<number | null>(null)

const { data: allContacts, refresh } = await useFetch<Contact[]>('/api/admin/contacts')

const filtered = computed(() => {
  if (activeFilter.value === 'all') return allContacts.value ?? []
  return (allContacts.value ?? []).filter((c) => c.status === activeFilter.value)
})

const counts = computed(() => ({
  all: allContacts.value?.length ?? 0,
  unread: allContacts.value?.filter((c) => c.status === 'unread').length ?? 0,
  read: allContacts.value?.filter((c) => c.status === 'read').length ?? 0,
  archived: allContacts.value?.filter((c) => c.status === 'archived').length ?? 0,
}))

async function openContact(contact: Contact) {
  selected.value = contact
  if (contact.status === 'unread') {
    await $fetch(`/api/admin/contacts/${contact.id}`, { method: 'PATCH', body: { status: 'read' } })
    contact.status = 'read'
    await refresh()
  }
}

async function setStatus(contact: Contact, status: 'read' | 'archived' | 'unread') {
  await $fetch(`/api/admin/contacts/${contact.id}`, { method: 'PATCH', body: { status } })
  contact.status = status
  if (selected.value?.id === contact.id) selected.value = { ...contact, status }
  await refresh()
}

async function deleteContact(contact: Contact) {
  if (!confirm(`Supprimer le message de ${contact.name} ?`)) return
  deleting.value = contact.id
  try {
    await $fetch(`/api/admin/contacts/${contact.id}`, { method: 'DELETE' })
    if (selected.value?.id === contact.id) selected.value = null
    await refresh()
  } finally {
    deleting.value = null
  }
}

function formatDate(val: string | number) {
  return new Date(typeof val === 'number' ? val * 1000 : val).toLocaleString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}
</script>

<template>
  <div class="contact-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Contact</h1>
        <p class="page-subtitle">{{ counts.all }} message{{ counts.all > 1 ? 's' : '' }} — {{ counts.unread }} non lu{{ counts.unread > 1 ? 's' : '' }}</p>
      </div>
    </div>

    <!-- Filtres -->
    <div class="filters">
      <button
        v-for="f in (['all', 'unread', 'read', 'archived'] as const)"
        :key="f"
        class="filter-btn"
        :class="{ active: activeFilter === f }"
        @click="activeFilter = f; selected = null"
      >
        {{ f === 'all' ? 'Tous' : f === 'unread' ? 'Non lus' : f === 'read' ? 'Lus' : 'Archivés' }}
        <span class="filter-count">{{ counts[f] }}</span>
      </button>
    </div>

    <div class="inbox-layout">
      <!-- Liste des messages -->
      <div class="msg-list" :class="{ 'has-selected': selected }">
        <div v-if="!filtered.length" class="empty-state">
          <UIcon name="lucide:mail-open" />
          <p>Aucun message{{ activeFilter !== 'all' ? ' dans cette catégorie' : '' }}.</p>
        </div>

        <div
          v-for="c in filtered"
          :key="c.id"
          class="msg-row"
          :class="{ active: selected?.id === c.id, unread: c.status === 'unread' }"
          @click="openContact(c)"
        >
          <div class="msg-avatar">{{ c.name.charAt(0).toUpperCase() }}</div>
          <div class="msg-info">
            <div class="msg-top">
              <span class="msg-name">{{ c.name }}</span>
              <span class="msg-date">{{ formatDate(c.createdAt) }}</span>
            </div>
            <div class="msg-subject">{{ c.subject || '(Sans sujet)' }}</div>
            <div class="msg-preview">{{ c.message.slice(0, 80) }}…</div>
          </div>
          <div class="msg-status-dot" :class="c.status" />
        </div>
      </div>

      <!-- Volet de détail -->
      <div v-if="selected" class="msg-detail">
        <div class="detail-header">
          <div class="detail-meta">
            <div class="detail-name">{{ selected.name }}</div>
            <a :href="`mailto:${selected.email}`" class="detail-email">{{ selected.email }}</a>
            <span v-if="selected.phone" class="detail-phone">{{ selected.phone }}</span>
          </div>
          <div class="detail-actions">
            <button
              class="action-btn"
              :title="selected.status === 'archived' ? 'Désarchiver' : 'Archiver'"
              @click="setStatus(selected, selected.status === 'archived' ? 'read' : 'archived')"
            >
              <UIcon :name="selected.status === 'archived' ? 'lucide:inbox' : 'lucide:archive'" />
            </button>
            <button
              v-if="selected.status !== 'unread'"
              class="action-btn"
              title="Marquer non lu"
              @click="setStatus(selected, 'unread')"
            >
              <UIcon name="lucide:mail" />
            </button>
            <button
              class="action-btn danger"
              title="Supprimer"
              :disabled="deleting === selected.id"
              @click="deleteContact(selected)"
            >
              <UIcon name="lucide:trash-2" />
            </button>
            <button class="action-btn" title="Fermer" @click="selected = null">
              <UIcon name="lucide:x" />
            </button>
          </div>
        </div>

        <div class="detail-subject">{{ selected.subject || '(Sans sujet)' }}</div>
        <div class="detail-date">{{ formatDate(selected.createdAt) }}</div>

        <div class="detail-body">{{ selected.message }}</div>

        <div class="detail-footer">
          <a :href="`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject ?? '')}`" class="reply-btn">
            <UIcon name="lucide:reply" />
            Répondre par email
          </a>
        </div>
      </div>

      <div v-else class="detail-empty">
        <UIcon name="lucide:mouse-pointer-click" />
        <p>Sélectionnez un message pour le lire.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page { max-width: 1200px; }

.page-header { margin-bottom: 24px; }
.page-title { font-size: 26px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-subtitle { font-size: 14px; color: #6b7280; margin: 0; }

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s;
}
.filter-btn:hover { background: #f9fafb; }
.filter-btn.active { background: #111827; color: #fff; border-color: #111827; }

.filter-count {
  font-size: 11px;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 10px;
  padding: 1px 7px;
  font-weight: 600;
}
.filter-btn.active .filter-count { background: rgba(255,255,255,0.2); color: #fff; }

.inbox-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  min-height: 500px;
}

.msg-list {
  border-right: 1px solid #f3f4f6;
  overflow-y: auto;
  max-height: 700px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  color: #d1d5db;
  font-size: 14px;
  gap: 12px;
  text-align: center;
}

.msg-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid #f9fafb;
  cursor: pointer;
  transition: background 0.12s;
  position: relative;
}
.msg-row:hover { background: #f9fafb; }
.msg-row.active { background: #eff6ff; }
.msg-row.unread .msg-name { font-weight: 700; }
.msg-row.unread .msg-subject { font-weight: 600; color: #111827; }

.msg-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
}
.msg-row.unread .msg-avatar { background: #dbeafe; color: #1d4ed8; }

.msg-info { flex: 1; min-width: 0; }

.msg-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}
.msg-name { font-size: 13px; font-weight: 500; color: #111827; }
.msg-date { font-size: 11px; color: #9ca3af; white-space: nowrap; }
.msg-subject { font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.msg-preview { font-size: 12px; color: #9ca3af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.msg-status-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}
.msg-status-dot.unread { background: #3b82f6; }
.msg-status-dot.read { background: #d1d5db; }
.msg-status-dot.archived { background: #fbbf24; }

/* Détail */
.msg-detail {
  display: flex;
  flex-direction: column;
  padding: 28px 32px;
  overflow-y: auto;
  max-height: 700px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
}

.detail-name { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 4px; }
.detail-email { font-size: 13px; color: #4f8ef7; display: block; margin-bottom: 2px; text-decoration: none; }
.detail-email:hover { text-decoration: underline; }
.detail-phone { font-size: 13px; color: #6b7280; }

.detail-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.action-btn {
  width: 34px; height: 34px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  color: #374151;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  transition: all 0.15s;
}
.action-btn:hover { background: #f3f4f6; }
.action-btn.danger:hover { background: #fef2f2; color: #ef4444; border-color: #fecaca; }
.action-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.detail-subject { font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 6px; }
.detail-date { font-size: 12px; color: #9ca3af; margin-bottom: 24px; }

.detail-body {
  flex: 1;
  font-size: 15px;
  color: #374151;
  line-height: 1.75;
  white-space: pre-wrap;
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.detail-footer { display: flex; justify-content: flex-start; }

.reply-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: #111827;
  color: #fff;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
}
.reply-btn:hover { background: #1f2937; }

.detail-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #d1d5db;
  font-size: 14px;
  gap: 12px;
  padding: 60px;
}
</style>
