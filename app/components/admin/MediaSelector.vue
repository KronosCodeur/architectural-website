<script setup lang="ts">
const props = defineProps<{ modelValue: string; open: boolean }>()
const emit = defineEmits<{
  'update:modelValue': [url: string]
  'update:open': [val: boolean]
}>()

const { data: files, refresh } = await useFetch('/api/admin/media')

const uploading = ref(false)

async function handleUpload(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.[0]) return
  uploading.value = true
  const form = new FormData()
  form.append('file', input.files[0])
  try {
    const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: form })
    await refresh()
    select(res.url)
  } finally {
    uploading.value = false
  }
}

function select(url: string) {
  emit('update:modelValue', url)
  emit('update:open', false)
}

async function deleteFile(name: string) {
  await $fetch(`/api/admin/media/${name}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div v-if="open" class="media-modal-overlay" @click.self="emit('update:open', false)">
    <div class="media-modal">
      <div class="modal-header">
        <h3 class="modal-title">Bibliothèque de médias</h3>
        <button class="modal-close" @click="emit('update:open', false)">
          <UIcon name="lucide:x" />
        </button>
      </div>

      <div class="modal-upload">
        <label class="upload-label" :class="{ uploading }">
          <UIcon name="lucide:upload" />
          <span>{{ uploading ? 'Upload en cours…' : 'Uploader un fichier' }}</span>
          <input type="file" accept="image/*" class="upload-input" :disabled="uploading" @change="handleUpload" />
        </label>
      </div>

      <div v-if="!files?.length" class="media-empty">Aucun média uploadé.</div>

      <div v-else class="media-grid">
        <div
          v-for="file in files"
          :key="file.name"
          class="media-item"
          :class="{ selected: modelValue === file.url }"
        >
          <button class="media-img-btn" @click="select(file.url)">
            <img :src="file.url" :alt="file.name" loading="lazy" />
          </button>
          <button class="media-delete" @click="deleteFile(file.name)">
            <UIcon name="lucide:trash-2" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.media-modal {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 760px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title { font-size: 16px; font-weight: 600; color: #111827; margin: 0; }

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-upload { padding: 12px 20px; border-bottom: 1px solid #f3f4f6; }

.upload-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1.5px dashed #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #6b7280;
  transition: border-color 0.15s, color 0.15s;
}

.upload-label:hover, .upload-label.uploading {
  border-color: #4f8ef7;
  color: #4f8ef7;
}

.upload-input { display: none; }

.media-empty { padding: 40px; text-align: center; color: #9ca3af; font-size: 14px; }

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  padding: 16px 20px;
  overflow-y: auto;
}

.media-item { position: relative; }

.media-item.selected .media-img-btn { outline: 2.5px solid #4f8ef7; border-radius: 4px; }

.media-img-btn {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  padding: 0;
  border: none;
  background: #f3f4f6;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}

.media-img-btn img { width: 100%; height: 100%; object-fit: cover; }

.media-delete {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: none;
  background: rgba(0,0,0,0.6);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  opacity: 0;
  transition: opacity 0.15s;
}

.media-item:hover .media-delete { opacity: 1; }
</style>
