import { DeleteWishFromTrash, WishRepositoryPort } from "../../domain";
import { WishRepositoryAdapter } from "../../infrastructure";

export class WishDeleteFromTrashUseCase implements DeleteWishFromTrash {

  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  deleteAllFromTrash(userId: string) {
    return this.wishRepositoryAdapter.deleteAllFromTrash(userId);
  }
}
