import { Router } from "express";
let router: Router = Router();

const UserController = require("../controllers/Users");

const q: string = "/users";

router.get(`${q}/save/:name`, UserController.save);
router.post(`${q}/getByToken`, UserController.getByToken);

module.exports = router;
