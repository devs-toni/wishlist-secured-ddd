import { Wish } from "../../entities/Wish";

export interface WishRepositoryPort {
  save(userId: string, wish: Wish): Promise<Wish | undefined>;

  findAll(userId: string): Promise<Wish[] | undefined>;

  updateById(id: string, text: string): Promise<Wish | undefined>;

  toggleCompleteById(id: string): Promise<boolean>;

  deleteById(id: string): Promise<boolean>;

  deleteAllCompleted(userId: string): Promise<boolean>;

  deleteAll(userId: string): Promise<boolean>;

  deleteAllFromTrash(userId: string): Promise<boolean>;

  recoverById(id: string): Promise<boolean>;

  recoverAll(userId: string): Promise<boolean>;

  searchFromIndex(userId: string, str: string): Promise<Wish[] | undefined>;
}
