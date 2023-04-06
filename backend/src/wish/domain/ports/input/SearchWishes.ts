import { Wish } from "../../entities/Wish";

export interface SearchWishes {
  searchFromIndex(userId: string, str: string): Promise<Wish[] | undefined>;
}
