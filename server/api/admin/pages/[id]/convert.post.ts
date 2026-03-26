import { eq } from 'drizzle-orm'
import { useDb } from '../../../../db'
import { pages, blocks } from '../../../../db/schema'
import { requireAuth } from '../../../../utils/requireAuth'
import { getDefaultBlocks } from '../../../../utils/defaultBlocks'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const db = useDb()

  const page = await db.select().from(pages).where(eq(pages.id, id)).limit(1).then((r) => r[0])
  if (!page) throw createError({ statusCode: 404, message: 'Page introuvable' })
  if (!page.template) throw createError({ statusCode: 400, message: 'Page déjà en mode blocs' })

  const defaultBlocks = getDefaultBlocks(page.template)

  await db.delete(blocks).where(eq(blocks.pageId, id))

  if (defaultBlocks.length > 0) {
    await db.insert(blocks).values(
      defaultBlocks.map((b) => ({ ...b, pageId: id }))
    )
  }

  const [updated] = await db
    .update(pages)
    .set({ template: null, originalTemplate: page.originalTemplate ?? page.template, updatedAt: new Date() })
    .where(eq(pages.id, id))
    .returning()

  return updated
})
