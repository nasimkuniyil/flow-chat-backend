import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserRepo } from "../modules/user/interfaces/IUserRepo";
import { AppError } from "../utils/appError.util";
import { HttpStatus } from "../constants/HttpStatus";
import { HttpResponse } from "../constants/HttpResponse";

export default class AuthMiddleware {

    constructor(private userRepo: IUserRepo) { }

    async protect(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.jwt;

            if (!token) {
                throw new AppError(
                    HttpResponse.NO_TOKEN,
                    HttpStatus.UNAUTHORIZED
                );
            }

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

            if (!decoded) {
                throw new AppError(
                    HttpResponse.TOKEN_EXPIRED,
                    HttpStatus.UNAUTHORIZED
                );
            }
            console.log('decoded : ', decoded)

            const user = await this.userRepo.findByIdSecure(decoded?.userId);
            if (!user) {
                throw new AppError(
                    HttpResponse.USER_NOT_FOUND,
                    HttpStatus.NOT_FOUND
                );
            }

            req.user = user;

            next();
        } catch (error: any) {
            console.error("protectRoute Error :", error);
            res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message || HttpResponse.SERVER_ERROR })
        }
    }
}