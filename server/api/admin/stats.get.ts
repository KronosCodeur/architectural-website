import { count, eq } from 'drizzle-orm'
import { useDb } from '../../db'
import { pages, blocks, contacts } from '../../db/schema'
import { requireAuth } from '../../utils/requireAuth'
import { readdirSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const db = useDb()

  const [pagesCount] = await db.select({ count: count() }).from(pages)
  const [blocksCount] = await db.select({ count: count() }).from(blocks)
  const [unreadCount] = await db
    .select({ count: count() })
    .from(contacts)
    .where(eq(contacts.status, 'unread'))

  let mediaCount = 0
  try {
    const uploadsPath = join(process.cwd(), 'public', 'uploads')
    mediaCount = readdirSync(uploadsPath).filter((f) => !f.startsWith('.')).length
  } catch {}

  return {
    pages: pagesCount.count,
    blocks: blocksCount.count,
    unreadContacts: unreadCount.count,
    media: mediaCount,
  }
})
