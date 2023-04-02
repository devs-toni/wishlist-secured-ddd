import { writeLog } from "../lib/logger";
import { WishInterface } from "../interfaces/WishInterface";

const jwt = require("jsonwebtoken");
const WishModel = require("../models/Wish");

require("dotenv").config();

export const WishService = {
  add: () => {},
  getAllWishes: (userId: string) => {
    console.log(userId);

    return {
      message: "Hola",
      code: 204
    }
  },
};
