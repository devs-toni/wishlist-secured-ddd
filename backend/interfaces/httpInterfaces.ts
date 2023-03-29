export interface ResponseInterface {
  data: {} | undefined;
  state: string;
  code: number;
}

export interface NullResponse {
  data: undefined,
  state: string,
  code: number
}