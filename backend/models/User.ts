import { Schema, model } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    wishes: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);
module.exports = UserModel;
