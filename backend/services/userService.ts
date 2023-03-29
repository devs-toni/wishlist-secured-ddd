import { ResponseInterface, NullResponse } from '../interfaces/httpInterfaces';
import { UserInterface } from '../interfaces/userInterface';
const users = require("../models/User");

export const UserService = {
  save: async (name: string) => {
    let res: ResponseInterface | NullResponse = { data: {}, state: "", code: -1 };

    const userExists: boolean | undefined = await users
      .find({ name })
      .exec()
      .then((res: UserInterface) => (Object.keys(res).length > 0 ? true : false))
      .catch(() => {
        return undefined;
      });

    if (typeof userExists === "undefined")
      return {
        data: { name },
        state: "Something went wrong with the database connection!",
        code: 204
      };

    !userExists
      ? (res = await users
          .create({
            name,
            wishes: [],
          })
          .then((res: UserInterface) => {
            return { data: res, state: "User saved succesfully", code:200 };
          })
          .catch((err:string) => {
            return { data: undefined, state: err, code: 500 };
          }))
      : (res = { data: { name }, state: "User can't be saved in database!", code: 500});

    return res;
  },
};
