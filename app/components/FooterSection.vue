<template>
  <footer style="background-color: var(--anthracite); padding-top: 80px; padding-bottom: 32px;">
    <div class="container-brand">

      <!-- Top grid -->
      <div class="footer-grid" style="padding-bottom: 64px; border-bottom: 1px solid rgba(255,255,255,0.08);">

        <!-- Brand column -->
        <div>
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
            <div style="width: 36px; height: 36px; border: 2px solid var(--sable); display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 12px; font-weight: 700; color: var(--sable);">TC</span>
            </div>
            <span class="font-heading" style="font-size: 18px; font-weight: 600; color: white;">Taurus Concept</span>
          </div>
          <p style="font-size: 14px; color: #BDBDBD; line-height: 1.7; max-width: 280px;">
            L'excellence architecturale au service de votre vision. Du Togo vers le monde.
          </p>
        </div>

        <!-- Navigation column -->
        <div>
          <h4 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: white; margin-bottom: 24px;">Navigation</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <NuxtLink
              v-for="link in footerLinks"
              :key="link.label"
              :to="link.to"
              style="font-size: 14px; color: #BDBDBD; text-decoration: none; transition: color 0.3s;"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Contact column -->
        <div>
          <h4 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: white; margin-bottom: 24px;">Contact</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14px; color: #BDBDBD;">
            <p>Boulevard du 13 Janvier</p>
            <p>Lomé, Togo</p>
            <p style="padding-top: 8px;">contact@taurusconcept.com</p>
            <p>+228 90 00 00 00</p>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom" style="padding-top: 32px;">
        <span style="font-size: 12px; color: rgba(189,189,189,0.5);">&copy; {{ new Date().getFullYear() }} Taurus Concept. Tous droits réservés.</span>
        <div style="display: flex; align-items: center; gap: 24px;">
          <span style="font-size: 12px; color: rgba(189,189,189,0.5); cursor: default;">
            Mentions légales
          </span>
          <span style="font-size: 12px; color: rgba(189,189,189,0.5); cursor: default;">
            Politique de confidentialité
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Projets', to: '/projets' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
]
</script>

<style scoped>
.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
}
.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .footer-bottom {
    flex-direction: row;
  }
}
</style>
