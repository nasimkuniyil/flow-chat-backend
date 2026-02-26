import express, { NextFunction, Request, Response } from 'express';
import AuthMiddleware from '../../middlewares/auth.middlewares';
import userRepo from '../user/user.repo';
import MessageService from './message.service';
import messageRepo from './message.repo';
import MessageController from './message.controller';

const authMiddleware = new AuthMiddleware(userRepo);
const messageService = new MessageService(messageRepo, userRepo);
const messageController = new MessageController(messageService);

const router = express.Router();

router.get('/contacts', (req: Request, res: Response, next:NextFunction)=>authMiddleware.protect(req,res,next), (req:Request, res:Response)=> messageController.getAllContacts(req, res))
router.get('/:id', (req: Request, res: Response, next:NextFunction)=>authMiddleware.protect(req,res,next), (req:Request, res:Response)=> messageController.getAllContacts(req, res))


router.get('/send', (req, res) => {
    res.status(200).json({message:'message send endpoint'})
})

export default router;