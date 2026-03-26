<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })
useSeoMeta({ title: 'Médias — Admin', robots: 'noindex,nofollow' })

const { data: files, refresh } = await useFetch('/api/admin/media')
const uploading = ref(false)
const lightbox = ref<string | null>(null)

async function handleUpload(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.[0]) return
  uploading.value = true
  const form = new FormData()
  form.append('file', input.files[0])
  try {
    await $fetch('/api/admin/upload', { method: 'POST', body: form })
    await refresh()
  } finally {
    uploading.value = false
    input.value = ''
  }
}

async function deleteFile(name: string) {
  if (!confirm(`Supprimer "${name}" ?`)) return
  await $fetch(`/api/admin/media/${name}`, { method: 'DELETE' })
  await refresh()
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}
</script>

<template>
  <div class="media-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Médias</h1>
        <p class="page-subtitle">{{ files?.length ?? 0 }} fichier(s)</p>
      </div>
      <label class="upload-btn" :class="{ uploading }">
        <UIcon :name="uploading ? 'lucide:loader' : 'lucide:upload'" />
        {{ uploading ? 'Upload…' : 'Uploader' }}
        <input type="file" accept="image/*" class="upload-input" :disabled="uploading" @change="handleUpload" />
      </label>
    </div>

    <div v-if="!files?.length" class="empty-state">
      <UIcon name="lucide:image" class="empty-icon" />
      <p>Aucun média. Uploadez votre première image.</p>
    </div>

    <div v-else class="media-grid">
      <div v-for="file in files" :key="file.name" class="media-card">
        <button class="media-preview" @click="lightbox = file.url">
          <img :src="file.url" :alt="file.name" loading="lazy" />
        </button>
        <div class="media-info">
          <span class="media-name" :title="file.name">{{ file.name }}</span>
          <span class="media-size">{{ formatSize(file.size) }}</span>
        </div>
        <div class="media-actions">
          <button class="media-action copy" title="Copier l'URL" @click="navigator.clipboard.writeText(file.url)">
            <UIcon name="lucide:copy" />
          </button>
          <button class="media-action delete" title="Supprimer" @click="deleteFile(file.name)">
            <UIcon name="lucide:trash-2" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="lightbox" class="lightbox" @click.self="lightbox = null">
      <button class="lightbox-close" @click="lightbox = null">
        <UIcon name="lucide:x" />
      </button>
      <img :src="lightbox" class="lightbox-img" />
    </div>
  </div>
</template>

<style scoped>
.media-page { max-width: 1100px; }

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-title { font-size: 26px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-subtitle { font-size: 14px; color: #6b7280; margin: 0; }

.upload-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #4f8ef7;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.upload-btn:hover { background: #3b7de8; }
.upload-btn.uploading { opacity: 0.7; cursor: not-allowed; }
.upload-input { display: none; }

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

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.media-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}

.media-preview {
  display: block;
  width: 100%;
  aspect-ratio: 4/3;
  border: none;
  padding: 0;
  background: #f9fafb;
  cursor: pointer;
  overflow: hidden;
}

.media-preview img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.2s; }
.media-preview:hover img { transform: scale(1.04); }

.media-info {
  padding: 10px 12px 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.media-name {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-size { font-size: 11px; color: #9ca3af; }

.media-actions {
  display: flex;
  gap: 4px;
  padding: 6px 8px 10px;
}

.media-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px; height: 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.15s;
}

.media-action.copy { background: #f3f4f6; color: #6b7280; }
.media-action.copy:hover { background: #e5e7eb; }
.media-action.delete { background: #fef2f2; color: #ef4444; }
.media-action.delete:hover { background: #fee2e2; }

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.lightbox-close {
  position: absolute;
  top: 20px; right: 20px;
  background: rgba(255,255,255,0.15);
  border: none; color: #fff;
  width: 40px; height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex; align-items: center; justify-content: center;
}

.lightbox-img { max-width: 90vw; max-height: 90vh; object-fit: contain; }
</style>
