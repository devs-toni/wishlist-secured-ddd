import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export class UserVerify {
  
    verifyUser(req: Request, res: Response, next) {
      const token = req.headers.authorization;
      const isValid = jwt.verify(token, process.env.TOKEN_KEY);
      if (!token || !isValid) res.status(401).send("Access Denied");
      else next();
    }
}