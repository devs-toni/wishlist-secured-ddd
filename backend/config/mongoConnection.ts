import { connect } from "mongoose";
import CONFIG from "./config";
import { writeLog } from '../lib/logger';

export async function mongoConnection(): Promise<void> {
  await connect(CONFIG.database.URL);
  writeLog("Connection established with MongoDB")
  console.log("Connection established with MongoDB")
}
