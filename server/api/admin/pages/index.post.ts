import { z } from 'zod'
import { useDb } from '../../../db'
import { pages } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

const schema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
})

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readValidatedBody(event, schema.parse)
  const db = useDb()

  const [page] = await db.insert(pages).values({
    title: body.title,
    slug: body.slug,
    metaTitle: body.metaTitle ?? null,
    metaDescription: body.metaDescription ?? null,
  }).returning()

  return page
})
