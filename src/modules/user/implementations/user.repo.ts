import { Types } from "mongoose";
import User, { IUser } from "../user.model";
import BaseRepo from "../../../repositories/BaseRepo";
import { IUserRepo } from "../interfaces/IUserRepo";

class UserRepo extends BaseRepo<IUser> implements IUserRepo {
    constructor() {
        super(User);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.model.findOne({ email });
    }

    async findByIdSecure(id: Types.ObjectId | string): Promise<IUser | null> {
        return await this.model.findById(id).select('-password')
    }
    async findAllUsers(id: Types.ObjectId | string): Promise<IUser[]> {
        return await this.model.find({ _id: { $ne: id } }).select('-password')
    }
}

export default new UserRepo();