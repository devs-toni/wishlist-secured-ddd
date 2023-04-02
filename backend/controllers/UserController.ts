import { Response, Request } from "express";
import {
  UserDataResponse,
  FormLogin,
} from "../interfaces/UserInterfaces";
import { RequestBody } from "../interfaces/httpInterfaces";
import { UserService } from "../services/UserService";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
  save: async (
    request: RequestBody<{ form: { name: string; password: string } }>,
    response: Response<UserDataResponse>
  ) => {
    const params: FormLogin = request.body;
    const { form } = params;
    const dataCollected: UserDataResponse = await UserService.save(
      form.name,
      form.password
    );
    return response.status(dataCollected.code).send(dataCollected);
  },

  login: async (
    request: RequestBody<{ form: { name: string; password: string } }>,
    response: Response<UserDataResponse>
  ) => {
    const params: FormLogin = request.body;
    const { form } = params;
    const dataCollected: UserDataResponse = await UserService.checkLogin(
      form.name,
      form.password
    );
    return response.status(dataCollected.code).send(dataCollected);
  },

  verify: async (
    request: RequestBody<{ token: string }>,
    response: Response<UserDataResponse>
  ) => {
    const token: string = request.body.token;
    let decoded = { user_id: "" };
    try {
      decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
      console.log("Good token");
    } catch (err) {
      console.log("bad token");
      return response
        .status(401)
        .send({ message: "Unauthorized access!", code: 401 });
    }

    const userId = decoded.user_id;
    const dataCollected: UserDataResponse = await UserService.findById(
      userId,
      token
    );
    return response.status(dataCollected.code).send(dataCollected);
  }
};

module.exports = UserController;
