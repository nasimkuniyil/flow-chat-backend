import IMessageRepo from "../interfaces/IMessageRepo";
import { IUserRepo } from "../../user/interfaces/IUserRepo";
import IMessageSevice from "../interfaces/IMessageService";
import { IUser } from "../../user/user.model";
import { IMessage } from "../message.model";
import { Types } from "mongoose";

export default class MessageService implements IMessageSevice {
    private _messageRepo: IMessageRepo;
    private _userRepo: IUserRepo;

    constructor(messageRepo: IMessageRepo, userRepo: IUserRepo) {
        this._messageRepo = messageRepo;
        this._userRepo = userRepo
    }

    async getAllContacts(userId: Types.ObjectId | string): Promise<IUser[]> {
        if (!userId) {
            const err: any = new Error("User is missing");
            err.status = 400;
            throw err;
        }

        return await this._userRepo.findAllUsers(userId);
    }

    async getMessagesByUserId(userId: Types.ObjectId | string, userToChatId: Types.ObjectId | string): Promise<IMessage[]> {
        return await this._messageRepo.getMessagesByUserId(userId, userToChatId);
    }
}