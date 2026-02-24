import express, { Request, Response } from "express";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import userRepo from "../user/user.repo";
import { protectRoute } from "../../middlewares/auth.middlewares";

const router = express.Router();

const authService = new AuthService(userRepo)
const authController = new AuthController(authService)

router.post('/signup', (req: Request, res: Response) => authController.register(req, res))
router.post('/login', (req: Request, res: Response) => authController.login(req, res))
router.post('/logout', (req: Request, res: Response) => authController.logout(req, res))
router.put('/update-profile', protectRoute, (req: Request, res: Response) => authController.updateProfile(req, res))

export default router;

