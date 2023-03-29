import express, { Express, Router, Request, Response } from "express";
import CONFIG from "./config/config";
import { connect } from "mongoose";
const router: Router = require("./router/router");
const { application, database } = CONFIG;

require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");

const app: Express = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

async function main(): Promise<void> {
  await connect(database.URL);
  console.log("Connection established with MongoDb");
}
main();

app.use((_request: Request, response: Response, next: () => void) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
  );
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  response.header("Allow", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  next();
});

app.use("/", router);

app.listen(application.PORT, () => {
  console.log("Server listening on port " + application.PORT);
});
