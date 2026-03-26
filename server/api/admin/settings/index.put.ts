import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { useDb } from '../../../db'
import { settings } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

const schema = z.record(z.string(), z.string())

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readValidatedBody(event, schema.parse)
  const db = useDb()

  for (const [key, value] of Object.entries(body)) {
    const existing = await db.select().from(settings).where(eq(settings.key, key)).limit(1)
    if (existing.length > 0) {
      await db.update(settings).set({ value }).where(eq(settings.key, key))
    } else {
      await db.insert(settings).values({ key, value })
    }
  }

  return { success: true }
})
