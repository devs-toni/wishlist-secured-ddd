import { AuthenticatedUser, RepositoryUser, UserTokenPort } from "../domain";
import * as jwt from "jsonwebtoken";
require('dotenv').config();

export class UserAuthenticator implements UserTokenPort {
  authenticate(user: RepositoryUser): AuthenticatedUser {
    const token = jwt.sign(
      { user_id: user._id, name: user.name },
      `${process.env.TOKEN_KEY}`,
      {
        expiresIn: "1h",
      }
    );
    const authUser: AuthenticatedUser = {
      _id: user._id,
      name: user.name,
      password: user.password,
      token,
    };

    return authUser;
  }

  async verify(token: string, tokenSaved: string): Promise<string | undefined> {
    let decoded = { user_id: "" };
    try {
      decoded = await jwt.verify(token, `${process.env.TOKEN_KEY}`);
    } catch (err) {
      return undefined;
    }
    return decoded.user_id;
  }
}
