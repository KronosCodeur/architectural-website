<script setup lang="ts">
definePageMeta({ layout: false })
useSeoMeta({ title: 'Connexion — Admin', robots: 'noindex,nofollow' })

const { fetch: refreshSession } = useUserSession()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await refreshSession()
    await navigateTo('/admin')
  } catch (e: unknown) {
    const err = e as { data?: { message?: string } }
    error.value = err?.data?.message ?? 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="login-logo">
          <span class="logo-dot" />
          <span class="logo-name">NuxtCMS</span>
        </div>
        <h1 class="login-title">Connexion</h1>
        <p class="login-subtitle">Accès réservé aux administrateurs</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="field">
          <label for="email" class="field-label">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="field-input"
            placeholder="admin@exemple.com"
            autocomplete="email"
            required
          />
        </div>

        <div class="field">
          <label for="password" class="field-label">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="field-input"
            placeholder="••••••••"
            autocomplete="current-password"
            required
          />
        </div>

        <p v-if="error" class="login-error">{{ error }}</p>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading">Connexion…</span>
          <span v-else>Se connecter</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f4f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Inter', sans-serif;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.logo-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4f8ef7;
}

.logo-name {
  font-size: 20px;
  font-weight: 700;
  color: #1a1f2e;
}

.login-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px;
}

.login-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.field-input {
  height: 44px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 14px;
  font-size: 14px;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
  font-family: inherit;
}

.field-input:focus {
  border-color: #4f8ef7;
}

.login-error {
  font-size: 13px;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 10px 12px;
  margin: 0;
}

.login-btn {
  height: 46px;
  background: #4f8ef7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
  font-family: inherit;
}

.login-btn:hover:not(:disabled) {
  background: #3b7de8;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
