import { User, RepositoryUser } from ".";

export interface UserRepositoryPort {
  save(user: User, password: string): Promise<RepositoryUser | undefined>;
  findById(_id: string): Promise<RepositoryUser | undefined>;
}
