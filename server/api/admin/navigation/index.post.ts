import { z } from 'zod'
import { useDb } from '../../../db'
import { navigation } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

const schema = z.object({
  label: z.string().min(1).max(100).trim(),
  url: z.string().min(1).max(500).trim(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  parentId: z.number().int().nullable().default(null),
})

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const body = await readValidatedBody(event, schema.parse)
  const db = useDb()

  const [item] = await db.insert(navigation).values(body).returning()
  setResponseStatus(event, 201)
  return item
})
