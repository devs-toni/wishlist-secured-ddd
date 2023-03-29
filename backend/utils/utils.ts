import { Response } from "express";
import { ResponseInterface } from '../interfaces/httpInterfaces';

export const returnResponse = (
  res: Response,
  data: ResponseInterface
) => {
  try {
    res.status(data.code).send(data.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
