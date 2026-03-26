import type { H3Event } from 'h3'

export async function requireAuth(event: H3Event) {
  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Non authentifié' })
  }
  return session.user
}

export async function requireSuperAdmin(event: H3Event) {
  const user = await requireAuth(event)
  if (user.role !== 'super_admin') {
    throw createError({ statusCode: 403, message: 'Accès refusé' })
  }
  return user
}
