import { Wish, WishRepositoryPort } from "../../domain";
import { MongoWishRepository } from "../repository/MongoWishRepository";

export class WishRepositoryAdapter implements WishRepositoryPort {
  constructor(private readonly mongoWishRepository: MongoWishRepository) {}

  save(userId: string, wish: Wish) {
    return this.mongoWishRepository.save(userId, wish);
  }
  findAll(userId: string) {
    return this.mongoWishRepository.findAll(userId);
  }
  updateById(id: string, text: string) {
    return this.mongoWishRepository.updateById(id, text);
  }
  toggleCompleteById(id: string) {
    return this.mongoWishRepository.toggleCompleteById(id);
  }
  deleteById(id: string) {
    return this.mongoWishRepository.deleteById(id);
  }
  deleteAllCompleted(userId: string) {
    return this.mongoWishRepository.deleteAllCompleted(userId);
  }
  deleteAll(userId: string) {
    return this.mongoWishRepository.deleteAll(userId);
  }
  deleteAllFromTrash(userId: string) {
    return this.mongoWishRepository.deleteAllFromTrash(userId);
  }
  recoverById(id: string) {
    return this.mongoWishRepository.recoverById(id);
  }
  recoverAll(userId: string) {
    return this.mongoWishRepository.recoverAll(userId);
  }
  searchFromIndex(userId: string, str: string) {
    return this.mongoWishRepository.searchFromIndex(userId, str);
  }
}
