import { Document, model, Model, Schema } from "mongoose";

export interface IMessage extends Document{
    senderId:Schema.Types.ObjectId | string;
    recieverId:Schema.Types.ObjectId | string;
    text:string;
    image:string;
}

const messageSchema = new Schema<IMessage>({
    senderId:{
        type:Schema.Types.ObjectId | string,
        ref:"User",
        required:true
    },
    recieverId:{
        type:Schema.Types.ObjectId | string,
        ref:"User",
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String
    }
}, {timestamps:true});

const Message:Model<IMessage> = model<IMessage>("Message", messageSchema);

export default Message;