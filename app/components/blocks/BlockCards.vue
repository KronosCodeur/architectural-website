<script setup lang="ts">
import type { CardsContent } from '~/../../shared/types/blocks'
defineProps<{ content: CardsContent }>()
</script>

<template>
  <section class="block-cards section-padding">
    <div class="container-brand">
      <div v-if="content.title || content.subtitle" class="section-header">
        <h2 v-if="content.title" class="section-title">{{ content.title }}</h2>
        <p v-if="content.subtitle" class="section-subtitle">{{ content.subtitle }}</p>
      </div>

      <div class="cards-grid" :style="{ '--cols': content.columns }">
        <div v-for="(card, i) in content.cards" :key="i" class="card-item">
          <div class="card-icon">
            <UIcon :name="card.icon || 'lucide:star'" />
          </div>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-desc">{{ card.description }}</p>
          <NuxtLink v-if="card.link" :to="card.link" class="card-link">
            En savoir plus
            <UIcon name="lucide:arrow-right" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.block-cards { background: var(--ivory); }

.section-header { text-align: center; margin-bottom: 56px; }

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  color: var(--anthracite);
  margin: 0 0 12px;
}

.section-subtitle { font-size: 16px; color: var(--gray-text); margin: 0; }

.cards-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols, 3), 1fr);
  gap: 32px;
}

.card-item {
  background: #fff;
  padding: 32px 28px;
  border: 1px solid #e5e7eb;
  border-bottom: 3px solid transparent;
  transition: border-color 0.2s, transform 0.2s;
}

.card-item:hover {
  border-bottom-color: var(--vert);
  transform: translateY(-4px);
}

.card-icon {
  font-size: 32px;
  color: var(--vert);
  margin-bottom: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--anthracite);
  margin: 0 0 12px;
}

.card-desc { font-size: 14px; color: var(--gray-text); line-height: 1.7; margin: 0 0 20px; }

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vert);
  text-decoration: none;
}

@media (max-width: 1023px) { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 639px) { .cards-grid { grid-template-columns: 1fr; } }
</style>
