import { User } from "./entities/User";

export interface UserAuthPort {
  login(name: string, password: string);
  register(user: User, password: string);
  findUser(id: string);
}