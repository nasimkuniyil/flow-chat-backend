import { Types } from "mongoose";
import { IBaseRepo } from "../../../repositories/interface/IBaseRepo";
import { IUser } from "../user.model";

export interface IUserRepo extends IBaseRepo<IUser> {
    findByEmail(email: string): Promise<IUser | null>
    findByIdSecure(id: Types.ObjectId | string): Promise<IUser | null>
    findAllUsers(id: Types.ObjectId | string): Promise<IUser[]>
}