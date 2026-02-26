import 'dotenv/config';
import express from 'express';

import authRoutes from './modules/auth/auth.route'
import messageRoutes from './modules/message/message.route'
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); //req.body
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

connectDB()
    .then(() => app.listen(PORT, () => console.log('server started at ' + PORT)))
    .catch((error) => {
        console.error('Failed to connect mongodb : ', error);
        process.exit(1);
    })