import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,}
);

export async function findUserByEmail(email: string) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', 
        [email]
    )
    return result.rows[0] || null
}

export async function findOrCreateUserGoogle(profile: any) {
    const userData = {
        google_id: profile.id,
        username: profile.displayName || '',
        email: profile.emails?.[0]?.value || '',
        auth_provider: 'google',
    };
    const findUser = await pool.query('SELECT * FROM users WHERE email = $1', 
        [userData.email]
    );
    if(findUser.rows.length > 0) {
        return findUser.rows[0];
    }

    const insertUser = await pool.query(
        `INSERT INTO users (username, email, auth_provider)
        VALUES ($1, $2, $3) 
        RETURNING *`,
        [userData.username, userData.email, userData.auth_provider]
    );
    return userData;
}


export default pool;