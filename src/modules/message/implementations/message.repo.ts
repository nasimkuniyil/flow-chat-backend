import IMessageRepo from "../interfaces/IMessageRepo";
import BaseRepo from "../../../repositories/BaseRepo";
import Message, { IMessage } from "../message.model";
import { Types } from "mongoose";

class MessageRepo extends BaseRepo<IMessage> implements IMessageRepo {
    constructor() {
        super(Message);
    }
    async getMessagesByUserId(userId: Types.ObjectId | string, userToChatId: Types.ObjectId | string): Promise<IMessage[]> {
        const filter = {
            $or: [
                { senderId: userId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: userId },
            ]
        } as any

        return await this.model.find(filter).sort({ createdAt: -1 }).limit(10)
    }
}

export default new MessageRepo();