import { Router } from "express";
let userRouter: Router = Router();

const UserController = require("../controllers/UserController");

userRouter.post("/save", UserController.save);
userRouter.post("/login", UserController.login);
userRouter.post("/verify", UserController.verify);
userRouter.patch("/update_wishes", UserController.refreshWishes);
userRouter.post("/all_wishes", UserController.getAllWishes);

module.exports = userRouter;
