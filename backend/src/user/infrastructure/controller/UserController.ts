import { FormLogin } from "../../domain";
import { Encrypter, UserService } from "../../application";
import { UserAuthenticator } from "../../application/UserAuthenticator";
import { UserRepositoryAdapter } from "../adapter/UserRepositoryAdapter";
import { MongoUserRepository } from "../repository/MongoUserRepository";
import { Request, Response } from "express";

require("dotenv").config();

const userAuthenticator: UserAuthenticator = new UserAuthenticator();
const mongoUserRepository: MongoUserRepository = new MongoUserRepository();
const encrypter = new Encrypter();
const userRepository: UserRepositoryAdapter = new UserRepositoryAdapter(
  mongoUserRepository
);

const userService: UserService = new UserService(
  userRepository,
  userAuthenticator,
  encrypter
);

export const UserController = {
  async register(request: Request, response: Response) {
    const params: FormLogin = request.body;
    const { form } = params;
    const user = await userService.register(form, form.password);
    return response.status(user ? 200 : 204).send(user && user);
  },

  async login(request: Request, response: Response) {
    const params: FormLogin = request.body;
    const { form } = params;
    const user = await userService.login(form.name, form.password);
    return response.status(user ? 200 : 204).send(user && user);
  },

  async verify(request: Request, response: Response) {
    const token: string = request.body.token;
    const userAuthenticator: UserAuthenticator = new UserAuthenticator();
    const userId = await userAuthenticator.verify(token, `${process.env.TOKEN_KEY}`);

    if (userId) {
      const user = await userService.findUser(userId);
      return response.status(200).send({ ...user, token });
    }
    return response.status(401).send();
  },
};
