import { Request, Response } from "express";
import { TokenInterface } from "../interfaces/httpInterfaces";
import { UserService } from "../services/userService";
import { returnResponse } from "../utils/utils";

const UserController = {
  save: async (request: Request, response: Response) => {
    const name: string = request.params["name"] as string;
    const res: TokenInterface = await UserService.save(name);
    returnResponse(response, res);
  },

  getByToken: async (request: Request, _response: Response) => {
    const token: string = request.body["token"] as string;
    console.log(token);
  },
};

module.exports = UserController;
