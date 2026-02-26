import { Request, Response } from "express";
import IMessageController from "../../interfaces/controller/IMessageController";
import IMessageSevice from "../../interfaces/service/IMessageService";

export default class MessageController implements IMessageController {

    constructor(private messageService: IMessageSevice) { }

    async getAllContacts(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user._id;
            const contacts = await this.messageService.getAllContacts(userId);
            res.status(200).json({ contacts });
        } catch (error: any) {
            console.log('MessageController error - GETALLCONTACTS : ', error)
            res.status(error.status || 500).json({ error: error.message || "server error" });
        }
    }

    async getMessagesByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user._id;
            const params = req.params;
            await this.messageService.getMessagesByUserId(userId, params)
        } catch (error: any) {
            console.log('MessageController error - GETMESSAGEBYID : ', error)
            res.status(error.status || 500).json({ error: error.message || "server error" });
        }
    }
}