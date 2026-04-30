import { User } from '../models/user.model';
const pool = require('../config/database').pool;

export const findUserById = async (id: number): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
    const row = result.rows[0];


    if (!row) {
        return null;
    }

    return new User(
        row.user_id,
        row.username,
        row.email,
        row.password
    );
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    const row = result.rows[0];

    if (!row) {
        return null;
    }

    return new User(
        row.user_id,
        row.username,
        row.email,
        row.password
    );
}

export const createUser = async (username: string, email: string, password: string): Promise<User> => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password]
    );
    
    const row = result.rows[0];

    return new User(
        row.user_id,
        row.username,
        row.email,
        row.password
    );
}