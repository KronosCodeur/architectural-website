<script setup lang="ts">
import type { AnyBlockContent } from '~/../../shared/types/blocks'
import BlockHero from './BlockHero.vue'
import BlockSlider from './BlockSlider.vue'
import BlockText from './BlockText.vue'
import BlockImageText from './BlockImageText.vue'
import BlockCards from './BlockCards.vue'
import BlockCta from './BlockCta.vue'
import BlockSpacer from './BlockSpacer.vue'
import BlockGallery from './BlockGallery.vue'
import BlockContactForm from './BlockContactForm.vue'

interface Block {
  id?: number
  type: string
  content: AnyBlockContent
  isActive: boolean
}

defineProps<{ blocks: Block[] }>()

const componentMap: Record<string, unknown> = {
  hero: BlockHero,
  slider: BlockSlider,
  text: BlockText,
  image_text: BlockImageText,
  cards: BlockCards,
  cta: BlockCta,
  spacer: BlockSpacer,
  gallery: BlockGallery,
  contact_form: BlockContactForm,
}
</script>

<template>
  <div class="block-renderer">
    <template v-for="block in blocks" :key="block.id ?? block.type">
      <component
        :is="componentMap[block.type]"
        v-if="block.isActive && componentMap[block.type]"
        :content="block.content"
      />
    </template>
  </div>
</template>
