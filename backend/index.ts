import express, { Express, Router, Request, Response } from "express";
import CONFIG from "./config/config";
import { mongoConnection as mongoInit } from "./config/mongoConnection";
import morgan from "morgan";
import { ENV } from "./config/config";
import { loggerStream } from "./lib/winstonLogger";
import { writeLog } from "./lib/logger";

require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const router: Router = require("./router/router");
const { application } = CONFIG;

mongoInit();

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
app.use("/", router);

app.listen(application.PORT, () => {
  console.log("Server listening on port " + application.PORT);
  writeLog("Server listening on port " + application.PORT);
});
