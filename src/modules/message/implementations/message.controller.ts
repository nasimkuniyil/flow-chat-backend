import { Request, Response } from "express";
import IMessageController from "../interfaces/IMessageController";
import IMessageSevice from "../interfaces/IMessageService";
import { AppError } from "../../../utils/appError.util";
import { HttpResponse } from "../../../constants/HttpResponse";
import { HttpStatus } from "../../../constants/HttpStatus";

export default class MessageController implements IMessageController {

    constructor(private messageService: IMessageSevice) { }

    async getAllContacts(req: Request, res: Response): Promise<void> {
        const userId = req.user?._id;
        if (!userId) throw new AppError(
            HttpResponse.UNAUTHORIZED,
            HttpStatus.UNAUTHORIZED
        );

        const contacts = await this.messageService.getAllContacts(userId);
        res.status(HttpStatus.OK).json({ contacts });
    }

    async getMessagesByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.user?._id;
        if (!userId) throw new AppError(
            HttpResponse.UNAUTHORIZED,
            HttpStatus.UNAUTHORIZED
        );

        const { id } = req.params as { id: string };
        if (!id) throw new AppError(
            HttpResponse.INVALID_ID,
            HttpStatus.BAD_REQUEST
        );

        const messages = await this.messageService.getMessagesByUserId(userId, id)

        res.status(HttpStatus.OK).json({ messages })
    }

    async getChatPartner(req: Request, res: Response): Promise<void> {
        const userId = req.user?._id;
        if (!userId) throw new AppError(
            HttpResponse.UNAUTHORIZED,
            HttpStatus.UNAUTHORIZED
        );

        const chatPartners = await this.messageService.getChatPartner(userId);
        res.status(HttpStatus.OK).json({ chatPartners })
    }

    async sendMessage(req: Request, res: Response): Promise<void> {
        const senderId = req.user?._id;
        if (!senderId) throw new AppError(
            HttpResponse.UNAUTHORIZED,
            HttpStatus.UNAUTHORIZED
        );

        const { id: recieverId } = req.params as { id: string };
        if (!recieverId) throw new AppError(
            HttpResponse.INVALID_ID,
            HttpStatus.BAD_REQUEST
        );

        const data = req.body;
        const newMessage = await this.messageService.sendMessage(senderId, recieverId, data);

        res.status(HttpStatus.CREATED).json({ newMessage })
    }
}