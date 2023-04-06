import { Wish } from "../../entities/Wish";


export interface RetrieveAllWishes {
  findAll(userId: string): Promise<Wish[] | undefined>;
}