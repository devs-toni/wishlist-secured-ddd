import { DeleteAllWishes } from "../../domain";
import { WishRepositoryAdapter } from "../../infrastructure";

export class WishDeleteAllUseCase implements DeleteAllWishes {

  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}
 
  deleteAll(userId: string) {
    return this.wishRepositoryAdapter.deleteAll(userId);
  }
}
