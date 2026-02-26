import { IMessage } from "../message.model";
import { IUser } from "../../user/user.model";
import { Types } from "mongoose";

export default interface IMessageSevice {
    getAllContacts(userId: Types.ObjectId | string): Promise<IUser[]>
    getMessagesByUserId(userId: Types.ObjectId | string, userToChatId: Types.ObjectId | string): Promise<IMessage[]>
    sendMessage(senderId: Types.ObjectId | string, recieverId: Types.ObjectId | string, data:any): Promise<IMessage>
}