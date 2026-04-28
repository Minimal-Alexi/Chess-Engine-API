import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

import app from './app';
import { connectDB } from './config/database';
import { PORT } from './config/constants';

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`D: Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('E: Failed to connect to the database. Server not started.', error);
    process.exit(1);
  }
}

startServer();