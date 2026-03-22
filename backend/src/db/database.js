import Database from 'better-sqlite3'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

let db

export function getDb() {
  if (!db) {
    db = new Database(join(__dirname, '../../visa-tracker.db'))
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    runMigrations(db)
  }
  return db
}

function runMigrations(db) {
  const sql = readFileSync(join(__dirname, 'migrations/001_init.sql'), 'utf-8')
  db.exec(sql)
}
