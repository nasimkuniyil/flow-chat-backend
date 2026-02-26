import { Request, Response } from "express";
import { IUser } from "../../modules/user/user.model";

export interface IAuthService {
    register(data: Partial<IUser>): Promise<{ user: Partial<IUser>, token: string }>
    login(data: Partial<IUser>): Promise<{ user: Partial<IUser>; token: string }>
    logout(res:Response): Promise<void>
    updateAvatar(req:Request): Promise<void>
}