import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export async function findUserByEmail(email: string) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', 
        [email]
    )
    return result.rows[0]
}

export async function createUserGoogle(profile: any) {
    const userData = {
        google_id: profile.id,
        username: profile.displayname || '',
        email: profile.emails?.[0]?.value || '',
        auth_provider: 'google',
    };
    const result = await pool.query(`INSER INTO users (username, email, auth_provider)
        VALUES ($1, $2, $3)`,
        [userData.username, userData.email, userData.auth_provider]
    );
    return result.rows[0];
}
const pool = new Pool();
export default pool;