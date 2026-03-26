import { useDb } from '../../../db'
import { settings } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const db = useDb()
  const rows = await db.select().from(settings)
  return Object.fromEntries(rows.map((r) => [r.key, r.value]))
})
