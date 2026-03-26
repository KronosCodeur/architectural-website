import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { useDb } from '../../../db'
import { navigation } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

const schema = z.object({
  label: z.string().min(1).max(100).trim().optional(),
  url: z.string().min(1).max(500).trim().optional(),
  isActive: z.boolean().optional(),
  parentId: z.number().int().nullable().optional(),
})

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readValidatedBody(event, schema.parse)
  const db = useDb()

  const [updated] = await db.update(navigation).set(body).where(eq(navigation.id, id)).returning()
  if (!updated) throw createError({ statusCode: 404, message: 'Item introuvable' })
  return updated
})
