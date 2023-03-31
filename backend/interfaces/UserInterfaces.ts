// HTTP

export interface UserDataResponse {
  data?: object;
  message: string;
  code: number;
}

export interface FormLogin {
  form: { name: string; password: string };
}

// MODEL

export interface UserInterface {
  name: string;
  token: string;
  password: string;
}
