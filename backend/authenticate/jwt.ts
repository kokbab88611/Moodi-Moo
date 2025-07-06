import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JwtSecret = process.env.JWT_SECRET as string;

export interface JwtPayload {
    user_id: string
    user_name: string;
    email: string;
    role: string;
}

export function generateAccessToken(user_id: string, user_name: string, email: string, role: string = 'user'): string {
    const token = jwt.sign( 
        { user_id, user_name, email, role},
        JwtSecret, 
        { algorithm: 'HS256', expiresIn: "15m" }
    );
    return token
}

export function generateRefreshToken(user_id: string, user_name: string, email: string, role: string): string {
    const token = jwt.sign( 
        { user_id, user_name, email, role},
        JwtSecret, 
        { algorithm: 'HS256', expiresIn: "7d" }
    );
    return token
}

export function verifyToken(token: string):JwtPayload {
    try {
        return jwt.verify(token, JwtSecret) as JwtPayload;
    } catch (err){
        console.log("error", err);
        throw new Error('Unauthorised')
    } 
}


