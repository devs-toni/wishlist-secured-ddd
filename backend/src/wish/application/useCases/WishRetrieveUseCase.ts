import { Wish } from '../../domain/entities/Wish';
import { RetrieveAllWishes } from '../../domain/ports/input/RetrieveAllWishes';
import { WishRepositoryAdapter } from '../../infrastructure/adapters/WishRepositoryAdapter';


export class WishRetrieveUseCase implements RetrieveAllWishes {

  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  findAll(userId: string) {
    return this.wishRepositoryAdapter.findAll(userId);
  }
}