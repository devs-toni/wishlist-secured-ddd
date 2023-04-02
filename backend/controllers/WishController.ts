import { Response, Request } from "express";
import { WishInterface } from "../interfaces/WishInterface";
import { RequestBody } from "../interfaces/httpInterfaces";
import { WishService } from "../services/WishService";
import { UserDataResponse } from "../interfaces/UserInterfaces";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
  add: (req: RequestBody<WishInterface>, res: Response) => {
    console.log(req.body);
  },

  getAll: async (
    request: RequestBody<{ token: string }>,
    response: Response<UserDataResponse>
  ) => {
    const token = request.body.token;
    let decoded = { user_id: "" };

    try {
      decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    } catch (err) {
      return response
        .status(401)
        .send({ message: "Unauthorized access!", code: 401 });
    }

    const userId = decoded.user_id;
    const dataCollected: UserDataResponse = await WishService.getAllWishes(
      userId
    );
    return response.status(dataCollected.code).send(dataCollected);
  },

  /*   refreshWishes: async (
    request: RequestBody<{ token: string; wishes: TaskInterface[] }>,
    response: Response<UserDataResponse>
  ) => {
    const allWishes = request.body.wishes;
    const token = request.body.token;
    let decoded = { user_id: "" };
    try {
      decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    } catch (err) {
      return response
        .status(401)
        .send({ message: "Unauthorized access!", code: 401 });
    }

    const userId = decoded.user_id;
    const dataCollected: UserDataResponse = await UserService.updateWishes(
      allWishes,
      userId
    );
    return response.status(dataCollected.code).send(dataCollected);
  },
  refreshTrash: async (
    request: RequestBody<{ token: string; trash: TaskInterface[] }>,
    response: Response<UserDataResponse>
  ) => {
    const trash = request.body.trash;
    const token = request.body.token;
    let decoded = { user_id: "" };
    try {
      decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    } catch (err) {
      return response
        .status(401)
        .send({ message: "Unauthorized access!", code: 401 });
    }

    const userId = decoded.user_id;
    const dataCollected: UserDataResponse = await UserService.updateTrash(
      trash,
      userId
    );
    return response.status(dataCollected.code).send(dataCollected);
  },

 */
};

module.exports = UserController;
