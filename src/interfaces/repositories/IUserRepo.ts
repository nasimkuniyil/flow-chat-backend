import { Types } from "mongoose";
import { IUser } from "../common.interfaces";
import { IBaseRepo } from "./IBaseRepo";

export interface IUserRepo extends IBaseRepo<IUser> {
    findByEmail(email: string): Promise<IUser | null>
    findByIdSecure(id:string | Types.ObjectId): Promise<IUser | null>
}