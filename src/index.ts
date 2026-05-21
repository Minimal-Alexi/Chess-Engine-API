import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import app from './app';
import { closeDB, connectDB } from './config/database';
import { PORT } from './config/constants';
import { Server, IncomingMessage, ServerResponse } from 'node:http';

let server: Server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`D: Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('E: Failed to connect to the database. Server not started.', error);
    process.exit(1);
  }
};

const shutdown = async () => {
  console.log("D: Shutting down.");

  if (server) {
    server.close();
  }

  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();