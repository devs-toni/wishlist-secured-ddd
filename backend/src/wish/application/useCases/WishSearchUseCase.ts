import { Wish } from "../../domain/entities/Wish";
import { SearchWishes } from "../../domain";
import { WishRepositoryAdapter } from '../../infrastructure/adapters/WishRepositoryAdapter';

export class WishSearchUseCase implements SearchWishes {
  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  searchFromIndex(userId: string, str: string): Promise<Wish[] | undefined> {
    return this.wishRepositoryAdapter.searchFromIndex(userId, str);
  }
}
