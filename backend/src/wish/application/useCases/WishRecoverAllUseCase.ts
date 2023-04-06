import { RecoverAllWishes } from "../../domain";
import { WishRepositoryAdapter } from '../../infrastructure/adapters/WishRepositoryAdapter';

export class WishRecoverAllUseCase implements RecoverAllWishes {
  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  recoverAll(userId: string): Promise<boolean> {
    return this.wishRepositoryAdapter.recoverAll(userId);
  }
}
