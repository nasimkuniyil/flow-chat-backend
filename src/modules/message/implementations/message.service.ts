import IMessageRepo from "../interfaces/IMessageRepo";
import { IUserRepo } from "../../user/interfaces/IUserRepo";
import IMessageSevice from "../interfaces/IMessageService";
import { IUser } from "../../user/user.model";
import { IMessage } from "../message.model";
import { Types } from "mongoose";
import cloudinary from "../../../config/cloudinary";
import { HttpResponse } from "../../../constants/HttpResponse";
import { HttpStatus } from "../../../constants/HttpStatus";
import { AppError } from "../../../utils/appError.util";

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

    async getChatPartner(userId: Types.ObjectId | string): Promise<IUser[]> {
        const allMessages = await this._messageRepo.getAllUserMessages(userId);
        const chatPartnerIds = [...new Set(allMessages.map(({ senderId, recieverId }) => (senderId.toString() == userId.toString()) ? recieverId.toString() : senderId.toString()))]
        const chatPartners = await this._userRepo.findChatPartners(chatPartnerIds);

        console.log(chatPartners);
        return chatPartners;
    }

    async sendMessage(senderId: Types.ObjectId | string, recieverId: Types.ObjectId | string, data: any): Promise<IMessage> {

        const recieverIdExists = await this._userRepo.isUserExists(recieverId);

        if (!recieverIdExists) throw new AppError(
                    HttpResponse.USER_NOT_FOUND,
                    HttpStatus.NOT_FOUND
                );

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