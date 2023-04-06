//const jwt = require("jsonwebtoken");
//require("dotenv").config();

import { RepositoryUser, User, UserRepositoryPort } from "../../domain";
import { UserModel } from "./schema/User";

export class MongoUserRepository implements UserRepositoryPort {
  async save(user: User): Promise<RepositoryUser | undefined> {
    const { name, password } = user;
    try {
      const userExists: boolean | null | undefined = await UserModel.findOne({
        name,
      });
      if (userExists) return undefined;
      const userSaved: RepositoryUser = await UserModel.create({
        name,
        password,
      })[0];

      return userSaved;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  /*   async checkLogin(
    name: string,
    password: string
  ): Promise<UserDataResponse> {
    try {
      const user = await UserModel.findOne({ name });

      if (user && (await bcrypt.compare(password, user.password))) {
     
        const msg = `Login ${name} succesfully!`;
        writeLog(msg);
        return {
          data: user,
          message: msg,
          code: 200,
        };
      } else {
        const msg = `${name} - Invalid Credentials!`;
        writeLog("LOGIN USER -> " + msg);
        return {
          message: msg,
          code: 204,
        };
      }
    } catch (err) {
      console.error(err);
      const msg = `${name} - Error when login user!`;
      writeLog("LOGIN USER -> " + msg);
      return {
        message: msg,
        code: 204,
      };
    }
  } */

  async findById(_id: string) {
    try {
      const user = await UserModel.findOne({ _id })[0];
      /*       user.token = token; */
      return user;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
}
