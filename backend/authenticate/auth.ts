import express from 'express';
import bcrypt from 'bcryptjs';
import {findOrCreateUserGoogle} from '../../database/db';
import pool from '../../database/db';
import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { profile } from 'console';
dotenv.config();
const router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID as string,
    clientSecret: process.env.CLIENTSECRET as string,
    callbackURL: 'https://ominous-goggles-g5wrvrxwxx63vxgr-3000.app.github.dev/auth/google/callback',
},
async function(accessToken: any, refreshToken: any, profile: any, cb: any) {
    console.log(profile)
    try {
        const email = profile.emails?.[0]?.value;
        console.log(email)
        if(!email) return cb(new Error('no email provided'), false);
        const User = await findOrCreateUserGoogle(profile);
        if(User){
            return cb(null, User)
        } else {
            return cb(null, false)
        }
    } catch(err){
        return cb(err, false)
    }
}
))

router.post('/register', async (req: Request, res: Response): Promise<any> => {
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

router.post('/login', async (req: Request, res: Response): Promise<any> => {

});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
  console.log(profile);

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err:any, user:any, info:any) => {
    if (err) {
      console.error("❌ Error from Google Strategy:", err);
      return res.redirect('/login');
    }
    if (!user) {
      console.warn("⚠️ No user returned from Google. Info:", info);
      return res.redirect('/login');
    }

    // You can generate JWT here and respond accordingly
    console.log("✅ Google user:", user);
    res.redirect('/');
  })(req, res, next);
});
  
// router.get( '/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/google/success',
//         failureRedirect: '/google/failure'
// }));


  export default router;