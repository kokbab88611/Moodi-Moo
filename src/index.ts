import express from 'express';
import db from '/workspaces/Moodi-Moo/database/db.js';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



app.post('/update', (req, res) => {
  const { mood, note } = req.body;
  const stmt = db.prepare(`INSERT INTO mood_entries (mood, log) VALUES (?, ?)`);
  stmt.run(mood, note, function (this: {lastID: number}, err: Error | null) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB insert failed' });
    }
    res.status(201).json({ id: this.lastID });
  });
});

