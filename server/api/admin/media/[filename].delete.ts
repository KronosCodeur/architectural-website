import { unlink } from 'fs/promises'
import { join, basename } from 'path'
import { requireAuth } from '../../../utils/requireAuth'

export default defineEventHandler(async (event) => {
  await requireAuth(event)

  const filename = basename(getRouterParam(event, 'filename') ?? '')
  if (!filename) throw createError({ statusCode: 400, message: 'Nom de fichier invalide' })

  const filePath = join(process.cwd(), 'public', 'uploads', filename)

  try {
    await unlink(filePath)
    return { ok: true }
  } catch {
    throw createError({ statusCode: 404, message: 'Fichier introuvable' })
  }
})
