import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import pool from '../../database/db';
import { VerifyCallback } from 'jsonwebtoken';

dotenv.config();


passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENTID as string,
        clientSecret: process.env.CLIENTSECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        console.log('Profile:', profile);
        done(null, profile); 
    }
    )
)
