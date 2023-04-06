import { DatabaseConnection } from "../../domain";
import { MongoDBConnection } from "../MongoDB/MongoDBConnection";

export class Database implements DatabaseConnection {
  
  constructor(private readonly mongoDBConnection: MongoDBConnection) {}

  connect(): Promise<Object> {
    return this.mongoDBConnection.connect();
  }
}
