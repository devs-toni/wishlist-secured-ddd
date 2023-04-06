import {
  Encrypter,
  UserAuthenticator,
  UserService,
} from "../../../user/application";
import {
  MongoUserRepository,
  UserRepositoryAdapter,
} from "../../../user/infrastructure";
import { UserController } from "../../../user/infrastructure/controller/UserController";
import {
  WishDeleteAllCompletedUseCase,
  WishDeleteAllUseCase,
  WishDeleteFromTrashUseCase,
  WishDeleteUseCase,
  WishRecoverUseCase,
  WishRetrieveUseCase,
  WishService,
  WishToggleCompleteUseCase,
  WishUpdateUseCase,
  WishSearchUseCase,
  WishRecoverAllUseCase,
  WishCreateUseCase,
} from "../../../wish/application";
import {
  MongoWishRepository,
  WishController,
} from "../../../wish/infrastructure";
import { WishRepositoryAdapter } from "../../../wish/infrastructure/adapters/WishRepositoryAdapter";


const userAuthenticator: UserAuthenticator = new UserAuthenticator();


const UserBean = (): UserController => {
  const mongoUserRepository: MongoUserRepository = new MongoUserRepository();
  const encrypter = new Encrypter();
  const userRepository: UserRepositoryAdapter = new UserRepositoryAdapter(
    mongoUserRepository
  );

  const userService: UserService = new UserService(
    userRepository,
    userAuthenticator,
    encrypter
  );
  return new UserController(userService);
};

const WishBean = (): WishController => {
  const mongoWishRepository: MongoWishRepository = new MongoWishRepository();
  const wishRepositoryAdapter: WishRepositoryAdapter =
    new WishRepositoryAdapter(mongoWishRepository);
  const wishCreateUseCase: WishCreateUseCase = new WishCreateUseCase(
    wishRepositoryAdapter
  );
  const wishDeleteUseCase: WishDeleteUseCase = new WishDeleteUseCase(
    wishRepositoryAdapter
  );
  const wishDeleteAllUseCase: WishDeleteAllUseCase = new WishDeleteAllUseCase(
    wishRepositoryAdapter
  );
  const wishDeleteFromTrashUseCase: WishDeleteFromTrashUseCase =
    new WishDeleteFromTrashUseCase(wishRepositoryAdapter);
  const wishDeleteAllCompletedUseCase: WishDeleteAllCompletedUseCase =
    new WishDeleteAllCompletedUseCase(wishRepositoryAdapter);
  const wishRecoverAllUseCase: WishRecoverAllUseCase =
    new WishRecoverAllUseCase(wishRepositoryAdapter);
  const wishRecoverUseCase: WishRecoverUseCase = new WishRecoverUseCase(
    wishRepositoryAdapter
  );
  const wishRetrieveUseCase: WishRetrieveUseCase = new WishRetrieveUseCase(
    wishRepositoryAdapter
  );
  const wishSearchUseCase: WishSearchUseCase = new WishSearchUseCase(
    wishRepositoryAdapter
  );
  const wishToggleCompleteUseCase: WishToggleCompleteUseCase =
    new WishToggleCompleteUseCase(wishRepositoryAdapter);
  const wishUpdateUseCase: WishUpdateUseCase = new WishUpdateUseCase(
    wishRepositoryAdapter
  );
  const wishService: WishService = new WishService(
    wishCreateUseCase,
    wishDeleteUseCase,
    wishUpdateUseCase,
    wishRetrieveUseCase,
    wishToggleCompleteUseCase,
    wishRecoverUseCase,
    wishRecoverAllUseCase,
    wishDeleteAllUseCase,
    wishDeleteAllCompletedUseCase,
    wishDeleteFromTrashUseCase,
    wishSearchUseCase
  );
  return new WishController(wishService, userAuthenticator);
};

export const userController = UserBean();
export const wishController = WishBean();
