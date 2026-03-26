import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { requireAuth } from '../../utils/requireAuth'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE = 10 * 1024 * 1024

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const form = await readMultipartFormData(event)
  const file = form?.find((f) => f.name === 'file')

  if (!file?.data) throw createError({ statusCode: 400, message: 'Fichier manquant' })
  if (!ALLOWED_TYPES.includes(file.type ?? '')) {
    throw createError({ statusCode: 400, message: 'Type de fichier non autorisé' })
  }
  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 400, message: 'Fichier trop volumineux (max 10 Mo)' })
  }

  const ext = extname(file.filename ?? '.jpg')
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  const uploadsDir = join(process.cwd(), 'public', 'uploads')

  await mkdir(uploadsDir, { recursive: true })
  await writeFile(join(uploadsDir, name), file.data)

  return { url: `/uploads/${name}`, name }
})
