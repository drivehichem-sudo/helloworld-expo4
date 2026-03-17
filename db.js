import * as SQLite from 'expo-sqlite';

let db;

export async function initDB() {
  db = await SQLite.openDatabaseAsync('helloworld.db');
  await db.execAsync(
    'CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value INTEGER);'
  );
}

export async function getCount() {
  const row = await db.getFirstAsync('SELECT value FROM kv WHERE key = "count";');
  return row ? row.value : 0;
}

export async function setCount(val) {
  await db.runAsync(
    'INSERT OR REPLACE INTO kv (key, value) VALUES ("count", ?);',
    [val]
  );
}
