import { eq, desc } from 'drizzle-orm'
import { useDb } from '../../../db'
import { contacts } from '../../../db/schema'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const db = useDb()

  const query = getQuery(event)
  const status = query.status as string | undefined

  const rows = status
    ? await db.select().from(contacts).where(eq(contacts.status, status as 'unread' | 'read' | 'archived')).orderBy(desc(contacts.createdAt))
    : await db.select().from(contacts).orderBy(desc(contacts.createdAt))

  return rows
})
