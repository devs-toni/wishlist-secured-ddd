import { DeleteWish } from "../../domain";
import { WishRepositoryAdapter } from '../../infrastructure/adapters/WishRepositoryAdapter';

export class WishDeleteUseCase implements DeleteWish {
  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  deleteById(id: string) {
    return this.wishRepositoryAdapter.deleteById(id);
  }
}
