import { Types } from "mongoose";
import { IBaseRepo } from "./IBaseRepo";
import { IUser } from "../../modules/user/user.model";

export interface IUserRepo extends IBaseRepo<IUser> {
    findByEmail(email: string): Promise<IUser | null>
    findByIdSecure(id:string | Types.ObjectId): Promise<IUser | null>
    findAllUsers(id:string | Types.ObjectId): Promise<IUser[]>
}