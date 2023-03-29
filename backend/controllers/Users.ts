import { Request, Response } from 'express';

const UserController = {

  save: (request: Request, response: Response) => {
    const name: string = request.params.name;
    
  }
}


module.exports = UserController;