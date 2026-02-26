import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.test.ts'],
    setupFiles: ['tests/setup.ts'],
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
      '#app': fileURLToPath(new URL('./node_modules/nuxt/dist/app', import.meta.url)),
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
      '#app': fileURLToPath(new URL('./node_modules/nuxt/dist/app', import.meta.url)),
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
})
