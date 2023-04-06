import { UserEncryptPasswordPort } from "../domain";

const bcrypt = require("bcryptjs");

export class Encrypter implements UserEncryptPasswordPort {
  
  async encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async validate(password: string, hash: string): Promise<boolean> {
    return bcrypt.verify(password, hash);
  }
}