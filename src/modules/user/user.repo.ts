import { Types } from "mongoose";
import { IUserRepo } from "../../interfaces/repositories/IUserRepo";

import BaseRepo from "../../repositories/BaseRepo";
import User, { IUser } from "./user.model";

class UserRepo extends BaseRepo<IUser> implements IUserRepo {
    constructor() {
        super(User);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.model.findOne({ email });
    }

    async findByIdSecure(id: string | Types.ObjectId): Promise<IUser | null> {
        return await this.model.findById(id).select('-password')
    }
    async findAllUsers(id: string | Types.ObjectId): Promise<IUser[]> {
        return await this.model.find({ _id: { $ne: id } }).select('-password')
    }
}

export default new UserRepo();