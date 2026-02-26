import { IMessage } from "../../modules/message/message.model";
import { IBaseRepo } from "./IBaseRepo";

export default interface IMessageRepo extends IBaseRepo<IMessage> {
    getMessagesByUserId(myId: string, userToChatId: string): Promise<IMessage[]>
}