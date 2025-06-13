import path from 'path';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(path.resolve(__dirname, 'userdb.db'), (err) => {
    if (err) {
        console.error('DB error:', err.message);
    } else {
        console.log('Connected to the user database.');
    }});

db.run(`CREATE TABLE IF NOT EXISTS mood_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood INTEGER NOT NULL,
    log TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)`);

export default db;