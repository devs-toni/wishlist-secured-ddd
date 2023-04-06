//const jwt = require("jsonwebtoken");
//require("dotenv").config();

import { RepositoryUser, User, UserRepositoryPort } from "../../domain";
import { UserModel } from "./schema/User";

export class MongoUserRepository implements UserRepositoryPort {
  async save(user: User) {
    const { name, password } = user;
    try {
      const userExists = await UserModel.findOne({
        name,
      });
      if (userExists) return undefined;
      const userSaved = await UserModel.create({ name, password });
      return userSaved ? userSaved : undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
  
  async findByName(name: string) {
    try {
      const user = (await UserModel.findOne({ name })) as RepositoryUser;
      if (user) return user;
      else return undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  async findById(_id: string) {
    try {
      const user = (await UserModel.findOne({ _id })) as RepositoryUser;
      if (user) return user;
      else return undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
}
