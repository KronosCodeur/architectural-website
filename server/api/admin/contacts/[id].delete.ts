import { eq } from 'drizzle-orm'
import { useDb } from '../../../db'
import { contacts } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const db = useDb()

  const [deleted] = await db
    .delete(contacts)
    .where(eq(contacts.id, id))
    .returning({ id: contacts.id })

  if (!deleted) throw createError({ statusCode: 404, message: 'Message introuvable' })
  return { success: true }
})
