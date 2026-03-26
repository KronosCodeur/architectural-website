import { eq, asc } from 'drizzle-orm'
import { useDb } from '../../../db'
import { blocks } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const pageId = Number(getRouterParam(event, 'pageId'))
  const db = useDb()

  return db.select().from(blocks).where(eq(blocks.pageId, pageId)).orderBy(asc(blocks.order))
})
