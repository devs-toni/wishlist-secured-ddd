import { Wish } from "../../entities/Wish";

export interface UpdateWish {
  updateById(id: string, text: string): Promise<Wish | undefined>;
}
