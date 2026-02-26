import { Document, model, Model, Schema } from "mongoose";

export interface IMessage extends Document{
    senderId:Schema.Types.ObjectId;
    recieverId:Schema.Types.ObjectId;
    text:string;
    image:string;
}

const messageSchema = new Schema<IMessage>({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverId:{
        type:Schema.Types.ObjectId,
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

const Message:Model<IMessage> = model("Message", messageSchema);

export default Message;