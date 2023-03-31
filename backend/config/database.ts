import mongoose from "mongoose";
import CONFIG from "./config";

function connect(): Promise<typeof mongoose> {
  console.log("Connection established with MongoDB");
  return mongoose.connect(CONFIG.database.URL);
}

module.exports = connect;
