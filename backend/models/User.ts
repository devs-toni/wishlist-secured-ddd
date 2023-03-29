import { Schema, model } from "mongoose";

const users: Schema = new Schema({
  name: String,
  wishes: Array,
});

const Users = model("User", users);
module.exports = Users;
