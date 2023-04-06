import { Router } from "express";
import { WishController } from "../controller/WishController";

export const wishRouter: Router = Router();

wishRouter.put("/add",WishController.save);
wishRouter.post("/get/all", WishController.findAll);
wishRouter.delete("/remove", WishController.deleteById);
wishRouter.patch("/complete", WishController.toggleCompleteById);
wishRouter.post("/edit", WishController.updateById);
wishRouter.patch("/recover", WishController.recoverById);
wishRouter.delete("/deleteCompleted", WishController.deleteAllCompleted);
wishRouter.patch("/recoverAll", WishController.recoverAll);
wishRouter.patch("/deleteAll", WishController.deleteAll);
wishRouter.delete("/empty", WishController.deleteAllFromTrash);

wishRouter.get("/search/:str/:token", WishController.searchFromIndex);
