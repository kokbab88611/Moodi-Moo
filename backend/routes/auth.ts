import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './database/db';
import passport from 'passport'
import { Request, Response } from 'express';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const {email, password, username} = req.body;
    if (!email || !password || !username){
        return res.status(400).json({error: 'Missing fields'});
    }
    try {
        const userEmailCheck = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        if (userEmailCheck.rows.length > 0 ) {
            return res.status(400).json({ error: 'Email already used'})
        }
        const hashed = await bcrypt.hash(password, 10)
        await pool.query(
            'INSERT INTO users (email, password_hash, username) VALUES ($1, $2, $3)',
            [email, hashed, username]
        ) 
        return res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
});

router.post('/login', async (req: Request, res: Response) => {

});

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  export default router;