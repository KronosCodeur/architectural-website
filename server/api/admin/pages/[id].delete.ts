import { eq } from 'drizzle-orm'
import { useDb } from '../../../db'
import { pages } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const db = useDb()

  const [deleted] = await db.delete(pages).where(eq(pages.id, id)).returning()
  if (!deleted) throw createError({ statusCode: 404, message: 'Page introuvable' })

  return { ok: true }
})
