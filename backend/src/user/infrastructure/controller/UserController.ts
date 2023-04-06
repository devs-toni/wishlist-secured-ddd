import { RequestBody, ResponseBody } from "../../../config/domain";
import {
  AuthenticatedUser,
  FormLogin,
  RepositoryUser,
  UserControllerPort,
} from "../../domain";
import { UserService } from "../../application";
import { UserAuthenticator } from "../../application/UserAuthenticator";
require("dotenv").config();

export class UserController implements UserControllerPort {
  
  constructor(private readonly userService: UserService) {}

  async register(
    request: RequestBody<{ form: { name: string; password: string } }>,
    response: ResponseBody<RepositoryUser>
  ) {
    const params: FormLogin = request.body;
    const { form } = params;
    const user = await this.userService.register(form, form.password);
    if (typeof user !== "undefined") return response.status(200).send(user);
    else return response.status(204);
  }

  async login(
    request: RequestBody<{ form: { name: string; password: string } }>,
    response: ResponseBody<AuthenticatedUser>
  ) {
    const params: FormLogin = request.body;
    const { form } = params;
    const user = await this.userService.login(form.name, form.password);
    if (typeof user !== "undefined") return response.status(200).send(user);
    else return response.status(204);
  }

  async verify(
    request: RequestBody<{ token: string }>,
    response: ResponseBody<AuthenticatedUser>
  ) {
    const token: string = request.body.token;
    const userAuthenticator: UserAuthenticator = new UserAuthenticator();
    const userId = userAuthenticator.verify(token, `${process.env.TOKEN_KEY}`);
    if (userId) {
      const user = await this.userService.findUser(userId);
      return response.status(200).send({...user, token})
    }
    return response.status(401)
  }
}
