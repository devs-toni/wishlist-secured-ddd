import { Request, Response } from "express";
import { ResponseInterface } from "../interfaces/httpInterfaces";
import { UserService } from "../services/userService";
import { returnResponse } from '../utils/utils';

const UserController = {

  save: async (request: Request, response: Response) => {
    const name: string = request.params['name'] as string;
    const res: ResponseInterface = await UserService.save(name);
    returnResponse(response, res);
  },
};

module.exports = UserController;
