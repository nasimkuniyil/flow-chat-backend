import express, { Request, Response } from "express";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import UserRepo from "../user/user.repo";

const router = express.Router();

const userRepo = new UserRepo()
const authService = new AuthService(userRepo)
const authController = new AuthController(authService)

router.post('/signup', (req: Request, res: Response) => authController.register(req, res))
router.post('/login', (req: Request, res: Response) => authController.login(req, res))
router.post('/logout', (req: Request, res: Response) => authController.logout(req, res))

export default router;

