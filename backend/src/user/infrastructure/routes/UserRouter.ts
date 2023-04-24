import { Router } from "express";
import { UserController } from "../controller/UserController";

export const userRouter: Router = Router();

userRouter.post("/", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.post("/verify", UserController.verify);
