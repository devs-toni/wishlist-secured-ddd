import { RepositoryUser, User, UserRepositoryPort } from "../../domain";
import { MongoUserRepository } from "../repository/MongoUserRepository";

export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly mongoUserRepository: MongoUserRepository) {}

  save(user: User): Promise<RepositoryUser | undefined> {
    return this.mongoUserRepository.save(user);
  }

  findById(id: string): Promise<RepositoryUser | undefined> {
    return this.mongoUserRepository.findById(id);
  }
}
