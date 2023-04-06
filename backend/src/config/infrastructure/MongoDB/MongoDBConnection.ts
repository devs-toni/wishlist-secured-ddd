import mongoose from "mongoose";
import { DatabaseConnection } from "../../domain";

export class MongoDBConnection implements DatabaseConnection {
  connect(): Promise<Object> {
    console.log("Connecting with MongoDB . . .");
    return mongoose.connect(
      `mongodb+srv://cluster0.hwmnwed.mongodb.net/wishlist?authMechanism=MONGODB-X509&authSource=%24external&tls=true&tlsCertificateKeyFile=${__dirname}/mongo_key.pem`
    );
  }
}
