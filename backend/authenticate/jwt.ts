import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { dot } from 'node:test/reporters';
import { env } from 'process';

dotenv.config();

const JwtScret = process.env.JWT_SECRET as string;

export function generateToken(user_id: string, email: string, role: string = 'user'): string {
    const token = jwt.sign( 
        { user_id, email, role},
        JwtScret, 
        { algorithm: 'RS256' }
    );
    return token
}

export function verifyToken(token: string) {
    try {
    const result = jwt.verify(token, JwtScret);
    return result
    } catch (err){
        console.log("error", err);
    } 
}


