import Database from 'better-sqlite3'
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = process.env.DATABASE_PATH ?? './server/db/database.sqlite'
const migrationsDir = join(__dirname, '../server/db/migrations')

const db = new Database(dbPath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS __drizzle_migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    applied_at INTEGER NOT NULL DEFAULT (unixepoch())
  )
`)

const applied = new Set(
  db.prepare('SELECT name FROM __drizzle_migrations').all().map((r) => r.name),
)

const sqlFiles = readdirSync(migrationsDir)
  .filter((f) => f.endsWith('.sql'))
  .sort()

let count = 0
for (const file of sqlFiles) {
  if (applied.has(file)) continue

  const sql = readFileSync(join(migrationsDir, file), 'utf8')
  const statements = sql
    .split('--> statement-breakpoint')
    .map((s) => s.trim())
    .filter(Boolean)

  const runMigration = db.transaction(() => {
    for (const stmt of statements) {
      db.exec(stmt)
    }
    db.prepare('INSERT INTO __drizzle_migrations (name) VALUES (?)').run(file)
  })

  runMigration()
  console.log(`✓ Migration applied: ${file}`)
  count++
}

if (count === 0) {
  console.log('Database already up to date.')
} else {
  console.log(`${count} migration(s) applied.`)
}

db.close()
