import { Schema, model } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", UserSchema);

