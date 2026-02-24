import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userRepo from "../modules/user/user.repo";
import { IUserRepo } from "../interfaces/repositories/IUserRepo";

export default class AuthMiddleware {

    constructor(private userRepo: IUserRepo) { }

    async protect(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.jwt;

            if (!token) {
                const err: any = new Error("Unauthorized - No token provided");
                err.status = 401;
                throw err;
            }

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

            if (!decoded) {
                const err: any = new Error("Unauthorized - Invalid token");
                err.status = 401;
                throw err;
            }
            console.log('decoded : ', decoded)

            const user = await userRepo.findById(decoded?.userId);
            if (!user) {
                const err: any = new Error("User not found");
                err.status = 404;
                throw err;
            }

            req.user = user;

            next();
        } catch (error: any) {
            console.error("protectRoute Error :", error);
            res.status(error.status || 500).json({ message: error.message || 'server error' })
        }
    }
}