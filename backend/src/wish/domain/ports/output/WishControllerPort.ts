import { Request, Response } from "express";
import { RequestBody, ResponseBody } from "../../../../config/domain/entities/HttpI";
import { Wish } from "../../entities/Wish";

export interface WishControllerPort {
  save(request: RequestBody<{ data: Wish; token: string }>, response: Response);

  deleteById(request: RequestBody<{ id: string }>, response: Response);

  toggleCompleteById(request: RequestBody<{ id: string }>, response: Response);

  updateById(
    request: RequestBody<{ id: string; name: string }>,
    response: Response
  );

  recoverById(request: RequestBody<{ id: string }>, response: Response);

  deleteAllCompleted(
    request: RequestBody<{ token: string }>,
    response: Response
  );

  recoverAll(request: RequestBody<{ token: string }>, response: Response);

  deleteAll(request: RequestBody<{ token: string }>, response: Response);

  deleteAllFromTrash(
    request: RequestBody<{ token: string }>,
    response: Response
  );

  findAll(
    request: RequestBody<{ token: string }>,
    response: ResponseBody<Wish[]>
  );

  searchFromIndex(request: Request, response: ResponseBody<Wish[]>);
}
