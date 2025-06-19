import express from 'express';
import pool from '/workspaces/Moodi-Moo/database/db.ts';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('MOOOOOoo');
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
    return res.status(500).json({error: 'Internal Server Error'})
  }
});

app.put('/mood/:log_id', async (req, res) => {
  const log_id = req.params.log_id;
  const {mood, mood_rate, note, user_id } = req.body;
  
  let query = 'UPDATE mood_log SET';
  let updates = [];
  let values = [];
  let i = 1;

  if(!user_id) {  
    return res.status(400).json({error: "Missing user id"})
  }
  try {
    const check = await pool.query(
      'SELECT * FROM mood_log WHERE log_id = $1 AND user_id = $2',
      [log_id, user_id]
    );
    if (check.rows.length === 0) {
      return res.status(403).json({error: 'Not Authorized'});
    }
    if (mood !== undefined) {
      updates.push(`mood = $${i++}`);
      values.push(mood);
    }
    if (mood_rate !== undefined) {
      updates.push(`mood_rate = $${i++}`);
      values.push(mood_rate);
    }
    if (note !== undefined) {
      updates.push(`note = $${i++}`);
      values.push(note);
    }

    values.push(log_id)
    const updateQuery = `UPDATE mood_log SET ${updates.join(', ')} WHERE log_id = $${i}`;
    await pool.query(updateQuery, values);
    return res.status(200).json({200: 'Update successful'})
  } 
  catch (err) {
    console.error('Update Error: ', err);
    return res.status(500).json({error: 'Internal server error'});
  }
}) ;

app.get('/getmood/:date', async(req, res) => {
  const date = new Date()
  
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


