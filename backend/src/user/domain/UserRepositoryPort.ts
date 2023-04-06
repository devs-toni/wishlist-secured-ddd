import { Document } from "mongoose";
import { User, RepositoryUser } from ".";

export interface UserRepositoryPort {
  save(user: User, password: string);
  findById(_id: string);
  findByName(name: string);
}
