import { eq } from 'drizzle-orm'
import { useDb } from '../../../db'
import { navigation } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const db = useDb()

  const [deleted] = await db.delete(navigation).where(eq(navigation.id, id)).returning({ id: navigation.id })
  if (!deleted) throw createError({ statusCode: 404, message: 'Item introuvable' })
  return { success: true }
})
