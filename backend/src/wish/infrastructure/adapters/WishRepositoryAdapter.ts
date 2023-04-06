import { Wish, WishRepositoryPort } from "../../domain";
import { MongoWishRepository } from '../repository/MongoWishRepository';

export class WishRepositoryAdapter implements WishRepositoryPort {

  constructor(private readonly mongoWishRepository: MongoWishRepository) {}

  save(userId: string, wish: Wish): Promise<Wish | undefined> {
    return this.mongoWishRepository.save(userId, wish);
  }
  findAll(userId: string): Promise<Wish[] | undefined> {
    return this.mongoWishRepository.findAll(userId);
  }
  updateById(id: string, text: string): Promise<Wish | undefined> {
    return this.mongoWishRepository.updateById(id, text);
  }
  toggleCompleteById(id: string): Promise<boolean> {
    return this.mongoWishRepository.toggleCompleteById(id);
  }
  deleteById(id: string): Promise<boolean> {
    return this.mongoWishRepository.deleteById(id);
  }
  deleteAllCompleted(userId: string): Promise<boolean> {
    return this.mongoWishRepository.deleteAllCompleted(userId);
  }
  deleteAll(userId: string): Promise<boolean> {
    return this.mongoWishRepository.deleteAll(userId);
  }
  deleteAllFromTrash(userId: string): Promise<boolean> {
    return this.deleteAllFromTrash(userId);
  }
  recoverById(id: string): Promise<boolean> {
    return this.recoverById(id);
  }
  recoverAll(userId: string): Promise<boolean> {
    return this.mongoWishRepository.recoverAll(userId);
  }
  searchFromIndex(userId: string, str: string): Promise<Wish[] | undefined> {
    return this.mongoWishRepository.searchFromIndex(userId, str);
  }
}
