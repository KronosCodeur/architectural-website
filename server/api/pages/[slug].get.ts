import { eq, asc } from 'drizzle-orm'
import { useDb } from '../../db'
import { pages, blocks } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const db = useDb()

  const page = await db.query.pages.findFirst({
    where: eq(pages.slug, slug),
  })

  if (!page || !page.isActive) {
    throw createError({ statusCode: 404, message: 'Page introuvable' })
  }

  const pageBlocks = await db
    .select()
    .from(blocks)
    .where(eq(blocks.pageId, page.id))
    .orderBy(asc(blocks.order))

  return { ...page, blocks: pageBlocks.filter((b) => b.isActive) }
})
