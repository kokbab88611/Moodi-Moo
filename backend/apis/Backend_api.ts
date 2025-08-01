import express from 'express';
import pool from '../../database/db';
import {requireAuth} from '../authenticate/auth'
import type { MoodSave } from '../../types';

const router = express.Router();

router.post('/addmood', async (req, res): Promise<any> =>{
    const {user_id, mood, hashtags, note=""}: MoodSave = req.body;
  if(!mood) {
    return res.status(400).json({error: 'Mood is required'});
  }
  try{
    const result = await pool.query('INSERT INTO mood_log (user_id, mood, hashtags, note) VALUES ($1, $2, $3, $4) RETURNING id',
      [user_id, mood, hashtags, note]
    );
  } catch (error) {
    console.error('DB insert has failed: ', error);
    return res.status(500).json({error: 'DB insert has failed'});
  }
})

router.get('/mood', async (req, res): Promise<any> => {
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

router.put('/mood/:log_id', async (req, res): Promise<any> => {
  const log_id = req.params.log_id;
  const {mood, hashtags, note, user_id } = req.body;
  
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
    if (hashtags !== undefined) {
      updates.push(`hashtags = $${i++}`);
      values.push(hashtags);
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

router.get('/getmood/:date', async(req, res) => {
  const date = new Date()
  
})

export default router;

