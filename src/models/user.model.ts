const pool = require('../config/database').pool;

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

export const createUser = async (username: string, email: string, password: string): Promise<User> => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password]
    );
    return result.rows[0];
}

