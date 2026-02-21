import { Model, model, Schema } from "mongoose";
import { IUser } from "../../interfaces/common.interfaces";

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

const User:Model<IUser> = model("User", userSchema);

export default User;