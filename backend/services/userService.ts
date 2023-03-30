import { randomUUID } from "crypto";
import { TokenInterface } from "../interfaces/httpInterfaces";
import { UserInterface } from "../interfaces/userInterface";
import { writeLog } from "../lib/logger";

const users = require("../models/User");

export const UserService = {
  save: async (name: string) => {
    let res: TokenInterface = {
      token: "",
      state: "",
      code: -1,
    };

    const userExists: boolean | undefined = await users
      .find({ name })
      .exec()
      .then((res: UserInterface) =>
        Object.keys(res).length > 0 ? true : false
      )
      .catch(() => {
        return undefined;
      });

    if (typeof userExists === "undefined") {
      writeLog("SAVE USER -> Something went wrong with the database connection!");
      return {
        token: undefined,
        state: "Something went wrong with the database connection!",
        code: 500,
      };
    }

    !userExists
      ? (res = await users
          .create({
            name,
            wishes: [],
            token: randomUUID()
          })
          .then((res: UserInterface) => {
            return {
              token: res.token,
              state: "User saved succesfully!",
              code: 200,
            };
          })
          .catch(() => {
            return {
              token: undefined,
              state: "SAVE USER -> Can't save user in database!",
              code: 500,
            };
          }))
      : (res = {
          token: undefined,
          state: "",
          code: 204,
        });
    writeLog(res.state);
    return res;
  },
};
