import express, { Express, Router, Request, Response } from "express";
import CONFIG from "./config/config";
import morgan from "morgan";
import { ENV } from "./config/config";
import { loggerStream } from "./lib/winstonLogger";

// REQUIREMENTS

require("dotenv").config();
const helmet = require("helmet");
const connect = require("./config/database");
const cors = require("cors");
const userRouter: Router = require("./routes/UserRouter");
const { application } = CONFIG;

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

// SERVER CONNECTION

connect().then(function initServer() {
  app.listen(application.PORT, () => {
    console.log("Server listening on port " + application.PORT);
  });
});
