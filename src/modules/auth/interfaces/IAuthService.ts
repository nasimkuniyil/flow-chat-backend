import { Request, Response } from "express";
import { IUser } from "../../user/user.model";
import { Types } from "mongoose";

export interface IAuthService {
    register(data: Partial<IUser>): Promise<{ user: Partial<IUser>, token: string }>
    login(data: Partial<IUser>): Promise<{ user: Partial<IUser>; token: string }>
    logout(): Promise<void>
    updateAvatar(userId: Types.ObjectId | string, avatar: string): Promise<void>
}