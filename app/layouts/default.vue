<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; background-color: var(--ivory);">
    <Navbar />
    <main role="main" style="flex: 1;">
      <slot />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { organizationSchema, webSiteSchema, useStructuredData } from '~/composables/useStructuredData'

// Inject global Organization + WebSite structured data on every page
useStructuredData([organizationSchema, webSiteSchema])
</script>
