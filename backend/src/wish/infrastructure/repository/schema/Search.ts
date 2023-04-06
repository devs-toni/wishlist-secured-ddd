import { Schema, model } from "mongoose";

const SearchSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const SearchModel = model("Search", SearchSchema);

