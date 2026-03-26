import { asc, eq } from 'drizzle-orm'
import { useDb } from '../db'
import { navigation } from '../db/schema'

export default defineEventHandler(async () => {
  const db = useDb()
  return db
    .select()
    .from(navigation)
    .where(eq(navigation.isActive, true))
    .orderBy(asc(navigation.order))
})
