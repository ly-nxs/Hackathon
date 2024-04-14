import { Database } from 'sqlite3';

export const db = new Database('./players.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS players(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    streak INTEGER NOT NULL DEFAULT 0
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Player table created.');
});