import IMessageRepo from "../../interfaces/repositories/IMessageRepo";
import { IUserRepo } from "../../interfaces/repositories/IUserRepo";
import IMessageSevice from "../../interfaces/service/IMessageService";
import { IUser } from "../user/user.model";
import { IMessage } from "./message.model";

export default class MessageService implements IMessageSevice {
    private _messageRepo: IMessageRepo;
    private _userRepo: IUserRepo;

    constructor(messageRepo: IMessageRepo, userRepo: IUserRepo) {
        this._messageRepo = messageRepo;
        this._userRepo = userRepo
    }

    async getAllContacts(req:Request): Promise<IUser[]> {
        if (!id) {
            const err: any = new Error("User is missing");
            err.status = 400;
            throw err;
        }

        return await this._userRepo.findAllUsers(id);
    }

    async getMessagesByUserId(userId, userToChatId): Promise<IMessage[]> {
        if (!myId) {
            const err: any = new Error("User is missing");
            err.status = 400;
            throw err;
        }

        return await this._messageRepo.findAll();
    }
}