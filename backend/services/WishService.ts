import { writeLog } from "../lib/logger";
import { WishInterface } from "../interfaces/WishInterface";

const WishModel = require("../models/Wish");
const SearchModel = require("../models/Search");

require("dotenv").config();

export const WishService = {
  add: async (userId: string, wish: WishInterface) => {
    wish.userId = userId;
    try {
      const wishToInsert = await WishModel.find({ text: wish.text, userId });
      if (wishToInsert.length === 0) {
        const wishAdded = await WishModel.create({ ...wish });
        await SearchModel.create({
          text: wish.text,
          createdAt: wish.createdAt,
        });
        return {
          data: wishAdded,
          message: "Wish added successfully",
          code: 200,
        };
      } else {
        return {
          message: "Wish already exists",
          code: 204,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Can't add wish",
        code: 204,
      };
    }
  },
  remove: async (_id: string) => {
    try {
      const wishRemoved = await WishModel.updateOne(
        { _id },
        { isDeleted: true }
      );

      if (wishRemoved.modifiedCount !== 0) {
        return {
          data: wishRemoved,
          message: "Wish removed successfully",
          code: 200,
        };
      } else {
        return {
          message: "Can't remove wish",
          code: 204,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Can't remove wish",
        code: 204,
      };
    }
  },

  complete: async (_id: string) => {
    try {
      const wishToComplete = await WishModel.find({ _id });
      const wishCompleted = await WishModel.updateOne(
        { _id },
        { $set: { isCompleted: !wishToComplete[0].isCompleted } }
      );
      console.log(wishCompleted);
      if (wishCompleted.modifiedCount !== 0) {
        return {
          data: wishCompleted,
          message: "Wish completed successfully",
          code: 200,
        };
      } else {
        return {
          message: "Can't complete wish",
          code: 204,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Can't complete wish",
        code: 204,
      };
    }
  },

  edit: async (_id: string, text: string) => {
    try {
      const wishEdited = await WishModel.updateOne({ _id }, { $set: { text } });

      if (wishEdited.modifiedCount !== 0) {
        return {
          data: wishEdited,
          message: "Wish edited successfully",
          code: 200,
        };
      } else {
        return {
          message: "Can't edit wish",
          code: 204,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Can't edit wish",
        code: 204,
      };
    }
  },

  recover: async (_id: string) => {
    try {
      const wishRecovered = await WishModel.updateOne(
        { _id },
        { $set: { isDeleted: false } }
      );

      if (wishRecovered.modifiedCount !== 0) {
        return {
          data: wishRecovered,
          message: "Wish recovered successfully",
          code: 200,
        };
      } else {
        return {
          message: "Can't recover wish",
          code: 204,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Can't recover wish",
        code: 204,
      };
    }
  },

  deleteCompleted: async (userId: string) => {
    try {
      const wishDeleted = await WishModel.updateMany(
        { userId, isCompleted: true },
        { $set: { isDeleted: true } }
      );

      if (wishDeleted.modifiedCount !== 0) {
        return {
          data: wishDeleted,
          message: "Wishes deleted successfully",
          code: 200,
        };
      } else {
        return {
          message: "Can't delete wishes",
          code: 204,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Can't edit wishes",
        code: 204,
      };
    }
  },

  recoverAll: async (userId: string) => {
    try {
      const wishesRecovered = await WishModel.updateMany(
        { userId },
        { $set: { isDeleted: false } }
      );

      if (wishesRecovered.modifiedCount !== 0) {
        return {
          data: wishesRecovered,
          message: "Wishes recovered successfully",
          code: 200,
        };
      } else {
        return {
          message: "Can't recover wishes",
          code: 204,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Can't recover wishes",
        code: 204,
      };
    }
  },

  deleteAll: async (userId: string) => {
    try {
      const wishesDeleted = await WishModel.updateMany(
        { userId },
        { $set: { isDeleted: true } }
      );

      if (wishesDeleted.modifiedCount !== 0) {
        return {
          data: wishesDeleted,
          message: "Wishes deleted successfully",
          code: 200,
        };
      } else {
        return {
          message: "Can't delete wishes",
          code: 204,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Can't delete wishes",
        code: 204,
      };
    }
  },

  empty: async (userId: string) => {
    try {
      const wishesDeleted = await WishModel.deleteMany({
        userId,
        isDeleted: true,
      });

      if (wishesDeleted.modifiedCount !== 0) {
        return {
          data: wishesDeleted,
          message: "Wishes deleted successfully",
          code: 200,
        };
      } else {
        return {
          message: "Can't delete wishes",
          code: 204,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Can't delete wishes",
        code: 204,
      };
    }
  },

  getAllWishes: async (userId: string) => {
    try {
      const wishes: WishInterface[] = await WishModel.find({ userId });

      return {
        data: wishes,
        message: "Wishes founded",
        code: 200,
      };
    } catch (err) {
      console.error(err);
      return {
        message: "Wishes not found",
        code: 204,
      };
    }
  },
  searchWish: async (str: string) => {
    try {
      const searchData = await SearchModel.aggregate().search({
        index: "myIndex",
        text: {
          query: str,
          fuzzy: {
            maxEdits: 2,
            maxExpansions: 100,
          },
          path: "text",
        },
      });

      return {
        data: searchData,
        message: "Data found",
        code: 200,
      };
    } catch (err) {
      console.error(err);
      return {
        message: "Can't search data",
        code: 204,
      };
    }
  },
};
