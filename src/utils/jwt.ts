import { type Response } from 'express'
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (userId: Types.ObjectId) => {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured  ");
    }

    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d"
    })

    return token;
}