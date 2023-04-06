export interface UserEncryptPasswordPort {
  validate(password: string, hash: string): Promise<boolean>;
  encrypt(password: string): Promise<string>;
}