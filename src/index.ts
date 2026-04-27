import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config({
  path: '.env',
});

const app = express();

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT || 8000, () => {
      console.log(`D: Server is running on port ${process.env.PORT || 8000}`);
    });

  } catch (error) {
    console.error('E: Failed to connect to the database. Server not started.', error);
    process.exit(1);
  }
}

startServer();