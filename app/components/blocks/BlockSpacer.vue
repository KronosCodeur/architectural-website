<script setup lang="ts">
import type { SpacerContent } from '~/../../shared/types/blocks'
const props = defineProps<{ content: SpacerContent }>()

const heights = { small: '40px', medium: '80px', large: '140px' }
const height = computed(() => heights[props.content.height] ?? '80px')
</script>

<template>
  <div class="block-spacer" :style="{ height }" aria-hidden="true" />
</template>
