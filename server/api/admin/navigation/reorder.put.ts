import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { useDb } from '../../../db'
import { navigation } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

const schema = z.object({
  items: z.array(z.object({ id: z.number().int(), order: z.number().int() })),
})

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readValidatedBody(event, schema.parse)
  const db = useDb()

  for (const item of body.items) {
    await db.update(navigation).set({ order: item.order }).where(eq(navigation.id, item.id))
  }

  return { success: true }
})
