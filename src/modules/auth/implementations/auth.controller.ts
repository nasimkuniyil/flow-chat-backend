import { Request, Response } from "express";
import IAuthController from "../interfaces/IAuthController";
import { IAuthService } from "../interfaces/IAuthService";
import { HttpStatus } from "../../../constants/HttpStatus";
import { HttpResponse } from "../../../constants/HttpResponse";
import { AppError } from "../../../utils/appError.util";

export default class AuthController implements IAuthController {

    constructor(private authService: IAuthService) { }

    async register(req: Request, res: Response): Promise<void> {
        const registerData = req.body;
        const result = await this.authService.register(registerData);

        res.cookie('jwt', result.token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, //MS
            httpOnly: true, //prevent xss attacks
            // sameSite:'strict', //prevent CSRF attacks
            secure: process.env.NODE_ENV !== "development"
        })

        res.status(HttpStatus.CREATED).json({ 
            message: HttpResponse.REGISTRATION_SUCCESS,
            user: { ...result.user }
        })
    }
    async login(req: Request, res: Response): Promise<void> {

        const loginData = req.body
        const result = await this.authService.login(loginData);

        res.cookie('jwt', result.token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, //MS
            httpOnly: true, //prevent xss attacks
            // sameSite:'strict', //prevent CSRF attacks
            secure: process.env.NODE_ENV !== "development"
        })
        res.status(HttpStatus.OK).json({ 
            message: HttpResponse.LOGIN_SUCCESS,
            user: { ...result.user }
        })

    }

    async logout(req: Request, res: Response): Promise<void> {
        const cookieOptions = {
            httpOnly: true,
            // sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        }

        res.clearCookie("jwt", cookieOptions);
        res.status(HttpStatus.OK).json({ message: HttpResponse.LOGOUT_SUCCESS })
    }

    async updateAvatar(req: Request, res: Response): Promise<void> {
        const userId = req.user?._id;
        if (!userId) {
            throw new AppError(
                HttpResponse.UNAUTHORIZED,
                HttpStatus.UNAUTHORIZED
            );
        }

        const { avatar } = req.body;

        if (!avatar) {
            throw new AppError(
                HttpResponse.BAD_REQUEST,
                HttpStatus.BAD_REQUEST
            );
        }
        await this.authService.updateAvatar(userId, avatar);
        res.status(HttpStatus.OK).json({ message: HttpResponse.AVATAR_UPDATED_SUCCESS });
    }

}