import { Wish, WishRepositoryPort } from "../../domain";
import { WishModel } from './schema/Wish';
import { SearchModel } from './schema/Search';

export class MongoWishRepository implements WishRepositoryPort {
  async save(userId: string, wish: Wish): Promise<Wish | undefined> {
    wish.setUserId(userId);
    try {
      const wishToInsert = await WishModel.find({
        text: wish.getText(),
        userId,
      });

      if (wishToInsert.length === 0) {
        const wishAdded = await WishModel.create({ ...wish });
        await SearchModel.create({
          text: wish.getText(),
          createdAt: wish.getCreatedAt(),
          userId: wish.getUserId(),
        });
        return wishAdded[0];
      } else return;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async findAll(userId: string): Promise<Wish[] | undefined> {
    try {
      const wishes: Wish[] = await WishModel.find({ userId });
      return wishes;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  async updateById(id: string, text: string): Promise<Wish | undefined> {
    try {
      const wishEdited = await WishModel.updateOne(
        { _id: id },
        { $set: { text } }
      );

      if (wishEdited.modifiedCount !== 0) return wishEdited[0];
      else return undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async toggleCompleteById(id: string): Promise<boolean> {
    try {
      const wishToComplete = await WishModel.find({ _id: id });

      const wishCompleted = await WishModel.updateOne(
        { _id: id },
        { $set: { isCompleted: !wishToComplete[0].isCompleted } }
      );

      if (wishCompleted.modifiedCount !== 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const wishRemoved = await WishModel.updateOne(
        { _id: id },
        { isDeleted: true }
      );

      if (wishRemoved.modifiedCount !== 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteAllCompleted(userId: string): Promise<boolean> {
    try {
      const wishDeleted = await WishModel.updateMany(
        { userId, isCompleted: true },
        { $set: { isDeleted: true } }
      );

      if (wishDeleted.modifiedCount !== 0) return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteAll(userId: string): Promise<boolean> {
    try {
      const wishesDeleted = await WishModel.updateMany(
        { userId },
        { $set: { isDeleted: true } }
      );

      if (wishesDeleted.modifiedCount !== 0) return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteAllFromTrash(userId: string): Promise<boolean> {
    try {
      const wishesDeleted = await WishModel.deleteMany({
        userId,
        isDeleted: true,
      });

      if (wishesDeleted.deletedCount !== 0) return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async recoverById(id: string): Promise<boolean> {
    try {
      const wishRecovered = await WishModel.updateOne(
        { _id: id },
        { $set: { isDeleted: false } }
      );
      if (wishRecovered.modifiedCount !== 0) return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async recoverAll(id: string): Promise<boolean> {
    try {
      const wishesRecovered = await WishModel.updateMany(
        { userId: id },
        { $set: { isDeleted: false } }
      );

      if (wishesRecovered.modifiedCount !== 0) return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async searchFromIndex(
    userId: string,
    str: string
  ): Promise<Wish[] | undefined> {
    try {
      const searchData = await SearchModel.aggregate([
        {
          $search: {
            index: "myIndex",
            count: { type: "lowerBound" },
            compound: {
              filter: [
                {
                  text: {
                    query: userId,
                    path: "userId",
                  },
                },
                {
                  range: {
                    path: "createdAt",
                    gt: new Date("2022-04-01T00:00:00.000Z"),
                    lt: new Date("2025-04-01T00:00:00.000Z"),
                  },
                },
              ],
              should: [
                {
                  regex: {
                    query: `*${str}*`,
                    path: "text",
                    allowAnalyzedField: true,
                    score: { boost: { value: 1.5 } },
                  },
                },
                {
                  text: {
                    query: str,
                    path: "text",
                    fuzzy: {
                      maxEdits: 2,
                      maxExpansions: 100,
                    },
                    score: { boost: { value: 1 } },
                  },
                },
                {
                  text: {
                    query: str,
                    path: "text",
                    score: { boost: { value: 2 } },
                  },
                },
              ],
            },
          },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            _id: 1,
            text: 1,
            createdAt: 1,
            score: {
              $meta: "searchScore",
            },
          },
        },
      ]);

      return searchData;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
}