import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { useDb } from '../../../db'
import { contacts } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

const schema = z.object({
  status: z.enum(['unread', 'read', 'archived']),
})

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readValidatedBody(event, schema.parse)
  const db = useDb()

  const [updated] = await db
    .update(contacts)
    .set({ status: body.status })
    .where(eq(contacts.id, id))
    .returning()

  if (!updated) throw createError({ statusCode: 404, message: 'Message introuvable' })
  return updated
})
