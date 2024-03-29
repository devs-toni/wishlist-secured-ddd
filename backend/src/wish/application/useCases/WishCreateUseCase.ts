import { CreateWish, Wish } from "../../domain";
import { WishRepositoryAdapter } from '../../infrastructure/adapters/WishRepositoryAdapter';

export class WishCreateUseCase implements CreateWish {

  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  save(userId: string, wish: Wish) {
    return this.wishRepositoryAdapter.save(userId, wish);
  }
}
