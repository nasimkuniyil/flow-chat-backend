import { Request, Response } from "express";
import IAuthController from "../interfaces/IAuthController";
import { IAuthService } from "../interfaces/IAuthService";

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

        res.status(201).json({ ...result.user })
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
        res.status(200).json({ ...result.user })

    }

    async logout(req: Request, res: Response): Promise<void> {
        const cookieOptions = {
            httpOnly: true,
            // sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        }

        res.clearCookie("jwt", cookieOptions);
        res.status(200).json({ message: "Logged out successfully" })
    }

    async updateAvatar(req: Request, res: Response): Promise<void> {
        const userId = req.user?._id;
        if (!userId) {
            const err: any = new Error("user is missing")
            err.status = 400;
            throw err;
        }

        const { avatar } = req.body;

        if (!avatar) {
            const err: any = new Error("Profile pic is required");
            err.status = 400;
            throw err;
        }
        await this.authService.updateAvatar(userId, avatar);
    }

}