import IMessageRepo from "../interfaces/IMessageRepo";
import { IUserRepo } from "../../user/interfaces/IUserRepo";
import IMessageSevice from "../interfaces/IMessageService";
import { IUser } from "../../user/user.model";
import { IMessage } from "../message.model";
import { Types } from "mongoose";
import cloudinary from "../../../config/cloudinary";

export default class MessageService implements IMessageSevice {
    private _messageRepo: IMessageRepo;
    private _userRepo: IUserRepo;

    constructor(messageRepo: IMessageRepo, userRepo: IUserRepo) {
        this._messageRepo = messageRepo;
        this._userRepo = userRepo
    }

    async getAllContacts(userId: Types.ObjectId | string): Promise<IUser[]> {
        return await this._userRepo.findAllUsers(userId);
    }

    async getMessagesByUserId(userId: Types.ObjectId | string, userToChatId: Types.ObjectId | string): Promise<IMessage[]> {
        return await this._messageRepo.getMessagesByUserId(userId, userToChatId);
    }

    async sendMessage(senderId: Types.ObjectId | string, recieverId: Types.ObjectId | string, data: any): Promise<IMessage> {

        if (!data) throw new Error("data is empty")

        let imageUrl;
        if (data?.image) {
            const uploadRes = await cloudinary.uploader.upload(data.image);
            imageUrl = uploadRes.secure_url;
        }

        const newMessage = await this._messageRepo.create({
            senderId,
            recieverId,
            image: imageUrl,
            text: data?.text
        })

        return newMessage;
    }
}