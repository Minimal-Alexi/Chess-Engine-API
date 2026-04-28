import { Pool } from 'pg';

// Create a new pool instance
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string) || 5432,
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('D: Successfully connected to the database');
    } catch (error) {
        console.error('E: Failed to connect to the database', error);
    }
};

export {
    connectDB,
    pool
}