import { ResponseInterface } from "../interfaces/httpInterfaces";
const users = require("../models/User");

export const UserService = {
  save: async (name: string) => {
    
    let res: ResponseInterface = { data: {}, state: "" };

    const userExists: boolean | undefined = await users
      .find({ name })
      .exec()
      .then((res) => (res.length > 0 ? true : false))
      .catch((err) => {
        return undefined;
      });

    if (typeof userExists === "undefined")
      return {
        data: name,
        state: "Something went wrong with the database connection!",
      };

    !userExists
      ? (res = await users
          .create({
            name,
            wishes: [],
          })
          .then((res) =>
            Object.keys(res).length > 0
              ? { data: res, state: "User saved succesfully" }
              : false
          )
          .catch((err) => {
            return { name: null, state: false };
          }))
      : (res = { data: name, state: "User can't be saved in database!" });

    return res;
  },
};
