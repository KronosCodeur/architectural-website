import { useDb } from '../db'
import { settings } from '../db/schema'

const PUBLIC_KEYS = new Set([
  'site_name', 'site_tagline', 'contact_email', 'contact_phone', 'contact_address',
  'theme_color_vert', 'theme_color_anthracite', 'theme_color_sable', 'theme_color_ivory',
  'logo_url', 'favicon_url',
  'seo_title_suffix', 'seo_default_description', 'seo_og_image',
  'social_twitter', 'social_instagram', 'social_linkedin', 'social_facebook',
])

export default defineEventHandler(async (event) => {
  const db = useDb()
  const rows = await db.select().from(settings)
  return Object.fromEntries(
    rows.filter((r) => PUBLIC_KEYS.has(r.key)).map((r) => [r.key, r.value])
  )
})
