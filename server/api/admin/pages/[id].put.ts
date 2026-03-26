import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { useDb } from '../../../db'
import { pages } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

const schema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/).optional(),
  metaTitle: z.string().max(200).nullable().optional(),
  metaDescription: z.string().max(500).nullable().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
  template: z.string().nullable().optional(),
})

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readValidatedBody(event, schema.parse)
  const db = useDb()

  const [updated] = await db
    .update(pages)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(pages.id, id))
    .returning()

  if (!updated) throw createError({ statusCode: 404, message: 'Page introuvable' })
  return updated
})
