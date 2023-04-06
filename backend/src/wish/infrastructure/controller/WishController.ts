import { Response, Request } from "express";
import { WishControllerPort } from "../../domain/ports/output/WishControllerPort";
import {
  RequestBody,
  ResponseBody,
} from "../../../config/domain/entities/HttpI";
import { Wish } from "../../domain/entities/Wish";
import { UserAuthenticator } from "../../../user/application/UserAuthenticator";
import { WishService } from "../../application/WishService";

require("dotenv").config();

export class WishController implements WishControllerPort {
  constructor(
    private readonly wishService: WishService,
    private readonly userAuthenticator: UserAuthenticator
  ) {}

  async save(
    request: RequestBody<{ data: Wish; token: string }>,
    response: Response
  ) {
    const token: string = request.body.token;
    const wish: Wish = request.body.data;
    const userId = this.userAuthenticator.verify(
      token,
      `${process.env.TOKEN_KEY}`
    );

    if (userId) {
      const wishSaved = await this.wishService.save(userId, wish);
      return wishSaved
        ? response.status(200).send(wishSaved)
        : response.status(204);
    } else return response.status(401);
  }

  async deleteById(request: RequestBody<{ id: string }>, response: Response) {
    const id: string = request.body.id;
    const isRemoved = await this.wishService.deleteById(id);
    return isRemoved ? response.status(200) : response.status(204);
  }

  async toggleCompleteById(
    request: RequestBody<{ id: string }>,
    response: Response
  ) {
    const id: string = request.body.id;
    const isCompleted = await this.wishService.toggleCompleteById(id);
    return isCompleted ? response.status(200) : response.status(204);
  }

  async updateById(
    request: RequestBody<{ id: string; name: string }>,
    response: Response
  ) {
    const id: string = request.body.id;
    const name: string = request.body.name;
    const wish = await this.wishService.updateById(id, name);
    if (typeof wish !== "undefined") return response.status(200).send(wish);
    else return response.status(204);
  }

  async recoverById(request: RequestBody<{ id: string }>, response: Response) {
    const id: string = request.body.id;
    const isRecovered = await this.wishService.recoverById(id);
    return isRecovered ? response.status(200) : response.status(204);
  }

  async deleteAllCompleted(
    request: RequestBody<{ token: string }>,
    response: Response
  ) {
    const token = request.body.token;
    const userId = this.userAuthenticator.verify(
      token,
      `${process.env.TOKEN_KEY}`
    );

    if (userId) {
      const areRemoved = await this.wishService.deleteAllCompleted(userId);
      return areRemoved ? response.status(200) : response.status(204);
    }
    return response.status(401);
  }

  async recoverAll(
    request: RequestBody<{ token: string }>,
    response: Response
  ) {
    const token = request.body.token;
    const userId = this.userAuthenticator.verify(
      token,
      `${process.env.TOKEN_KEY}`
    );

    if (userId) {
      const areRecovered = await this.wishService.recoverAll(userId);
      return areRecovered ? response.status(200) : response.status(204);
    }
    return response.status(401);
  }

  async deleteAll(request: RequestBody<{ token: string }>, response: Response) {
    const token = request.body.token;
    const userId = this.userAuthenticator.verify(
      token,
      `${process.env.TOKEN_KEY}`
    );

    if (userId) {
      const areRemoved = await this.wishService.deleteAll(userId);
      return areRemoved ? response.status(200) : response.status(204);
    }
    return response.status(401);
  }

  async deleteAllFromTrash(
    request: RequestBody<{ token: string }>,
    response: Response
  ) {
    const token = request.body.token;
    const userId = this.userAuthenticator.verify(
      token,
      `${process.env.TOKEN_KEY}`
    );

    if (userId) {
      const areRemoved = await this.wishService.deleteAllFromTrash(userId);
      return areRemoved ? response.status(200) : response.status(204);
    }
    return response.status(401);
  }

  async findAll(
    request: RequestBody<{ token: string }>,
    response: ResponseBody<Wish[]>
  ) {
    const token = request.body.token;
    const userId = this.userAuthenticator.verify(
      token,
      `${process.env.TOKEN_KEY}`
    );
    if (userId) {
      const wishes = await this.wishService.findAll(userId);
      return wishes ? response.status(200).send(wishes) : response.status(204);
    }
    return response.status(401);
  }

  async searchFromIndex(request: Request, response: ResponseBody<Wish[]>) {
    const str: string = request.params.str;
    const token = request.params.token;
    const userId = this.userAuthenticator.verify(
      token,
      `${process.env.TOKEN_KEY}`
    );
    if (userId) {
      const wishes = await this.wishService.searchFromIndex(userId, str);
      return wishes ? response.status(200).send(wishes) : response.status(204);
    }
    return response.status(401);
  }
}


