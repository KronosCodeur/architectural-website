import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { requireAuth } from '../../../utils/requireAuth'

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const uploadsDir = join(process.cwd(), 'public', 'uploads')

  try {
    const files = readdirSync(uploadsDir)
      .filter((f) => !f.startsWith('.') && IMAGE_EXTS.some((e) => f.toLowerCase().endsWith(e)))
      .map((name) => {
        const stat = statSync(join(uploadsDir, name))
        return { name, url: `/uploads/${name}`, size: stat.size, createdAt: stat.birthtime }
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return files
  } catch {
    return []
  }
})
