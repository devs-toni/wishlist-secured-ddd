import { AuthenticatedUser, User, RepositoryUser } from "./entities/User";

export interface UserAuthPort {
  login(id: string, password: string): Promise<AuthenticatedUser | undefined>;
  register(user: User, password: string): Promise<RepositoryUser | undefined>;
  findUser(id: string): Promise<RepositoryUser | undefined>;
}