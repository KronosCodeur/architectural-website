import { asc } from 'drizzle-orm'
import { useDb } from '../../../db'
import { navigation } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const db = useDb()
  return db.select().from(navigation).orderBy(asc(navigation.order))
})
