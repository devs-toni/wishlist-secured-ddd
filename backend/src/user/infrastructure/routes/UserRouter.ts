import { Router } from "express";
import { userController } from "../../../config/infrastructure";

export const userRouter: Router = Router();

userRouter.post("/save", (req, res) => userController.register);
userRouter.post("/login", (req, res) => userController.login);
userRouter.post("/verify", (req, res) => userController.verify);
