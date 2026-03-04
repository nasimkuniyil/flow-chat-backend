import { Request, Response } from "express"

export default interface IAuthController {
    register(req: Request, res: Response): Promise<void>
    login(req: Request, res: Response): Promise<void>
    logout(req: Request, res: Response): Promise<void>
    updateAvatar(req: Request, res: Response): Promise<void>
}