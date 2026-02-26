import { IMessage } from "../message.model";
import { IBaseRepo } from "../../../repositories/interface/IBaseRepo";
import { Types } from "mongoose";

export default interface IMessageRepo extends IBaseRepo<IMessage> {
    getMessagesByUserId(userId: Types.ObjectId | string, userToChatId: Types.ObjectId | string): Promise<IMessage[]>
}