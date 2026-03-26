import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { useDb } from '../db'

export default defineNitroPlugin(() => {
  migrate(useDb(), { migrationsFolder: './server/db/migrations' })
})
