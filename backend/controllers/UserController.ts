import { Request, Response } from "express";
import { TokenInterface } from "../interfaces/httpInterfaces";
import { UserService } from "../services/userService";
import { returnResponse } from "../utils/utils";

interface FormLoginInterface {
  form: { name: string; password: string };
}

const UserController = {
  save: async (request: Request, response: Response) => {
    const params: FormLoginInterface = request.body;
    const { form } = params;
    const res: TokenInterface = await UserService.save(
      form.name,
      form.password
    );
    returnResponse(response, res);
  },

  login: async (request: Request, response: Response) => {
    const params: FormLoginInterface = request.body;
    const { form } = params;
    const res: TokenInterface = await UserService.checkLogin(
      form.name,
      form.password
    );
    returnResponse(response, res);
  },
};

module.exports = UserController;
