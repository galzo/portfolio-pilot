import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any;

export const setupDatabase = async () => {
  db = await open({
    filename: process.env.DB_FILE || 'leaderboard.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      score INTEGER DEFAULT 0,
      wrong_attempts INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      flag TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  return db;
};

export const getDb = () => db;
