import express, { NextFunction, Request, Response } from "express";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import userRepo from "../user/user.repo";
import AuthMiddleware from "../../middlewares/auth.middlewares";

const router = express.Router();

const authMiddleware = new AuthMiddleware(userRepo);
const authService = new AuthService(userRepo)
const authController = new AuthController(authService)

router.post('/signup', (req: Request, res: Response) => authController.register(req, res))
router.post('/login', (req: Request, res: Response) => authController.login(req, res))
router.post('/logout', (req: Request, res: Response) => authController.logout(req, res))
router.put('/update-profile', (req: Request, res: Response, next:NextFunction)=>authMiddleware.protect(req,res,next), (req: Request, res: Response) => authController.updateAvatar(req, res))
router.get('/check', (req: Request, res: Response, next:NextFunction)=>authMiddleware.protect(req,res,next), (req:Request, res:Response)=> res.status(200).json(req.user))

export default router;

