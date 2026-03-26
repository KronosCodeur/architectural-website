<script setup lang="ts">
import type { AnyBlockContent } from '~/../../shared/types/blocks'
import { useBlockRegistry } from '~/composables/useBlockRegistry'

interface EditBlock {
  id?: number
  type: string
  content: AnyBlockContent
  isActive: boolean
}

const props = defineProps<{ block: EditBlock }>()
const emit = defineEmits<{
  'update:content': [content: AnyBlockContent]
  close: []
}>()

const { getDefinition } = useBlockRegistry()
const def = computed(() => getDefinition(props.block.type))
const content = computed({
  get: () => props.block.content as Record<string, unknown>,
  set: (val) => emit('update:content', val as AnyBlockContent),
})

function update(key: string, val: unknown) {
  emit('update:content', { ...content.value, [key]: val } as AnyBlockContent)
}

function updateCard(index: number, key: string, val: unknown) {
  const cards = [...(content.value.cards as unknown[])]
  cards[index] = { ...(cards[index] as Record<string, unknown>), [key]: val }
  update('cards', cards)
}

function addCard() {
  const cards = [...((content.value.cards as unknown[]) ?? [])]
  cards.push({ icon: 'lucide:star', title: 'Nouveau service', description: '', link: '' })
  update('cards', cards)
}

function removeCard(i: number) {
  const cards = [...(content.value.cards as unknown[])]
  cards.splice(i, 1)
  update('cards', cards)
}

const mediaSelectorOpen = ref(false)
const mediaSelectorTarget = ref<string>('backgroundImage')
const galleryImageIndex = ref<number | null>(null)
const slideImageIndex = ref<number | null>(null)

const mediaSelectorValue = computed(() => {
  if (mediaSelectorTarget.value === '__gallery__' && galleryImageIndex.value !== null) {
    const images = (content.value.images as Record<string, unknown>[]) ?? []
    return (images[galleryImageIndex.value]?.src as string) ?? ''
  }
  if (mediaSelectorTarget.value === '__gallery_add__') return ''
  if (mediaSelectorTarget.value === '__slide__' && slideImageIndex.value !== null) {
    const slides = (content.value.slides as Record<string, unknown>[]) ?? []
    return (slides[slideImageIndex.value]?.image as string) ?? ''
  }
  return (content.value[mediaSelectorTarget.value] as string) ?? ''
})

function onMediaSelected(url: string) {
  if (mediaSelectorTarget.value === '__gallery_add__') {
    addGalleryImage(url)
  } else if (mediaSelectorTarget.value === '__gallery__' && galleryImageIndex.value !== null) {
    updateGalleryImage(galleryImageIndex.value, 'src', url)
  } else if (mediaSelectorTarget.value === '__slide__' && slideImageIndex.value !== null) {
    updateSlide(slideImageIndex.value, 'image', url)
  } else {
    update(mediaSelectorTarget.value, url)
  }
}

function updateSlide(index: number, key: string, val: unknown) {
  const slides = [...((content.value.slides as unknown[]) ?? [])]
  slides[index] = { ...(slides[index] as Record<string, unknown>), [key]: val }
  update('slides', slides)
}

function addSlide() {
  const slides = [...((content.value.slides as unknown[]) ?? [])]
  slides.push({ image: '', title: 'Nouveau slide', subtitle: '', ctaText: '', ctaUrl: '/', overlay: true, overlayOpacity: 0.5 })
  update('slides', slides)
}

function removeSlide(i: number) {
  const slides = [...(content.value.slides as unknown[])]
  slides.splice(i, 1)
  update('slides', slides)
}

function updateGalleryImage(index: number, key: string, val: unknown) {
  const images = [...((content.value.images as unknown[]) ?? [])]
  images[index] = { ...(images[index] as Record<string, unknown>), [key]: val }
  update('images', images)
}

function addGalleryImage(url: string) {
  const images = [...((content.value.images as unknown[]) ?? [])]
  images.push({ src: url, alt: '', caption: '' })
  update('images', images)
}

function removeGalleryImage(i: number) {
  const images = [...((content.value.images as unknown[]) ?? [])]
  images.splice(i, 1)
  update('images', images)
}
</script>

<template>
  <div class="config-panel">
    <div class="config-header">
      <div class="config-title">
        <UIcon :name="def.icon" class="config-icon" />
        <span>{{ def.label }}</span>
      </div>
      <button class="config-close" @click="emit('close')">
        <UIcon name="lucide:x" />
      </button>
    </div>

    <div class="config-body">
      <!-- HERO -->
      <template v-if="block.type === 'hero'">
        <div class="field">
          <label class="field-label">Titre</label>
          <input class="field-input" :value="content.title as string" @input="update('title', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Sous-titre</label>
          <input class="field-input" :value="content.subtitle as string" @input="update('subtitle', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Bouton — Texte</label>
          <input class="field-input" :value="content.ctaText as string" @input="update('ctaText', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Bouton — URL</label>
          <input class="field-input" :value="content.ctaUrl as string" @input="update('ctaUrl', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Image de fond</label>
          <div class="image-field">
            <input class="field-input" :value="content.backgroundImage as string" placeholder="/uploads/..." @input="update('backgroundImage', ($event.target as HTMLInputElement).value)" />
            <button class="media-btn" type="button" @click="mediaSelectorTarget = 'backgroundImage'; mediaSelectorOpen = true">
              <UIcon name="lucide:image" />
            </button>
          </div>
          <img v-if="content.backgroundImage" :src="content.backgroundImage as string" class="img-preview" />
        </div>
        <div class="field">
          <label class="field-label">Hauteur minimale</label>
          <select class="field-select" :value="content.minHeight as string" @change="update('minHeight', ($event.target as HTMLSelectElement).value)">
            <option value="300px">Petite (300px)</option>
            <option value="500px">Moyenne (500px)</option>
            <option value="100vh">Plein écran</option>
          </select>
        </div>
        <div class="field field-row">
          <label class="field-label">Overlay sombre</label>
          <input type="checkbox" :checked="content.overlay as boolean" @change="update('overlay', ($event.target as HTMLInputElement).checked)" />
        </div>
      </template>

      <!-- TEXT -->
      <template v-else-if="block.type === 'text'">
        <div class="field">
          <label class="field-label">Contenu</label>
          <AdminTipTapEditor :model-value="content.content as string" @update:model-value="update('content', $event)" />
        </div>
        <div class="field">
          <label class="field-label">Alignement</label>
          <select class="field-select" :value="content.alignment as string" @change="update('alignment', ($event.target as HTMLSelectElement).value)">
            <option value="left">Gauche</option>
            <option value="center">Centre</option>
            <option value="right">Droite</option>
          </select>
        </div>
      </template>

      <!-- IMAGE + TEXT -->
      <template v-else-if="block.type === 'image_text'">
        <div class="field">
          <label class="field-label">Titre</label>
          <input class="field-input" :value="content.title as string" @input="update('title', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Contenu</label>
          <AdminTipTapEditor :model-value="content.content as string" @update:model-value="update('content', $event)" />
        </div>
        <div class="field">
          <label class="field-label">Image</label>
          <div class="image-field">
            <input class="field-input" :value="content.image as string" @input="update('image', ($event.target as HTMLInputElement).value)" />
            <button class="media-btn" type="button" @click="mediaSelectorTarget = 'image'; mediaSelectorOpen = true">
              <UIcon name="lucide:image" />
            </button>
          </div>
          <img v-if="content.image" :src="content.image as string" class="img-preview" />
        </div>
        <div class="field">
          <label class="field-label">Disposition</label>
          <select class="field-select" :value="content.layout as string" @change="update('layout', ($event.target as HTMLSelectElement).value)">
            <option value="image-left">Image à gauche</option>
            <option value="image-right">Image à droite</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">Bouton — Texte</label>
          <input class="field-input" :value="content.ctaText as string" @input="update('ctaText', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Bouton — URL</label>
          <input class="field-input" :value="content.ctaUrl as string" @input="update('ctaUrl', ($event.target as HTMLInputElement).value)" />
        </div>
      </template>

      <!-- CARDS -->
      <template v-else-if="block.type === 'cards'">
        <div class="field">
          <label class="field-label">Titre de la section</label>
          <input class="field-input" :value="content.title as string" @input="update('title', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Colonnes</label>
          <select class="field-select" :value="String(content.columns)" @change="update('columns', Number(($event.target as HTMLSelectElement).value))">
            <option value="2">2 colonnes</option>
            <option value="3">3 colonnes</option>
            <option value="4">4 colonnes</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">Cards</label>
          <div v-for="(card, i) in (content.cards as Record<string, unknown>[])" :key="i" class="card-editor">
            <div class="card-editor-header">
              <span>Card {{ i + 1 }}</span>
              <button class="card-remove" type="button" @click="removeCard(i)">
                <UIcon name="lucide:trash-2" />
              </button>
            </div>
            <input class="field-input" :value="card.title as string" placeholder="Titre" @input="updateCard(i, 'title', ($event.target as HTMLInputElement).value)" />
            <input class="field-input mt-4" :value="card.description as string" placeholder="Description" @input="updateCard(i, 'description', ($event.target as HTMLInputElement).value)" />
            <input class="field-input mt-4" :value="card.icon as string" placeholder="Icon (ex: lucide:star)" @input="updateCard(i, 'icon', ($event.target as HTMLInputElement).value)" />
          </div>
          <button class="add-card-btn" type="button" @click="addCard">
            <UIcon name="lucide:plus" /> Ajouter une card
          </button>
        </div>
      </template>

      <!-- CTA -->
      <template v-else-if="block.type === 'cta'">
        <div class="field">
          <label class="field-label">Titre</label>
          <input class="field-input" :value="content.title as string" @input="update('title', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Sous-titre</label>
          <input class="field-input" :value="content.subtitle as string" @input="update('subtitle', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Bouton — Texte</label>
          <input class="field-input" :value="content.buttonText as string" @input="update('buttonText', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Bouton — URL</label>
          <input class="field-input" :value="content.buttonUrl as string" @input="update('buttonUrl', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Fond</label>
          <select class="field-select" :value="content.background as string" @change="update('background', ($event.target as HTMLSelectElement).value)">
            <option value="dark">Sombre</option>
            <option value="light">Clair</option>
            <option value="brand">Couleur principale</option>
          </select>
        </div>
      </template>

      <!-- SPACER -->
      <template v-else-if="block.type === 'spacer'">
        <div class="field">
          <label class="field-label">Hauteur</label>
          <select class="field-select" :value="content.height as string" @change="update('height', ($event.target as HTMLSelectElement).value)">
            <option value="small">Petite (40px)</option>
            <option value="medium">Moyenne (80px)</option>
            <option value="large">Grande (140px)</option>
          </select>
        </div>
      </template>

      <!-- SLIDER -->
      <template v-else-if="block.type === 'slider'">
        <div class="field">
          <label class="field-label">Hauteur minimale</label>
          <select class="field-select" :value="content.minHeight as string" @change="update('minHeight', ($event.target as HTMLSelectElement).value)">
            <option value="60vh">Petite (60vh)</option>
            <option value="80vh">Grande (80vh)</option>
            <option value="100vh">Plein écran (100vh)</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">Alignement texte</label>
          <select class="field-select" :value="content.textAlign as string" @change="update('textAlign', ($event.target as HTMLSelectElement).value)">
            <option value="left">Gauche</option>
            <option value="center">Centre</option>
            <option value="right">Droite</option>
          </select>
        </div>
        <div class="field field-row">
          <label class="field-label">Défilement automatique</label>
          <input type="checkbox" :checked="content.autoplay as boolean" @change="update('autoplay', ($event.target as HTMLInputElement).checked)" />
        </div>
        <div class="field">
          <label class="field-label">Intervalle (secondes)</label>
          <input class="field-input" type="number" min="2" max="30" :value="content.interval as number" @input="update('interval', Number(($event.target as HTMLInputElement).value))" />
        </div>
        <div class="field">
          <label class="field-label">Slides ({{ (content.slides as unknown[])?.length ?? 0 }})</label>
          <div v-for="(slide, i) in (content.slides as Record<string, unknown>[])" :key="i" class="card-editor">
            <div class="card-editor-header">
              <span>Slide {{ i + 1 }}</span>
              <button class="card-remove" type="button" @click="removeSlide(i)">
                <UIcon name="lucide:trash-2" />
              </button>
            </div>
            <div class="image-field">
              <input class="field-input" :value="slide.image as string" placeholder="/uploads/..." @input="updateSlide(i, 'image', ($event.target as HTMLInputElement).value)" />
              <button class="media-btn" type="button" @click="slideImageIndex = i; mediaSelectorTarget = '__slide__'; mediaSelectorOpen = true">
                <UIcon name="lucide:image" />
              </button>
            </div>
            <img v-if="slide.image" :src="slide.image as string" class="img-preview" />
            <input class="field-input mt-4" :value="slide.title as string" placeholder="Titre" @input="updateSlide(i, 'title', ($event.target as HTMLInputElement).value)" />
            <input class="field-input mt-4" :value="slide.subtitle as string" placeholder="Sous-titre" @input="updateSlide(i, 'subtitle', ($event.target as HTMLInputElement).value)" />
            <input class="field-input mt-4" :value="slide.ctaText as string" placeholder="Texte du bouton" @input="updateSlide(i, 'ctaText', ($event.target as HTMLInputElement).value)" />
            <input class="field-input mt-4" :value="slide.ctaUrl as string" placeholder="URL du bouton" @input="updateSlide(i, 'ctaUrl', ($event.target as HTMLInputElement).value)" />
            <div class="field field-row mt-4">
              <label class="field-label" style="font-size:11px;">Overlay sombre</label>
              <input type="checkbox" :checked="slide.overlay as boolean" @change="updateSlide(i, 'overlay', ($event.target as HTMLInputElement).checked)" />
            </div>
          </div>
          <button class="add-card-btn" type="button" @click="addSlide">
            <UIcon name="lucide:plus" /> Ajouter un slide
          </button>
        </div>
      </template>

      <!-- GALLERY -->
      <template v-else-if="block.type === 'gallery'">
        <div class="field">
          <label class="field-label">Titre de la section</label>
          <input class="field-input" :value="content.title as string" @input="update('title', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Colonnes</label>
          <select class="field-select" :value="String(content.columns ?? 3)" @change="update('columns', Number(($event.target as HTMLSelectElement).value))">
            <option value="2">2 colonnes</option>
            <option value="3">3 colonnes</option>
            <option value="4">4 colonnes</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">Images</label>
          <div v-for="(img, i) in (content.images as Record<string, unknown>[])" :key="i" class="card-editor">
            <div class="card-editor-header">
              <span>Image {{ i + 1 }}</span>
              <button class="card-remove" type="button" @click="removeGalleryImage(i)">
                <UIcon name="lucide:trash-2" />
              </button>
            </div>
            <div class="image-field">
              <input class="field-input" :value="img.src as string" placeholder="/uploads/..." @input="updateGalleryImage(i, 'src', ($event.target as HTMLInputElement).value)" />
              <button class="media-btn" type="button" @click="galleryImageIndex = i; mediaSelectorTarget = '__gallery__'; mediaSelectorOpen = true">
                <UIcon name="lucide:image" />
              </button>
            </div>
            <img v-if="img.src" :src="img.src as string" class="img-preview" />
            <input class="field-input mt-4" :value="img.alt as string" placeholder="Texte alternatif (alt)" @input="updateGalleryImage(i, 'alt', ($event.target as HTMLInputElement).value)" />
            <input class="field-input mt-4" :value="img.caption as string" placeholder="Légende (optionnel)" @input="updateGalleryImage(i, 'caption', ($event.target as HTMLInputElement).value)" />
          </div>
          <button class="add-card-btn" type="button" @click="galleryImageIndex = null; mediaSelectorTarget = '__gallery_add__'; mediaSelectorOpen = true">
            <UIcon name="lucide:plus" /> Ajouter une image
          </button>
        </div>
      </template>

      <!-- CONTACT FORM -->
      <template v-else-if="block.type === 'contact_form'">
        <div class="field">
          <label class="field-label">Titre</label>
          <input class="field-input" :value="content.title as string" @input="update('title', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field">
          <label class="field-label">Sous-titre</label>
          <input class="field-input" :value="content.subtitle as string" @input="update('subtitle', ($event.target as HTMLInputElement).value)" />
        </div>
        <div class="field field-row">
          <label class="field-label">Afficher l'adresse</label>
          <input type="checkbox" :checked="content.showAddress as boolean" @change="update('showAddress', ($event.target as HTMLInputElement).checked)" />
        </div>
        <div class="field field-row">
          <label class="field-label">Afficher le téléphone</label>
          <input type="checkbox" :checked="content.showPhone as boolean" @change="update('showPhone', ($event.target as HTMLInputElement).checked)" />
        </div>
        <div class="field field-row">
          <label class="field-label">Afficher les bureaux</label>
          <input type="checkbox" :checked="content.showOffices as boolean" @change="update('showOffices', ($event.target as HTMLInputElement).checked)" />
        </div>
      </template>

      <!-- FALLBACK -->
      <template v-else>
        <p class="no-config">Ce type de bloc n'a pas de configuration.</p>
      </template>
    </div>

    <AdminMediaSelector
      :model-value="mediaSelectorValue"
      :open="mediaSelectorOpen"
      @update:open="mediaSelectorOpen = $event"
      @update:model-value="onMediaSelected($event)"
    />
  </div>
</template>

<style scoped>
.config-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border-left: 1px solid #e5e7eb;
}

.config-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.config-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.config-icon { color: #6b7280; }

.config-close {
  width: 28px; height: 28px;
  border-radius: 5px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  display: flex; align-items: center; justify-content: center;
}

.config-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field { display: flex; flex-direction: column; gap: 6px; }
.field-row { flex-direction: row; align-items: center; justify-content: space-between; }
.field-label { font-size: 12px; font-weight: 600; color: #374151; }

.field-input {
  height: 36px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 13px;
  color: #111827;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}

.field-input:focus { border-color: #4f8ef7; }

.field-select {
  height: 36px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 13px;
  color: #111827;
  background: #fff;
  outline: none;
  font-family: inherit;
}

.image-field { display: flex; gap: 6px; }

.media-btn {
  height: 36px; width: 36px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
  cursor: pointer;
  color: #6b7280;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.img-preview {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-top: 6px;
}

.card-editor {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 4px;
}

.card-remove {
  border: none; background: transparent;
  color: #ef4444; cursor: pointer;
  display: flex; align-items: center;
}

.add-card-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1.5px dashed #d1d5db;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  color: #6b7280;
  width: 100%;
  justify-content: center;
}

.mt-4 { margin-top: 4px; }
.no-config { font-size: 13px; color: #9ca3af; text-align: center; padding: 20px 0; }
</style>
