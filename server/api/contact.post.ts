import { z } from 'zod'
import { useDb } from '../db'
import { contacts } from '../db/schema'

const schema = z.object({
  name: z.string().min(1).max(200).trim(),
  email: z.string().email().max(300).trim(),
  phone: z.string().max(50).trim().optional(),
  subject: z.string().max(200).trim().optional(),
  message: z.string().min(10).max(5000).trim(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.parse)
  const db = useDb()

  const [contact] = await db
    .insert(contacts)
    .values({
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      subject: body.subject ?? null,
      message: body.message,
    })
    .returning({ id: contacts.id })

  setResponseStatus(event, 201)
  return { success: true, id: contact.id }
})
