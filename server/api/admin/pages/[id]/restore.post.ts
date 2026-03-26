import { eq } from 'drizzle-orm'
import { useDb } from '../../../../db'
import { pages, blocks } from '../../../../db/schema'
import { requireAuth } from '../../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const db = useDb()

  const page = await db.select().from(pages).where(eq(pages.id, id)).limit(1).then((r) => r[0])
  if (!page) throw createError({ statusCode: 404, message: 'Page introuvable' })
  if (!page.originalTemplate) throw createError({ statusCode: 400, message: 'Aucun template d\'origine à restaurer' })

  await db.delete(blocks).where(eq(blocks.pageId, id))

  const [updated] = await db
    .update(pages)
    .set({ template: page.originalTemplate, updatedAt: new Date() })
    .where(eq(pages.id, id))
    .returning()

  return updated
})
