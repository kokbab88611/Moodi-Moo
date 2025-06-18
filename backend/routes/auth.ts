import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db';

const router = express.Router();

router.post('/register', async (req, res) => {
    const {email, password, name} = req.body;
    if(!email || !password || !name){
        return res.status(400).jspm({error: 'Missing fields'});

    try {
        const hashed = await bcrypt.hash(password, 10)
    }
    }

})