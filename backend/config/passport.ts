import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import pool from './database/db';

dotenv.config();


passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENTID,
        clientSecret : process.env.CLIENTSECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        console.log('Profile:', profile);
        done(null, profile); 
    }
    )
)
