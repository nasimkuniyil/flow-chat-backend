import { IMessage } from "../../modules/message/message.model";
import { IUser } from "../../modules/user/user.model";

export default interface IMessageSevice {
    getAllContacts(userId:string): Promise<IUser[]>
    getMessagesByUserId(userId:string, userToChatId:string): Promise<IMessage[]>
}