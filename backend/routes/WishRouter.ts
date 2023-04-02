import { Router } from "express";
let wishRouter: Router = Router();

const WishController = require("../controllers/WishController");

wishRouter.put("/add", WishController.add);
wishRouter.post("/get/all", WishController.getAll);

/* userRouter.patch("/update_wishes", UserController.refreshWishes);
userRouter.post("/all_wishes", UserController.getAllWishes);
userRouter.patch("/update_trash", UserController.refreshTrash); */


module.exports = wishRouter;