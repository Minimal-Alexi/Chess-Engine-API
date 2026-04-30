import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

import requestLogger from './middleware/logger';
if(process.env.NODE_ENV !== 'test') {
    app.use(requestLogger)
}

import userRoutes from './routes/user.route';
app.use('/api/v1/users', userRoutes);

export default app;