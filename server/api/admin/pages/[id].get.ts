import { eq, asc } from 'drizzle-orm'
import { useDb } from '../../../db'
import { pages, blocks } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))

  const db = useDb()
  const page = await db.query.pages.findFirst({ where: eq(pages.id, id) })
  if (!page) throw createError({ statusCode: 404, message: 'Page introuvable' })

  const pageBlocks = await db
    .select()
    .from(blocks)
    .where(eq(blocks.pageId, id))
    .orderBy(asc(blocks.order))

  return { ...page, blocks: pageBlocks }
})
