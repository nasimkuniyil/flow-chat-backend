import { type Response } from 'express'
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (userId: Types.ObjectId, res: Response) => {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured  ");
    }

    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //prevent xss attacks
        // sameSite:'strict', //prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}