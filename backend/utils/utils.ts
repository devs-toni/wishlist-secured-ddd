import { ResponseInterface } from "../interfaces/httpInterfaces";
import { Response } from "express";

export const returnResponse = (
  res: Response,
  code: number,
  data: ResponseInterface
) => {
  try {
    res.status(code).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};
