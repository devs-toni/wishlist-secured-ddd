import mongoose from "mongoose";
import CONFIG from "./config";

function connect(): Promise<typeof mongoose> {
  console.log("Connecting with MongoDB . . .");
  return mongoose.connect(
    "mongodb+srv://cluster0.hwmnwed.mongodb.net/wishlist?authMechanism=MONGODB-X509&authSource=%24external&tls=true&tlsCertificateKeyFile=C%3A%5CUsers%5CUsuario%5CDownloads%5CX509-cert-51376857154002692.pem",
  );
  //return mongoose.connect(CONFIG.database.URL);
}

module.exports = connect;
