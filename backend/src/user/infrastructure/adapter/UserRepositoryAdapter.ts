import { User, UserRepositoryPort } from "../../domain";
import { MongoUserRepository } from "../repository/MongoUserRepository";

export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly mongoUserRepository: MongoUserRepository) {}

  save(user: User) {
    return this.mongoUserRepository.save(user);
  }

  findById(id: string) {
    return this.mongoUserRepository.findById(id);
  }

  findByName(name: string) {
    return this.mongoUserRepository.findByName(name);
  }
}
