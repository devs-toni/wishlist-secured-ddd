import { writeLog } from "../lib/logger";
import { UserDataResponse } from "../interfaces/UserInterfaces";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
require("dotenv").config();

export const UserService = {
  save: async (name: string, password: string): Promise<UserDataResponse> => {
    try {
      const userExists: boolean | undefined = await UserModel.findOne({ name });

      if (userExists) {
        const msg = `User ${name} already exists`;
        writeLog(msg);
        return { message: msg, code: 409 };
      }

      const encryptedPassword: string = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        name,
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { user_id: user._id.valueOf(), name },
        `${process.env.TOKEN_KEY}`,
        {
          expiresIn: "1h",
        }
      );

      user.token = token;
      const msg = `User ${name} saved successfully!`;
      writeLog(msg);

      return {
        data: user.name,
        message: msg,
        code: 200,
      };
    } catch (err) {
      console.error(err);
      const message = "Error saving user in database!";
      writeLog("SAVE USER -> " + message);

      return {
        message,
        code: 204,
      };
    }
  },

  checkLogin: async (
    name: string,
    password: string
  ): Promise<UserDataResponse> => {
    try {
      const user = await UserModel.findOne({ name });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id.valueOf(), name },
          `${process.env.TOKEN_KEY}`,
          {
            expiresIn: "1h",
          }
        );
        user.token = token;
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
  },

  findById: async (_id: string, token: string) => {
    try {
      const user = await UserModel.findOne({ _id });
      user.token = token;

      return {
        data: user,
        message: "User found",
        code: 200,
      };
    } catch (err) {
      return {
        message: "User not found",
        code: 204,
      };
    }
  }
};
