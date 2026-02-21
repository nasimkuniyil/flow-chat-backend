import { Request, Response } from "express";
import User from "../user/user.model";
import bcrypt from 'bcryptjs';
import { generateToken } from "../../utils/jwt";

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;

        

        

    } catch (error) {
        console.error('Error in signup controller :', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required." })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        generateToken(user._id);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
        })
    } catch (error) {
        console.error('sigin controller error : ', error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = (_: Request, res: Response) => {
    const cookieOptions = {
        httpOnly: true,
        // sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    }

    res.clearCookie("jwt", cookieOptions);
    res.status(200).json({ message: "Logged out successfully" })
}