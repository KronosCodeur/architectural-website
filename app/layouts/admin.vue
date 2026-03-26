<script setup lang="ts">
const { user, clear } = useUserSession()
const route = useRoute()

const navItems = [
  { label: 'Tableau de bord', to: '/admin', icon: 'lucide:layout-dashboard', exact: true },
  { label: 'Pages', to: '/admin/pages', icon: 'lucide:file-text' },
  { label: 'Navigation', to: '/admin/navigation', icon: 'lucide:menu' },
  { label: 'Médias', to: '/admin/media', icon: 'lucide:image' },
  { label: 'Contact', to: '/admin/contact', icon: 'lucide:mail' },
  { label: 'SEO', to: '/admin/seo', icon: 'lucide:search' },
  { label: 'Apparence', to: '/admin/appearance', icon: 'lucide:paintbrush' },
  { label: 'Paramètres', to: '/admin/settings', icon: 'lucide:settings' },
]

const sidebarOpen = ref(false)

function isActive(item: { to: string; exact?: boolean }) {
  if (item.exact) return route.path === item.to
  return route.path.startsWith(item.to)
}

async function handleLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  navigateTo('/admin/login')
}
</script>

<template>
  <div class="admin-shell">
    <aside class="admin-sidebar" :class="{ 'is-open': sidebarOpen }">
      <div class="sidebar-brand">
        <NuxtLink to="/admin" class="brand-link">
          <span class="brand-dot" />
          <span class="brand-name">NuxtCMS</span>
        </NuxtLink>
      </div>

      <nav class="sidebar-nav">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ 'is-active': isActive(item) }"
          @click="sidebarOpen = false"
        >
          <UIcon :name="item.icon" class="nav-icon" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">{{ user?.email?.[0]?.toUpperCase() }}</div>
          <div class="user-details">
            <p class="user-email">{{ user?.email }}</p>
            <p class="user-role">{{ user?.role === 'super_admin' ? 'Super Admin' : 'Admin' }}</p>
          </div>
        </div>
        <button class="logout-btn" @click="handleLogout">
          <UIcon name="lucide:log-out" />
        </button>
      </div>
    </aside>

    <div class="admin-overlay" :class="{ 'is-open': sidebarOpen }" @click="sidebarOpen = false" />

    <div class="admin-main">
      <header class="admin-topbar">
        <button class="burger-btn" @click="sidebarOpen = !sidebarOpen">
          <UIcon name="lucide:menu" />
        </button>
        <NuxtLink to="/" target="_blank" class="view-site-btn">
          <UIcon name="lucide:external-link" />
          <span>Voir le site</span>
        </NuxtLink>
      </header>

      <main class="admin-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #f4f5f7;
  font-family: 'Inter', sans-serif;
}

.admin-sidebar {
  width: 260px;
  background: #1a1f2e;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  transition: transform 0.25s ease;
}

.sidebar-brand {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4f8ef7;
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.3px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}

.nav-item.is-active {
  background: #4f8ef7;
  color: #fff;
}

.nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.sidebar-footer {
  padding: 16px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #4f8ef7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.user-details {
  min-width: 0;
}

.user-email {
  font-size: 12px;
  color: #fff;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}

.logout-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}

.admin-overlay {
  display: none;
}

.admin-main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-topbar {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.burger-btn {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: transparent;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: #374151;
}

.view-site-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  transition: color 0.15s, border-color 0.15s;
}

.view-site-btn:hover {
  color: #111827;
  border-color: #9ca3af;
}

.admin-content {
  flex: 1;
  padding: 32px;
}

@media (max-width: 1023px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }

  .admin-sidebar.is-open {
    transform: translateX(0);
  }

  .admin-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s;
  }

  .admin-overlay.is-open {
    opacity: 1;
    pointer-events: auto;
  }

  .admin-main {
    margin-left: 0;
  }

  .burger-btn {
    display: flex;
  }

  .admin-content {
    padding: 20px 16px;
  }
}
</style>
