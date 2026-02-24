import express, { Request, Response } from "express";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import userRepo from "../user/user.repo";
import AuthMiddleware from "../../middlewares/auth.middlewares";

const router = express.Router();

const authService = new AuthService(userRepo)
const authController = new AuthController(authService)
const authMiddleware = new AuthMiddleware(userRepo);

router.post('/signup', (req: Request, res: Response) => authController.register(req, res))
router.post('/login', (req: Request, res: Response) => authController.login(req, res))
router.post('/logout', (req: Request, res: Response) => authController.logout(req, res))
router.put('/update-profile', authMiddleware.protect, (req: Request, res: Response) => authController.updateAvatar(req, res))

export default router;

