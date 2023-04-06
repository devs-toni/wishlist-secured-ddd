import { AuthenticatedUser, RepositoryUser, UserTokenPort } from "../domain";
import { jwt } from "jsonwebtoken";

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

  verify(token: string, tokenSaved: string): string | undefined {
    let decoded = { user_id: "" };
    try {
      decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
      console.log("Good token");
    } catch (err) {
      console.error("bad token");
      return undefined;
    }
    return decoded.user_id;
  }
}
