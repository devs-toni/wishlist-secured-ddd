import { Express, Request } from "express";

export interface RequestBody<T> extends Express.Request {
  body: T;
}
