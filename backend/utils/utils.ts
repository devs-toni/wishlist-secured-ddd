import { Response } from "express";
import { TokenInterface } from "../interfaces/httpInterfaces";

export const returnResponse = (res: Response, data: TokenInterface) => {
  try {
    res.status(data.code).send(data);
    
  } catch (err) {
    res.status(500).send(err);
  }
};
