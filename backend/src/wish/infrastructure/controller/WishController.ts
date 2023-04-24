import { Response, Request } from "express";
import { RequestBody } from "../../../config/domain/entities/HttpI";
import { Wish } from "../../domain/entities/Wish";
import { UserAuthenticator } from "../../../user/application/UserAuthenticator";
import {
  WishDeleteAllCompletedUseCase,
  WishDeleteAllUseCase,
  WishDeleteFromTrashUseCase,
  WishDeleteUseCase,
  WishRecoverUseCase,
  WishRetrieveUseCase,
  WishService,
  WishToggleCompleteUseCase,
  WishUpdateUseCase,
  WishSearchUseCase,
  WishRecoverAllUseCase,
  WishCreateUseCase,
} from "../../../wish/application";
import { WishRepositoryAdapter } from "../../../wish/infrastructure/adapters/WishRepositoryAdapter";
import { MongoWishRepository } from "../repository/MongoWishRepository";

require("dotenv").config();
const userAuthenticator: UserAuthenticator = new UserAuthenticator();

const mongoWishRepository: MongoWishRepository = new MongoWishRepository();
const wishRepositoryAdapter: WishRepositoryAdapter = new WishRepositoryAdapter(
  mongoWishRepository
);
const wishCreateUseCase: WishCreateUseCase = new WishCreateUseCase(
  wishRepositoryAdapter
);
const wishDeleteUseCase: WishDeleteUseCase = new WishDeleteUseCase(
  wishRepositoryAdapter
);
const wishDeleteAllUseCase: WishDeleteAllUseCase = new WishDeleteAllUseCase(
  wishRepositoryAdapter
);
const wishDeleteFromTrashUseCase: WishDeleteFromTrashUseCase =
  new WishDeleteFromTrashUseCase(wishRepositoryAdapter);
const wishDeleteAllCompletedUseCase: WishDeleteAllCompletedUseCase =
  new WishDeleteAllCompletedUseCase(wishRepositoryAdapter);
const wishRecoverAllUseCase: WishRecoverAllUseCase = new WishRecoverAllUseCase(
  wishRepositoryAdapter
);
const wishRecoverUseCase: WishRecoverUseCase = new WishRecoverUseCase(
  wishRepositoryAdapter
);
const wishRetrieveUseCase: WishRetrieveUseCase = new WishRetrieveUseCase(
  wishRepositoryAdapter
);
const wishSearchUseCase: WishSearchUseCase = new WishSearchUseCase(
  wishRepositoryAdapter
);
const wishToggleCompleteUseCase: WishToggleCompleteUseCase =
  new WishToggleCompleteUseCase(wishRepositoryAdapter);
const wishUpdateUseCase: WishUpdateUseCase = new WishUpdateUseCase(
  wishRepositoryAdapter
);
const wishService: WishService = new WishService(
  wishCreateUseCase,
  wishDeleteUseCase,
  wishUpdateUseCase,
  wishRetrieveUseCase,
  wishToggleCompleteUseCase,
  wishRecoverUseCase,
  wishRecoverAllUseCase,
  wishDeleteAllUseCase,
  wishDeleteAllCompletedUseCase,
  wishDeleteFromTrashUseCase,
  wishSearchUseCase
);

export const WishController = {
  async updateById(
    request: RequestBody<{ id: string; name: string }>,
    response: Response
  ) {
    const id: string = request.body.id;
    const name: string = request.body.name;
    const wish = await wishService.updateById(id, name);
    return response.status(wish ? 200 : 204).send(wish && wish);
  },

  async deleteAllCompleted(
    request: Request,
    response: Response
  ) {
    const token = request.headers.authorization;
    const userId = await userAuthenticator.verify(token!!, `${process.env.TOKEN_KEY}`);

    if (userId) {
      const areRemoved = await wishService.deleteAllCompleted(userId);
      return response.status(areRemoved ? 200 : 204).send();
    }
    return response.status(401).send();
  },

  async deleteAll(request: Request, response: Response) {
    const token = request.headers.authorization;
    const userId = await userAuthenticator.verify(token!!, `${process.env.TOKEN_KEY}`);

    if (userId) {
      const areRemoved = await wishService.deleteAll(userId);
      return response.status(areRemoved ? 200 : 204).send();
    }
    return response.status(401).send();
  },

  async deleteAllFromTrash(
    request: Request,
    response: Response
  ) {
    const token = request.headers.authorization;
    const userId = await userAuthenticator.verify(token!!, `${process.env.TOKEN_KEY}`);

    if (userId) {
      const areRemoved = await wishService.deleteAllFromTrash(userId);
      return response.status(areRemoved ? 200 : 204).send();
    }
    return response.status(401).send();
  },

  // VERIFIED

  async save(
    request: RequestBody<{ data: Wish }>,
    response: Response
  ) {
    const token = request.headers.authorization;
    const wish: Wish = request.body.data;
    const userId = await userAuthenticator.verify(token!!, `${process.env.TOKEN_KEY}`);

    if (userId) {
      const wishSaved = await wishService.save(userId, wish);
      return response
        .status(wishSaved ? 200 : 204)
        .send(wishSaved && wishSaved);
    } else return response.status(401).send();
  },

  async recoverById(request: RequestBody<{ id: string }>, response: Response) {
    const id = request.body.id;
    const isRecovered = await wishService.recoverById(id);
    return response.status(isRecovered ? 200 : 204).send();
  },

  async recoverAll(
    request: Request,
    response: Response
  ) {
    const token = request.headers.authorization;
    const userId = await userAuthenticator.verify(token!!, `${process.env.TOKEN_KEY}`);

    if (userId) {
      const areRecovered = await wishService.recoverAll(userId);
      return response.status(areRecovered ? 200 : 204).send();
    }
    return response.status(401).send();
  },

  async deleteById(request: RequestBody<{ id: string }>, response: Response) {
    const id: string = request.body.id;
    const isRemoved = await wishService.deleteById(id);
    return response.status(isRemoved ? 200 : 204).send();
  },

  async toggleCompleteById(
    request: RequestBody<{ id: string }>,
    response: Response
  ) {
    const id: string = request.body.id;
    const isCompleted = await wishService.toggleCompleteById(id);
    console.log(isCompleted);
    return response.status(isCompleted ? 200 : 204).send();
  },

  async findAll(request: Request, response: Response) {
    const token = request.headers.authorization;
    const userId = await userAuthenticator.verify(token!!, `${process.env.TOKEN_KEY}`);
    if (userId) {
      const wishes = await wishService.findAll(userId);
      return response.status(wishes ? 200 : 204).send(wishes && wishes);
    }
    return response.status(401);
  },

  async searchFromIndex(request: Request, response: Response) {
    const str: string = request.params.str;
    const token = request.headers.authorization;
    const userId = await userAuthenticator.verify(token!!, `${process.env.TOKEN_KEY}`);
    if (userId) {
      const wishes = await wishService.searchFromIndex(userId, str);
      return response.status(wishes ? 200 : 204).send(wishes && wishes);
    }
    return response.status(401);
  },
};
