import express from 'express';
const app = express();

app.use(express.json());

import userRoutes from './routes/user.route';
app.use('/api/v1/users', userRoutes);

export default app;