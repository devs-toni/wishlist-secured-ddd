import { SearchWishes } from "../../domain";
import { WishRepositoryAdapter } from '../../infrastructure/adapters/WishRepositoryAdapter';

export class WishSearchUseCase implements SearchWishes {
  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  searchFromIndex(userId: string, str: string) {
    return this.wishRepositoryAdapter.searchFromIndex(userId, str);
  }
}
