import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import Configuration, { ENV } from "./src/config/infrastructure/Configuration";
import { loggerStream } from "./lib/winstonLogger";
import { userRouter } from "./src/user/infrastructure";
import { wishRouter } from "./src/wish/infrastructure";
import { Database, MongoDBConnection } from "./src/config/infrastructure";

// REQUIREMENTS

require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const { application } = Configuration;

// SERVER CONFIGURATION

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.json());
app.use(helmet());
app.use(
  morgan(
    ":method :url :status: :res[content-length]- :response-time ms - API Server",
    { stream: loggerStream, skip: () => !ENV }
  )
);

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

app.use("/users", userRouter);
app.use("/wishes", wishRouter);

// SERVER CONNECTION
const database = new Database(new MongoDBConnection());
database.connect().then(() => {
  app.listen(application.PORT, () => {
    console.log("Server listening on port " + application.PORT);
  });
});
