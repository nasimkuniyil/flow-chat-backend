import bcrypt from 'bcryptjs';
import { IAuthService } from "../interfaces/IAuthService";
import { IUserRepo } from '../../user/interfaces/IUserRepo';
import { generateToken } from '../../../utils/jwt';
import { Request, Response } from 'express';
import cloudinary from '../../../config/cloudinary';
import { IUser } from '../../user/user.model';
import { Types } from 'mongoose';
import { AppError } from '../../../utils/appError.util';
import { HttpStatus } from '../../../constants/HttpStatus';
import { HttpResponse } from '../../../constants/HttpResponse';

export default class AuthService implements IAuthService {

    constructor(private userRepo: IUserRepo) { }

    async register(data: Partial<IUser>): Promise<{ user: Partial<IUser>, token: string }> {

        const fullName = data.fullName?.trim();
        const email = data.email?.trim();
        const password = data.password?.trim();

        if (!fullName || !email || !password) {
            throw new AppError(
                HttpResponse.MISSING_REQUIRED_FIELDS,
                HttpStatus.BAD_REQUEST
            );
        }

        if (password.length < 6) {
            throw new AppError(
                HttpResponse.PASSWORD_TOO_SHORT,
                HttpStatus.BAD_REQUEST
            );
        }

        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(email)) {
            throw new AppError(
                HttpResponse.INVALID_EMAIL,
                HttpStatus.BAD_REQUEST
            );
        }

        const user = await this.userRepo.findByEmail(email);
        if (user) {
            throw new AppError(
                HttpResponse.EMAIL_ALREADY_EXISTS,
                HttpStatus.BAD_REQUEST
            );
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
            throw new AppError(
                HttpResponse.INVALID_USER_DATA,
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async login(data: Partial<IUser>): Promise<{ user: Partial<IUser>; token: string; }> {
        const email = data.email?.trim()
        const password = data.password?.trim()

        if (!email || !password) {
            throw new AppError(
                HttpResponse.MISSING_REQUIRED_FIELDS,
                HttpStatus.BAD_REQUEST
            );
        }

        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new AppError(
                HttpResponse.INVALID_CREDENTIALS,
                HttpStatus.BAD_REQUEST
            );
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new AppError(
                HttpResponse.INVALID_CREDENTIALS,
                HttpStatus.BAD_REQUEST
            );
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

    async logout(): Promise<void> { }

    async updateAvatar(userId: Types.ObjectId | string, avatar: string): Promise<void> {
        const uploadRes = await cloudinary.uploader.upload(avatar);
        const updatedUser = await this.userRepo.updateById(userId, { avatar: uploadRes.secure_url })
        console.log("avatar updated : ", updatedUser);
    }
}