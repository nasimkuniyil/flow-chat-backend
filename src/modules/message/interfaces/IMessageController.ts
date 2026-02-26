import { Request, Response } from "express";

export default interface IMessageController {
    getAllContacts(req: Request, res: Response): Promise<void>
    getMessagesByUserId(req: Request, res: Response): Promise<void>
    sendMessage(req: Request, res: Response): Promise<void>
}