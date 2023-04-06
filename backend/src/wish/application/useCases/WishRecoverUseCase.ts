import { RecoverWish } from "../../domain";
import { WishRepositoryAdapter } from "../../infrastructure";

export class WishRecoverUseCase implements RecoverWish {
  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  recoverById(id: string): Promise<boolean> {
    return this.wishRepositoryAdapter.recoverById(id);
  }
}
