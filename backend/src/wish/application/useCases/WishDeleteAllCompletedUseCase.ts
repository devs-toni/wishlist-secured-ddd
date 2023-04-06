import { DeleteCompletedWishes } from "../../domain";
import { WishRepositoryAdapter } from '../../infrastructure/adapters/WishRepositoryAdapter';

export class WishDeleteAllCompletedUseCase implements DeleteCompletedWishes {
  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  deleteAllCompleted(userId: string): Promise<boolean> {
    return this.wishRepositoryAdapter.deleteAllCompleted(userId);
  }
}
