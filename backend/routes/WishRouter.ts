import { Router } from "express";
let wishRouter: Router = Router();

const WishController = require("../controllers/WishController");

wishRouter.put("/add", WishController.add);
wishRouter.post("/get/all", WishController.getAll);
wishRouter.delete("/remove", WishController.remove);
wishRouter.patch("/complete", WishController.complete);
wishRouter.post("/edit", WishController.edit);
wishRouter.patch("/recover", WishController.recover);
wishRouter.delete("/deleteCompleted", WishController.deleteCompleted);
wishRouter.patch("/recoverAll", WishController.recoverAll);
wishRouter.patch("/deleteAll", WishController.deleteAll);
wishRouter.delete("/empty", WishController.empty);

wishRouter.get("/search/:str", WishController.search)

/* userRouter.patch("/update_wishes", UserController.refreshWishes);
userRouter.post("/all_wishes", UserController.getAllWishes);
userRouter.patch("/update_trash", UserController.refreshTrash); */

module.exports = wishRouter;
