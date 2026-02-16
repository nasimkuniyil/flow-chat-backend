import 'dotenv/config';
import express from 'express';

import authRoutes from './routes/auth.route'
import messageRoutes from './routes/message.route'

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);
app.use('/api/messages ', messageRoutes);

app.listen(PORT, ()=> console.log('server started at '+PORT));