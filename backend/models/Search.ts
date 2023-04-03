import { Schema, model } from "mongoose";

const SearchSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const SearchModel = model("Search", SearchSchema);
module.exports = SearchModel;
