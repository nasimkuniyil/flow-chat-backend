import IMessageRepo from "../../interfaces/repositories/IMessageRepo";
import BaseRepo from "../../repositories/BaseRepo";
import Message, { IMessage } from "./message.model";

class MessageRepo extends BaseRepo<IMessage> implements IMessageRepo{
    constructor(){
        super(Message);
    }
    async getMessagesByUserId(myId: string, userToChatId:string): Promise<IMessage[]> {
        return this.model.find({  : id }).sort({ createdAt: -1 }).exec();
    }
}

export default new MessageRepo();