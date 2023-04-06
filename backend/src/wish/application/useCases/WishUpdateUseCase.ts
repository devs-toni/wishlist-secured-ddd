import { UpdateWish, Wish } from "../../domain";
import { WishRepositoryAdapter } from "../../infrastructure";

export class WishUpdateUseCase implements UpdateWish {
  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  updateById(id: string, text: string) {
    return this.wishRepositoryAdapter.updateById(id, text);
  }
}
