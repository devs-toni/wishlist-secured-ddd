import { AuthenticatedUser, RepositoryUser } from "./entities/User";

export interface UserTokenPort {
  authenticate(user: RepositoryUser): AuthenticatedUser;
  verify(token: string, tokenSaved: string): string | undefined;
}
