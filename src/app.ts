import 'dotenv/config';
import express from 'express';

import authRoutes from './modules/auth/auth.route'
import messageRoutes from './modules/message/message.route'
import { connectDB } from './config/db';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); //req.body

app.use('/api/auth', authRoutes);
app.use('/api/messages ', messageRoutes);

connectDB()
    .then(() => app.listen(PORT, () => console.log('server started at ' + PORT)))
    .catch((error) => {
        console.error('Failed to connect mongodb : ', error);
        process.exit(1);
    })