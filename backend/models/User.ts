import { Schema, model } from "mongoose";

const users: Schema = new Schema({
  name: String,
  password: String,
  wishes: Array,
  token: String
});

const Users = model("User", users);
module.exports = Users;
