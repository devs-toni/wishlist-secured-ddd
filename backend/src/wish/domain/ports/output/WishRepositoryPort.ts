import { Wish } from "../../entities/Wish";

export interface WishRepositoryPort {
  save(userId: string, wish: Wish);

  findAll(userId: string);

  updateById(id: string, text: string);

  toggleCompleteById(id: string);

  deleteById(id: string);

  deleteAllCompleted(userId: string);

  deleteAll(userId: string);

  deleteAllFromTrash(userId: string);

  recoverById(id: string);

  recoverAll(userId: string);

  searchFromIndex(userId: string, str: string);
}
