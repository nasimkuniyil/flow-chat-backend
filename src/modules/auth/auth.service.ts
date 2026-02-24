import bcrypt from 'bcryptjs';
import { IUser } from "../../interfaces/common.interfaces";
import { IAuthService } from "../../interfaces/service/IAuthService";
import { IUserRepo } from "../../interfaces/repositories/IUserRepo";
import { generateToken } from '../../utils/jwt';
import { Request, Response } from 'express';
import cloudinary from '../../config/cloudinary';

export default class AuthService implements IAuthService {

    constructor(private userRepo: IUserRepo) { }

    async register(data: Partial<IUser>): Promise<{ user: Partial<IUser>, token: string }> {

        const fullName = data.fullName?.trim();
        const email = data.email?.trim();
        const password = data.password?.trim();

        if (!fullName || !email || !password) {
            const err: any = new Error("All fields are required");
            err.status = 400;
            throw err;
        }

        if (password.length < 6) {
            const err: any = new Error("Password must be at least 6 characters")
            err.status = 400;
            throw err;
        }

        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(email)) {
            const err: any = new Error("Invalid email")
            err.status = 400;
            throw err;
        }

        const user = await this.userRepo.findByEmail(email);
        if (user) {
            const err: any = new Error("Email already exists")
            err.status = 400;
            throw err;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await this.userRepo.create({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            const token = generateToken(newUser._id);

            const userData = {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                avatar: newUser.avatar,
            }

            return { user: userData, token }
        } else {
            const err: any = new Error('Invalid user data')
            err.status = 400;
            throw err;
        }
    }

    async login(data: Partial<IUser>): Promise<{ user: Partial<IUser>; token: string; }> {
        const email = data.email?.trim()
        const password = data.password?.trim()

        if (!email || !password) {
            const err: any = new Error("Email and Password are required")
            err.status = 400;
            throw err;
        }

        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            const err: any = new Error("Invalid credentials")
            err.status = 400;
            throw err;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            const err: any = new Error("Inavalid credentials")
            err.status = 400;
            throw err;
        }

        const token = generateToken(user._id);
        const userData = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
        }

        return { user: userData, token }
    }

    async logout(res: Response): Promise<void> {
        const cookieOptions = {
            httpOnly: true,
            // sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        }

        res.clearCookie("jwt", cookieOptions);
        res.status(200).json({ message: "Logged out successfully" })
    }

    async updateAvatar(req: Request): Promise<void> {
        const { avatar } = req.body;
        if (avatar) {
            const err: any = new Error("Profile pic is required");
            err.status = 400;
            throw err;
        }

        if(!req.user){
            const err:any = new Error("user is missing")
            err.status = 400;
            throw err;
        }

        const userId = req.user._id;
        const uploadRes = await cloudinary.uploader.upload(avatar);
        const updatedUser = await this.userRepo.updateById(userId,  {avatar:uploadRes.secure_url})
        console.log("avatar updated : ",updatedUser);
    }
}