import { UserAuthPort } from "../domain";
import { UserRepositoryAdapter } from "../infrastructure";
import { Encrypter } from "./Encrypter";
import { UserAuthenticator } from "./UserAuthenticator";
import { AuthenticatedUser, RepositoryUser, User } from "../domain";

export class UserService implements UserAuthPort {
  constructor(
    private readonly userRepositoryAdapter: UserRepositoryAdapter,
    private readonly userAuthenticator: UserAuthenticator,
    private readonly encrypter: Encrypter,
  ) {}

  async login(
    id: string,
    password: string
  ): Promise<AuthenticatedUser | undefined> {
    const repoUser = await this.userRepositoryAdapter.findById(id);
    if (typeof repoUser !== "undefined") {
      const isValid = await this.encrypter.validate(
        password,
        repoUser.password
      );
      return isValid
        ? this.userAuthenticator.authenticate(repoUser)
        : undefined;
    }
    return undefined;
  }

  async register(
    user: User,
    password: string
  ): Promise<RepositoryUser | undefined> {
    const hash = await this.encrypter.encrypt(password);
    user.password = hash;
    return this.userRepositoryAdapter.save(user);
  }

  findUser(id: string): Promise<RepositoryUser | undefined> {
    return this.userRepositoryAdapter.findById(id)
  }
}
