import { writeLog } from "../lib/logger";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
require("dotenv").config();

export const UserService = {
  save: async (name: string, password: string) => {
    try {
      const userExists: boolean | undefined = await UserModel.findOne({ name });

      if (userExists) {
        writeLog(`User ${name} already exists`);
        return {
          name: undefined,
          token: undefined,
          state: "User already exist. Please login!",
          code: 209,
        };
      }

      const encryptedPassword: string = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        name,
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { user_id: user._id.valueOf(), name },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      writeLog("User saved successfully!");

      return {
        name: user.name,
        token: token,
        state: "User saved succesfully!",
        code: 200,
      };
    } catch (err) {
      console.log(err);
      writeLog("SAVE USER -> Error saving user!");
      return {
        name: undefined,
        token: undefined,
        state: "SAVE USER -> Error saving user!",
        code: 204,
      };
    }
  },

  checkLogin: async (name: string, password: string) => {
    try {
      const user = await UserModel.findOne({ name });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id.valueOf(), name },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;

        writeLog("Login success!");
        return {
          name,
          token: user.token,
          state: "Login success!",
          code: 200,
        };
      } else {
        writeLog("LOGIN USER -> Invalid Credentials!");
        return {
          name: undefined,
          token: undefined,
          state: "LOGIN USER -> Invalid Credentials!",
          code: 204,
        };
      }
    } catch (err) {
      console.log(err);
      writeLog("LOGIN USER -> Error when login user!");
      return {
        name: undefined,
        token: undefined,
        state: "LOGIN USER -> Error when login user!",
        code: 204,
      };
    }
  },
};
