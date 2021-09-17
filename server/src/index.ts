import express from "express";
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";
import log from "./utils/logger";

import connectToDB from "./utils/database";

const port = config.get<number>("port");
const host = config.get<string>("host");
const clientPort = config.get<number>("clientPort");

<<<<<<< HEAD
declare module "express-serve-static-core" {
  interface Request {
    user: string;
  }
  interface Response {
    user: string;
=======
declare module 'express-serve-static-core' {
  interface Request {
    user: string
  }
  interface Response {
    user: string
>>>>>>> b21b9efb6e8c43572075985562b4878d5befcc41
  }
}

const app = express();
app.use(cors({ credentials: true, origin: `http://${host}:${clientPort}` }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

import authRouter from "./routes/authRoute";
app.use("/auth", authRouter);

import postRouter from "./routes/postRoute";
app.use("/post", postRouter);

app.listen(port, () => {
  log.info(`Server listening at http://${host}:${port}`);
  connectToDB();
});
