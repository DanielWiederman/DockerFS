import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, 'migrations');

async function runMigrations(): Promise<void> {
  const client = await pool.connect();

  try {
    // Create a tracking table if it doesn't exist yet
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id         SERIAL PRIMARY KEY,
        filename   VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
      )
    `);

    const appliedResult = await client.query<{ filename: string }>(
      'SELECT filename FROM _migrations'
    );
    const applied = new Set(appliedResult.rows.map((r) => r.filename));

    const files = readdirSync(MIGRATIONS_DIR)
      .filter((f) => f.endsWith('.sql'))
      .sort(); // ensures 001_, 002_, ... order

    for (const file of files) {
      if (applied.has(file)) {
        console.log(`⏭️  Skipping (already applied): ${file}`);
        continue;
      }

      const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf8');

      await client.query('BEGIN');
      await client.query(sql);
      await client.query(
        'INSERT INTO _migrations (filename) VALUES ($1)',
        [file]
      );
      await client.query('COMMIT');

      console.log(`✅ Applied migration: ${file}`);
    }

    console.log('🎉 All migrations complete.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed, rolled back:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();
