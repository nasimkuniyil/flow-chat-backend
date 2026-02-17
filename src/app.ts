import 'dotenv/config';
import express from 'express';

import authRoutes from './routes/auth.route'
import messageRoutes from './routes/message.route'
import { connectDB } from './lib/db';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); //req.body

app.use('/api/auth', authRoutes);
app.use('/api/messages ', messageRoutes);

app.listen(PORT, ()=> {
    console.log('server started at '+PORT);
    connectDB();
});