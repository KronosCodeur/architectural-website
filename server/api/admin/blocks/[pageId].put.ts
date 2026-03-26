import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { useDb } from '../../../db'
import { blocks } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

const blockSchema = z.object({
  id: z.number().int().nullish(),
  type: z.string().min(1),
  content: z.any(),
  order: z.number().int(),
  isActive: z.union([z.boolean(), z.number()]).transform(Boolean).default(true),
})

const schema = z.object({
  blocks: z.array(blockSchema),
})

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const pageId = Number(getRouterParam(event, 'pageId'))
  const rawBody = await readBody(event)
  const parsed = schema.safeParse(rawBody)
  if (!parsed.success) {
    console.error('[blocks PUT] Validation error:', JSON.stringify(parsed.error.flatten(), null, 2))
    throw createError({ statusCode: 400, message: 'Validation Error', data: parsed.error.flatten() })
  }
  const { blocks: incoming } = parsed.data
  const db = useDb()

  await db.delete(blocks).where(eq(blocks.pageId, pageId))

  if (incoming.length === 0) return []

  const inserted = await db
    .insert(blocks)
    .values(
      incoming.map((b, i) => ({
        pageId,
        type: b.type,
        content: b.content,
        order: i,
        isActive: b.isActive,
      })),
    )
    .returning()

  return inserted
})
