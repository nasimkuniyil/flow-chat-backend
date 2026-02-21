import bcrypt from 'bcryptjs';
import { IUser } from "../../interfaces/common.interfaces";
import { IAuthService } from "../../interfaces/service/IAuthService";
import { IUserRepo } from "../../interfaces/repositories/IUserRepo";
import { generateToken } from '../../utils/jwt';

export default class AuthService implements IAuthService {

    constructor(private userRepo: IUserRepo) { }

    async register(data: Partial<IUser>): Promise<{ user: Partial<IUser>, token: string }> {

        const { fullName, email, password } = data;

        if (!fullName || !email || !password) {
            // return res.status(400).json({ message: "All fields are required" })
            throw new Error("All fields are required")
        }

        if (password.length < 6) {
            // return res.status(400).json({ message: "Password must be at least 6 characters" })
            throw new Error("Password must be at least 6 characters")
        }

        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(email)) {
            // return res.status(400).json({ message: "Invalid email" })
            throw new Error("Invalid email")
        }

        const user = await this.userRepo.findByEmail(email);
        if (user) {
            // return res.status(400).json({ message: "Email already exists" })
            throw new Error("Email already exists")
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

            // res.status(201).json({
            //     _id: newUser._id,
            //     fullName: newUser.fullName,
            //     email: newUser.email,
            //     avatar: newUser.avatar,
            // })

            const userData = {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                avatar: newUser.avatar,
            }

            return { user: userData, token }
        } else {
            // res.status(400).json({ message: "Invalid user data" })
            throw new Error('Invalid user data')
        }
    }

    async login(email: string, password: string): Promise<{ user: Partial<IUser>; token: string; }> {
        if (!email.trim() || !password.trim()) {
            throw new Error("Email and Password are required")
        }

        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new Error("Inavalid credentials")
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

    async logout(id: string): Promise<void> {

    }
}