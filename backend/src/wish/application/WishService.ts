import { WishCreateUseCase } from './useCases/WishCreateUseCase';
import { WishSearchUseCase } from './useCases/WishSearchUseCase';
import { WishDeleteUseCase } from './useCases/WishDeleteUseCase';
import { WishUpdateUseCase } from './useCases/WishUpdateUseCase';
import {
  CreateWish,
  DeleteAllWishes,
  DeleteCompletedWishes,
  DeleteWish,
  DeleteWishFromTrash,
  RecoverAllWishes,
  RecoverWish,
  RetrieveAllWishes,
  SearchWishes,
  ToggleCompleteWish,
  UpdateWish,
  Wish,
} from "../domain";
import { WishRetrieveUseCase } from './useCases/WishRetrieveUseCase';
import { WishToggleCompleteUseCase } from './useCases/WishToggleCompleteUseCase';
import { WishRecoverUseCase } from './useCases/WishRecoverUseCase';
import { WishRecoverAllUseCase } from './useCases/WishRecoverAllUseCase';
import { WishDeleteAllUseCase } from './useCases/WishDeleteAllUseCase';
import { WishDeleteAllCompletedUseCase } from './useCases/WishDeleteAllCompletedUseCase';
import { WishDeleteFromTrashUseCase } from './useCases/WishDeleteFromTrashUseCase';

export class WishService
  implements
    CreateWish,
    DeleteWish,
    UpdateWish,
    RetrieveAllWishes,
    ToggleCompleteWish,
    RecoverWish,
    RecoverAllWishes,
    DeleteAllWishes,
    DeleteCompletedWishes,
    DeleteWishFromTrash,
    SearchWishes
{
  constructor(
    private readonly wishCreateUseCase: WishCreateUseCase,
    private readonly wishDeleteUseCase: WishDeleteUseCase,
    private readonly wishUpdateUseCase: WishUpdateUseCase,
    private readonly wishRetrieveUseCase: WishRetrieveUseCase,
    private readonly wishToggleCompleteUseCase: WishToggleCompleteUseCase,
    private readonly wishRecoverUseCase: WishRecoverUseCase,
    private readonly wishRecoverAllUseCase: WishRecoverAllUseCase,
    private readonly wishDeleteAllUseCase: WishDeleteAllUseCase,
    private readonly wishDeleteAllCompletedUseCase: WishDeleteAllCompletedUseCase,
    private readonly wishDeleteFromTrashUseCase: WishDeleteFromTrashUseCase,
    private readonly wishSearchUseCase: WishSearchUseCase
  ) {}

  searchFromIndex(userId: string, str: string): Promise<Wish[] | undefined> {
    return this.wishSearchUseCase.searchFromIndex(userId, str);
  }
  save(userId: string, wish: Wish): Promise<Wish | undefined> {
    return this.wishCreateUseCase.save(userId, wish);
  }
  deleteById(id: string): Promise<boolean> {
    return this.wishDeleteUseCase.deleteById(id);
  }
  updateById(id: string, text: string): Promise<Wish | undefined> {
    return this.wishUpdateUseCase.updateById(id, text);
  }
  findAll(userId: string): Promise<Wish[] | undefined> {
    return this.wishRetrieveUseCase.findAll(userId);
  }
  toggleCompleteById(id: string): Promise<boolean> {
    return this.wishToggleCompleteUseCase.toggleCompleteById(id);
  }
  recoverById(id: string): Promise<boolean> {
    return this.wishRecoverUseCase.recoverById(id);
  }
  recoverAll(userId: string): Promise<boolean> {
    return this.wishRecoverAllUseCase.recoverAll(userId);
  }
  deleteAll(userId: string): Promise<boolean> {
    return this.wishDeleteAllUseCase.deleteAll(userId);
  }
  deleteAllCompleted(userId: string): Promise<boolean> {
    return this.wishDeleteAllCompletedUseCase.deleteAllCompleted(userId);
  }
  deleteAllFromTrash(userId: string): Promise<boolean> {
    return this.wishDeleteFromTrashUseCase.deleteAllFromTrash(userId);
  }
}
