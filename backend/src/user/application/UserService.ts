import { User, UserAuthPort } from "../domain";
import { UserRepositoryAdapter } from "../infrastructure";
import { Encrypter } from "./Encrypter";
import { UserAuthenticator } from "./UserAuthenticator";

export class UserService implements UserAuthPort {
  constructor(
    private readonly userRepositoryAdapter: UserRepositoryAdapter,
    private readonly userAuthenticator: UserAuthenticator,
    private readonly encrypter: Encrypter
  ) {}

  async login(name: string, password: string) {
    const repoUser = await this.userRepositoryAdapter.findByName(name);
    if (typeof repoUser !== "undefined") {
      const isValid = await this.encrypter.validate(password, repoUser.password);
      return isValid
        ? this.userAuthenticator.authenticate(repoUser)
        : undefined;
    }
    return undefined;
  }

  async register(user: User, password: string) {
    const hash = await this.encrypter.encrypt(password);
    user.password = hash;
    return this.userRepositoryAdapter.save(user);
  }

  findUser(id: string) {
    return this.userRepositoryAdapter.findById(id);
  }
}
