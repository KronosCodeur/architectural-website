<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })
useSeoMeta({ title: 'Tableau de bord — Admin', robots: 'noindex,nofollow' })

const { data: stats } = await useFetch('/api/admin/stats')
</script>

<template>
  <div class="dashboard">
    <div class="page-header">
      <h1 class="page-title">Tableau de bord</h1>
      <p class="page-subtitle">Vue d'ensemble de votre site</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon stat-icon--pages">
          <UIcon name="lucide:file-text" />
        </div>
        <div class="stat-body">
          <p class="stat-value">{{ stats?.pages ?? 0 }}</p>
          <p class="stat-label">Pages</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon stat-icon--contacts">
          <UIcon name="lucide:mail" />
        </div>
        <div class="stat-body">
          <p class="stat-value">{{ stats?.unreadContacts ?? 0 }}</p>
          <p class="stat-label">Messages non lus</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon stat-icon--media">
          <UIcon name="lucide:image" />
        </div>
        <div class="stat-body">
          <p class="stat-value">{{ stats?.media ?? 0 }}</p>
          <p class="stat-label">Fichiers médias</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon stat-icon--blocks">
          <UIcon name="lucide:layout" />
        </div>
        <div class="stat-body">
          <p class="stat-value">{{ stats?.blocks ?? 0 }}</p>
          <p class="stat-label">Blocs de contenu</p>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Accès rapides</h2>
        </div>
        <div class="quick-links">
          <NuxtLink to="/admin/pages" class="quick-link">
            <UIcon name="lucide:file-plus" />
            <span>Nouvelle page</span>
          </NuxtLink>
          <NuxtLink to="/admin/media" class="quick-link">
            <UIcon name="lucide:upload" />
            <span>Uploader un média</span>
          </NuxtLink>
          <NuxtLink to="/admin/contact" class="quick-link">
            <UIcon name="lucide:inbox" />
            <span>Messages reçus</span>
          </NuxtLink>
          <NuxtLink to="/admin/settings" class="quick-link">
            <UIcon name="lucide:settings" />
            <span>Paramètres</span>
          </NuxtLink>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Site public</h2>
        </div>
        <div class="site-info">
          <NuxtLink to="/" target="_blank" class="visit-btn">
            <UIcon name="lucide:external-link" />
            <span>Ouvrir le site</span>
          </NuxtLink>
          <p class="site-note">Les modifications sont visibles immédiatement sur le site public.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1100px;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
}

.page-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #e5e7eb;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.stat-icon--pages { background: #eff6ff; color: #3b82f6; }
.stat-icon--contacts { background: #f0fdf4; color: #22c55e; }
.stat-icon--media { background: #fdf4ff; color: #a855f7; }
.stat-icon--blocks { background: #fff7ed; color: #f97316; }

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 2px;
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.panel {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
}

.panel-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.quick-links {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #374151;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.15s;
}

.quick-link:hover {
  background: #f9fafb;
  color: #111827;
}

.site-info {
  padding: 20px;
}

.visit-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #1a1f2e;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 12px;
  transition: background 0.15s;
}

.visit-btn:hover {
  background: #2d3448;
}

.site-note {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 1023px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 639px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
