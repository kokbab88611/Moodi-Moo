import bcrypt from 'bcryptjs';
import pool from '../../database/db';
import express, { Request, Response } from 'express';

const router = express.Router();

interface Mood{
    mood: string;
    moodRate: number;
    note?: string;
}

router.post('/createmood', (req: Request, res: Response): any => {
    const {mood, moodRate, note=""}: Mood = req.body;
    const newMood: Mood = {mood, moodRate, note};
    
    return res.status(201).json({
        message: 'Mood created Successfully!',
        mood: newMood
    });
});

export default router;