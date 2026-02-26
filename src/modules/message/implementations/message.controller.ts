import { Request, Response } from "express";
import IMessageController from "../interfaces/IMessageController";
import IMessageSevice from "../interfaces/IMessageService";

export default class MessageController implements IMessageController {

    constructor(private messageService: IMessageSevice) { }

    async getAllContacts(req: Request, res: Response): Promise<void> {
        const userId = req.user?._id;
        if (!userId) throw new Error("Unauthorized")
        const contacts = await this.messageService.getAllContacts(userId);
        res.status(200).json({ contacts });
    }

    async getMessagesByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.user?._id;
        if (!userId) throw new Error("Unauthorized")
        const { id } = req.params as { id: string };
        if (!id) throw new Error("id not available")
        await this.messageService.getMessagesByUserId(userId, id)
    }
}