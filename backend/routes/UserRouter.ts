import { Router } from "express";
let userRouter: Router = Router();

const UserController = require("../controllers/UserController");

userRouter.post("/save", UserController.save);
userRouter.post("/login", UserController.login);
userRouter.post("/verify", UserController.verify);

module.exports = userRouter;
