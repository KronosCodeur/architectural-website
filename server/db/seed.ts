import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import bcrypt from 'bcrypt'
import { users, pages, navigation, settings } from './schema'
import * as schema from './schema'
import { eq } from 'drizzle-orm'

const DB_PATH = process.env.DATABASE_PATH ?? './server/db/database.sqlite'
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? 'admin@archidesign.com'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? 'Admin1234!'

const sqlite = new Database(DB_PATH)
const db = drizzle(sqlite, { schema })

const existing = db.select().from(users).where(eq(users.email, ADMIN_EMAIL)).get()

if (existing) {
  console.log(`✓ Admin déjà existant : ${ADMIN_EMAIL}`)
} else {
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12)
  db.insert(users).values({
    email: ADMIN_EMAIL,
    passwordHash,
    role: 'super_admin',
  }).run()
  console.log(`✓ Admin créé : ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  console.log('  ⚠️  Changez le mot de passe après la première connexion.')
}

const SITE_PAGES = [
  {
    slug: 'home',
    title: 'Accueil',
    template: 'home',
    isActive: 1,
    order: 0,
    metaTitle: "Archi Design — Architecture d'Exception à Lomé",
    metaDescription: "Cabinet d'architecture premium basé à Lomé, Togo. Conception architecturale sur-mesure, gestion de projet et développement immobilier international. 25 ans d'excellence.",
  },
  {
    slug: 'services',
    title: 'Services',
    template: 'services',
    isActive: 1,
    order: 1,
    metaTitle: 'Services Architecturaux — Archi Design',
    metaDescription: "Conception architecturale, gestion de projet, développement international et design d'intérieur. Découvrez l'étendue de notre savoir-faire.",
  },
  {
    slug: 'projets',
    title: 'Projets',
    template: 'projets',
    isActive: 1,
    order: 2,
    metaTitle: 'Nos Réalisations — Archi Design',
    metaDescription: "Découvrez nos projets emblématiques : villas de prestige, tours commerciales et résidences d'exception du Togo à l'international.",
  },
  {
    slug: 'a-propos',
    title: 'À Propos',
    template: 'a-propos',
    isActive: 1,
    order: 3,
    metaTitle: "À Propos d'Archi Design — 25 Ans d'Excellence",
    metaDescription: "Depuis Lomé, Archi Design repousse les frontières de l'architecture contemporaine. Découvrez notre histoire, notre équipe et nos valeurs.",
  },
  {
    slug: 'contact',
    title: 'Contact',
    template: 'contact',
    isActive: 1,
    order: 4,
    metaTitle: 'Contact — Archi Design',
    metaDescription: 'Contactez notre équipe pour discuter de votre projet architectural. Bureau principal à Lomé, Togo. Présence internationale.',
  },
]

for (const page of SITE_PAGES) {
  const existingPage = db.select().from(pages).where(eq(pages.slug, page.slug)).get()
  if (existingPage) {
    if (!existingPage.originalTemplate && page.template) {
      db.update(pages).set({ originalTemplate: page.template }).where(eq(pages.slug, page.slug)).run()
      console.log(`✓ Page mise à jour (originalTemplate) : /${page.slug}`)
    } else {
      console.log(`✓ Page déjà existante : /${page.slug}`)
    }
  } else {
    db.insert(pages).values({ ...page, originalTemplate: page.template }).run()
    console.log(`✓ Page créée : /${page.slug} (template: ${page.template})`)
  }
}

const NAV_ITEMS = [
  { label: 'Accueil', url: '/', order: 0 },
  { label: 'Services', url: '/services', order: 1 },
  { label: 'Projets', url: '/projets', order: 2 },
  { label: 'À Propos', url: '/a-propos', order: 3 },
  { label: 'Contact', url: '/contact', order: 4 },
]

const existingNav = db.select().from(navigation).all()
if (existingNav.length === 0) {
  for (const item of NAV_ITEMS) {
    db.insert(navigation).values(item).run()
  }
  console.log(`✓ Navigation créée : ${NAV_ITEMS.length} items`)
} else {
  console.log(`✓ Navigation déjà existante : ${existingNav.length} items`)
}

const DEFAULT_SETTINGS: Record<string, string> = {
  site_name: 'Archi Design',
  site_tagline: "Architecture d'Exception",
  contact_email: 'contact@archidesign.com',
  contact_phone: '+228 90 00 00 00',
  contact_address: 'Boulevard du 13 Janvier, Lomé, Togo',
  theme_color_vert: '#5C7A5C',
  theme_color_anthracite: '#2C2C2C',
  theme_color_sable: '#C4B49A',
  theme_color_ivory: '#F5F0E8',
  logo_url: '',
  favicon_url: '',
  seo_title_suffix: '— Archi Design',
  seo_default_description: "Cabinet d'architecture premium basé à Lomé, Togo. 25 ans d'excellence en conception architecturale, gestion de projet et développement international.",
  seo_og_image: '/images/hero-architecture.jpg',
  seo_robots: 'index,follow',
  social_twitter: '',
  social_instagram: '',
  social_linkedin: '',
  social_facebook: '',
}

for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
  const existingSetting = db.select().from(settings).where(eq(settings.key, key)).get()
  if (!existingSetting) {
    db.insert(settings).values({ key, value }).run()
    console.log(`✓ Setting créé : ${key}`)
  }
}

sqlite.close()
