import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export async function findUserByID(id: number) {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', 
        [id]
    )
    return result.rows[0]
}

const pool = new Pool();
export default pool;