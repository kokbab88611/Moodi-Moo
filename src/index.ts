import express from 'express';
import pool from '/workspaces/Moodi-Moo/database/db.ts';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/update', async (req, res) =>{
const {mood, mood_rate, note} = req.body;
  if(!mood) {
    return res.status(400).json({error: 'Mood is required'});
  }

  try{
    const result = await pool.query('INSERT INTO mood_log (mood, mood_rate, note) VALUES ($1, $2, $3) RETURNING id',
      [mood, mood_rate, note]
    );
  } catch (error) {
    console.error('DB insert has failed: ', error);
    return res.state(500).json({error: 'DB insert has failed'});
  }
})

app.get('/mood', async (req, res) => {
  const userId = req.query.user_id;
  if(!userId) {
    return res.status(400).json({error: 'Missing user_id'});
  }
  try {
    const result = await pool.query(
      'SELECT * FROM mood_log WHERE user_id = $1',
    [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('DB query error:', error);
    res.status(500).json({error: 'Internal Server Error'})
  }
});

app.put('/mood/', async (req, res)=> {
  const 
}) 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


