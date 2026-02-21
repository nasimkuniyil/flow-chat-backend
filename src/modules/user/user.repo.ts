import { IUser } from "../../interfaces/common.interfaces";
import { IUserRepo } from "../../interfaces/repositories/IUserRepo";

import BaseRepo from "../../repositories/BaseRepo";
import User from "./user.model";

export default class UserRepo extends BaseRepo<IUser> implements IUserRepo{
    constructor() {
        super(User);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.model.findOne({email});
    }
}