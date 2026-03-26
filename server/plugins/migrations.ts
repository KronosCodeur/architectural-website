import Database from 'better-sqlite3'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineNitroPlugin(() => {
  const dbPath = process.env.DATABASE_PATH ?? './server/db/database.sqlite'
  const sqlite = new Database(dbPath)
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')

  const columns = (
    sqlite.prepare('PRAGMA table_info(__drizzle_migrations)').all() as { name: string }[]
  ).map((c) => c.name)

  if (columns.length > 0 && !columns.includes('name')) {
    sqlite.exec('DROP TABLE __drizzle_migrations')
  }

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS __drizzle_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      applied_at INTEGER NOT NULL DEFAULT (unixepoch())
    )
  `)

  const applied = new Set(
    (sqlite.prepare('SELECT name FROM __drizzle_migrations').all() as { name: string }[]).map(
      (r) => r.name,
    ),
  )

  const migrationsDir = resolve('./server/db/migrations')
  const sqlFiles = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  for (const file of sqlFiles) {
    if (applied.has(file)) continue

    const sql = readFileSync(resolve(migrationsDir, file), 'utf8')
    const statements = sql
      .split('--> statement-breakpoint')
      .map((s) => s.trim())
      .filter(Boolean)

    const runMigration = sqlite.transaction(() => {
      for (const stmt of statements) {
        try {
          sqlite.exec(stmt)
        } catch (e: unknown) {
          const msg = (e as Error).message ?? ''
          if (!msg.includes('already exists') && !msg.includes('duplicate column name')) throw e
        }
      }
      sqlite.prepare('INSERT OR IGNORE INTO __drizzle_migrations (name) VALUES (?)').run(file)
    })

    runMigration()
  }

  sqlite.close()
})
