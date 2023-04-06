export interface AuthenticatedUser {
  _id: string;
  name: string;
  password: string;
  token: string;
}

export type User = Pick<AuthenticatedUser, "name" | "password">;

export interface RepositoryUser {
  _id: string;
  name: string;
  password: string;
}
