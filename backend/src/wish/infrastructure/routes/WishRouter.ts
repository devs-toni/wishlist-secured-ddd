import { Router } from "express";
import { WishController } from "../controller/WishController";

export const wishRouter: Router = Router();

wishRouter.post("/",WishController.save);
wishRouter.get("/", WishController.findAll);
wishRouter.patch("/complete", WishController.toggleCompleteById);
wishRouter.patch("/edit", WishController.updateById);
wishRouter.patch("/recover", WishController.recoverById);
wishRouter.patch("/recover/all", WishController.recoverAll);
wishRouter.patch("/delete", WishController.deleteById);
wishRouter.patch("/delete/all", WishController.deleteAll);
wishRouter.patch("/delete/allCompleted", WishController.deleteAllCompleted);
wishRouter.delete("/all", WishController.deleteAllFromTrash);

wishRouter.get("/search/:str", WishController.searchFromIndex);
