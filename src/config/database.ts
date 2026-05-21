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
        pool.query("SELECT 1")
        console.log('D: Successfully connected to the database');
    } catch (error) {
        console.error('E: Failed to connect to the database', error);
    }
};

const closeDB = async() => {
    try{
        await pool.end();
        console.log('D: Successfully disconnected database');
    }catch(error){
        console.error("E: Failed closing DB", error)
    }
}

export {
    connectDB,
    closeDB,
    pool
}