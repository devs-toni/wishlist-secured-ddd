import { Wish } from "../../entities/Wish";

export interface CreateWish {
  save(userId: string, wish: Wish): Promise<Wish | undefined>;
}
