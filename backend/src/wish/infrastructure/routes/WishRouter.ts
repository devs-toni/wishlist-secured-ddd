import { Request, Router } from "express";
import { wishController } from "../../../config/infrastructure";
import { ResponseBody } from "../../../config/domain";
import { Wish } from "../../domain";

export const wishRouter: Router = Router();

wishRouter.put("/add", (req, res) => wishController);
wishRouter.post("/get/all", (req: Request, res: ResponseBody<Wish[]>) => wishController.findAll(req, res));
wishRouter.delete("/remove", (req, res) => wishController.deleteById);
wishRouter.patch("/complete", (req, res) => wishController.toggleCompleteById);
wishRouter.post("/edit", (req, res) => wishController.updateById);
wishRouter.patch("/recover", (req, res) => wishController.recoverById);
wishRouter.delete(
  "/deleteCompleted",
  (req, res) => wishController.deleteAllCompleted
);
wishRouter.patch("/recoverAll", (req, res) => wishController.recoverAll);
wishRouter.patch("/deleteAll", (req, res) => wishController.deleteAll);
wishRouter.delete("/empty", (req, res) => wishController.deleteAllFromTrash);

wishRouter.get(
  "/search/:str/:token",
  (req, res) => wishController.searchFromIndex
);
