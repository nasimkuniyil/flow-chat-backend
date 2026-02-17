import { model, Mongoose, Schema } from "mongoose";

export interface IUser extends Mongoose {
    email: string;
    fullName: string;
    password: string;
    avatar: string;
    x: string;
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

const User = model("User", userSchema);

export default User;