import { Request, Response } from "express";
import IAuthController from "../../interfaces/controller/IAuthController";
import { IAuthService } from "../../interfaces/service/IAuthService";

export default class AuthController implements IAuthController {

    constructor(private authService: IAuthService) { }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.authService.register(req.body);

            res.cookie('jwt', result.token, {
                maxAge: 7 * 24 * 60 * 60 * 1000, //MS
                httpOnly: true, //prevent xss attacks
                // sameSite:'strict', //prevent CSRF attacks
                secure: process.env.NODE_ENV !== "development"
            })

            res.status(201).json({ ...result.user })
        } catch (error: any) {
            console.error("auth.controller - REGISTER error: ", error);
            res.status(error.status || 500).json({ message: error.message || "server error" })
        }
    }
    async login(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.authService.login(req.body);

            res.cookie('jwt', result.token, {
                maxAge: 7 * 24 * 60 * 60 * 1000, //MS
                httpOnly: true, //prevent xss attacks
                // sameSite:'strict', //prevent CSRF attacks
                secure: process.env.NODE_ENV !== "development"
            })
            res.status(201).json({ ...result.user })
        } catch (error: any) {
            console.error("auth.controller - LOGIN error: ", error);
            res.status(error.status || 500).json({ message: error.message || "server error" })
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            this.authService.logout(res)
        } catch (error: any) {
            console.error("auth.controller - LOGOUT error: ", error);
            res.status(error.status || 500).json({ message: error.message || "server error" })
        }
    }
    
    async updateAvatar(req: Request, res: Response): Promise<void> {
        try {
            this.authService.updateAvatar(req)
            
        } catch (error:any) {
            console.error("auth.controller - UPDATEAVATAR error: ", error);
            res.status(error.status || 500).json({ message: error.message || "server error" })
        }
    }

}