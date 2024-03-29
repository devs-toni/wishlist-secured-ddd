import { ToggleCompleteWish } from "../../domain";
import { WishRepositoryAdapter } from "../../infrastructure";

export class WishToggleCompleteUseCase implements ToggleCompleteWish {
  constructor(private readonly wishRepositoryAdapter: WishRepositoryAdapter) {}

  toggleCompleteById(id: string) {
    return this.wishRepositoryAdapter.toggleCompleteById(id);
  }
}
