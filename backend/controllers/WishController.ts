import { Response, Request } from "express";
import { WishInterface } from "../interfaces/WishInterface";
import { RequestBody } from "../interfaces/httpInterfaces";
import { WishService } from "../services/WishService";
import { UserDataResponse } from "../interfaces/UserInterfaces";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const WishController = {
  add: async (
    request: RequestBody<{ data: WishInterface; token: string }>,
    response: Response
  ) => {
    const token: string = request.body.token;
    const wish: WishInterface = request.body.data;
    let decoded = { user_id: "" };
    try {
      decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    } catch (err) {
      return response
        .status(401)
        .send({ message: "Unauthorized access!", code: 401 });
    }
    const userId = decoded.user_id;
    console.log(userId);

    const dataCollected: UserDataResponse = await WishService.add(userId, wish);
    return response.status(dataCollected.code).send(dataCollected);
  },

  remove: async (request: RequestBody<{ id: string }>, response: Response) => {
    const id: string = request.body.id;

    const dataCollected: UserDataResponse = await WishService.remove(id);
    return response.status(dataCollected.code).send(dataCollected);
  },

  complete: async (
    request: RequestBody<{ id: string }>,
    response: Response
  ) => {
    const id: string = request.body.id;
    const dataCollected: UserDataResponse = await WishService.complete(id);
    return response.status(dataCollected.code).send(dataCollected);
  },

  edit: async (
    request: RequestBody<{ id: string; name: string }>,
    response: Response
  ) => {
    const id: string = request.body.id;
    const name: string = request.body.name;
    const dataCollected: UserDataResponse = await WishService.edit(id, name);
    return response.status(dataCollected.code).send(dataCollected);
  },

  recover: async (request: RequestBody<{ id: string }>, response: Response) => {
    const id: string = request.body.id;
    const dataCollected: UserDataResponse = await WishService.recover(id);
    return response.status(dataCollected.code).send(dataCollected);
  },

  deleteCompleted: async (
    request: RequestBody<{ token: string }>,
    response: Response
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
    const dataCollected: UserDataResponse = await WishService.deleteCompleted(
      userId
    );
    return response.status(dataCollected.code).send(dataCollected);
  },

  recoverAll: async (
    request: RequestBody<{ token: string }>,
    response: Response
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
    const dataCollected: UserDataResponse = await WishService.recoverAll(
      userId
    );
    return response.status(dataCollected.code).send(dataCollected);
  },

  deleteAll: async (
    request: RequestBody<{ token: string }>,
    response: Response
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
    const dataCollected: UserDataResponse = await WishService.deleteAll(userId);
    return response.status(dataCollected.code).send(dataCollected);
  },

  empty: async (
    request: RequestBody<{ token: string }>,
    response: Response
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
    const dataCollected: UserDataResponse = await WishService.empty(userId);
    return response.status(dataCollected.code).send(dataCollected);
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

  search: async (
    request: Request,
    response: Response<UserDataResponse>
  ) => {
    const str: string = request.params.str;
    const dataCollected: UserDataResponse = await WishService.searchWish(str);
    return response.status(dataCollected.code).send(dataCollected);
  },
};

module.exports = WishController;
