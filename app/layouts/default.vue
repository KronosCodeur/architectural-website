<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; background-color: var(--ivory);">
    <Navbar />
    <main style="flex: 1;">
      <slot />
    </main>
    <FooterSection />
  </div>
</template>
