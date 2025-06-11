const sqlite3 = require('sqlite3')
const path = require('pasth');

const db = new sqlite3.Database(path.resolve(__dirname, 'userdb.db'), (err) => {
    if (err) {
        console.error('DB error:', err.message);
    } else {
        console.log('Connected to the user database.');
    }});

db.run(`CREATE TABLE IF NOT EXISTS mood_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood INTEGER NOT NULL,
    note TEXT,
    timestamp DATETIME DEFAULT CURERNT_TIMESTAMP)`);

module.export = db;