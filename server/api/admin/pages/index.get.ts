import { asc } from 'drizzle-orm'
import { useDb } from '../../../db'
import { pages } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const db = useDb()
  return db.select().from(pages).orderBy(asc(pages.order), asc(pages.id))
})
