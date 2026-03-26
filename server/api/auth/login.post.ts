import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { useDb } from '../../db'
import { users } from '../../db/schema'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.parse)

  const db = useDb()
  const user = await db.query.users.findFirst({
    where: eq(users.email, body.email.toLowerCase()),
  })

  if (!user) {
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect' })
  }

  const valid = await bcrypt.compare(body.password, user.passwordHash)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect' })
  }

  await setUserSession(event, {
    user: { id: user.id, email: user.email, role: user.role },
  })

  return { ok: true }
})
