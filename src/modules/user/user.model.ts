import { Model, model, Schema, Document } from "mongoose";

export interface IUser extends Document{
    email: string;
    fullName: string;
    password: string;
    avatar?: string;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        avatar: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const User: Model<IUser> = model("User", userSchema);

export default User;