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
import gameRoutes from './routes/game.route';

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/games', gameRoutes)

export default app;