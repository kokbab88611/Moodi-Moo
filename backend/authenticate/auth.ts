import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import {findOrCreateUserGoogle} from '../../database/db';
import {generateAccessToken, generateRefreshToken, verifyToken} from './jwt';
import pool from '../../database/db';
import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import dotenv from 'dotenv';
import type {User} from '../../types'
import { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload
}

dotenv.config();
const router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID as string,
    clientSecret: process.env.CLIENTSECRET as string,
    callbackURL: 'https://ominous-goggles-g5wrvrxwxx63vxgr-3000.app.github.dev/auth/google/callback',
    },
    async function(accessToken: any, refreshToken: any, profile: any, cb: any) {
        try {
            const email = profile.emails?.[0]?.value;
            if(!email) return cb(new Error('no email provided'), false);
            const User = await findOrCreateUserGoogle(profile);
            console.log(User)
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

router.get('/me', requireAuth ,async (req:AuthenticatedRequest, res) => {
    try{
        const user_email = req.user?.email;
        if(!user_email){
            res.status(404).json({error: 'Token not valid (email not included)'})
        }
        
        const result = await pool.query(
        'SELECT user_id, user_name, email, joined_at, auth_provider FROM users WHERE email = $1',
        [user_email]
        );

        if(result.rows.length === 0) {
            res.status(404).json({error: 'User not found'})
            return;
        }
        const user = result.rows[0];
        const userinfo: User = {
            user_id: user.user_id,
            user_name: user.user_name,
            email: user.email,
            joined_at: user.joined_at,
            role: user.role ?? undefined,
            profileImage: user.profile_image ?? undefined, 
        }
        res.json(userinfo);
    } catch(err) {
        console.error('Error fetching user data', err);
        res.status(500).json({error: 'Internal server error'})
    }
})

export function requireAuth (req: Request, res: Response, next: NextFunction):void {
    const token = req.cookies?.accessToken;
    if(!token) {
        res.status(401).json({error: 'Missing Access token'});
        return ;
        }
    try{  
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch(err){
        res.status(403).json({error: 'Invalid token'});
        return ;
    }
}

router.post('/register', async (req: Request, res: Response): Promise<any> => {
    const {email, password, user_name} = req.body;
    if (!email || !password || !user_name){
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
            'INSERT INTO users (email, password_hash, user_name) VALUES ($1, $2, $3)',
            [email, hashed, user_name]
        ) 
        return res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
});

router.get('/check', (req: Request, res: Response): any => {
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({message: 'Unauthorised'})
    }
    try {
        const decoded = verifyToken(token);
        res.json({user: decoded});
    } catch (err) {
        res.status(403).json({message: 'Invalid Token'})
    }
})

router.post('/login', async (req: Request, res: Response): Promise<any> => {

});

router.post('/logout', (req: Request, res: Response) => {
    req.logout(function(err){
        if(err){
            return(err);
        }
    });
    console.log('Logged Out')
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/')
});

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    }));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err:any, user:any, info:any) => {
    if (err) {
      console.error(" Error from Google Strategy:", err);
      return res.redirect('/login');
    }
    if (!user) {
      console.warn("No user returned from Google. Info:", info);
      return res.redirect('/login');
    }
    // You can generate JWT here and respond accordingly

    const accessToken = generateAccessToken(user.user_id, user.user_name, user.email, 'user');
    const refreshToken = generateRefreshToken(user.user_id, user.user_name, user.email, 'user');

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    const frontendOrigin = 'https://ominous-goggles-g5wrvrxwxx63vxgr-5173.app.github.dev';
    res.send(`
    <html>
        <head><title>Logging in...</title></head>
        <body>
        <script>
            window.opener.postMessage({ success: true }, "${frontendOrigin}");
            window.close();
        </script>
        <p>Logging in...</p>
        </body>
    </html>
    `);

  })(req, res, next);
});

router.post('/refresh', async (req: Request, res: Response): Promise<any> => {
    const token = req.cookies.refreshToken;
    if(!token){
        return res.sendStatus(401);
    }
    try{
        const decoded = verifyToken(token) as { user_id: string, user_name: string,  email: string };
        const newAccessToken = generateAccessToken(decoded.user_id, decoded.user_name, decoded.email);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });
        res.json({msg: 'Access token refreshed'});
    } catch (err){
        console.error("err: ", err);
        res.status(403).json ({error: "invalid refresh token"});
    }
})
  export default router;