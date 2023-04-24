import mongoose from "mongoose";
import { DatabaseConnection } from "../../domain";
require("dotenv").config();

const { DB_URI_ATLAS } = process.env;

export class MongoDBConnection implements DatabaseConnection {
  connect(): Promise<Object> {
    console.log("Connecting with MongoDB . . .");
    return mongoose.connect(`${DB_URI_ATLAS}${__dirname}/mongo_key.pem`);
  }
}
