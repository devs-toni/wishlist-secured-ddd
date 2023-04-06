import { Schema, model } from "mongoose";

const WishSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, required: true },
    userId: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export const WishModel = model("Wish", WishSchema);
