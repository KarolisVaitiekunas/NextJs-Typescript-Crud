import mongoose from "mongoose";
import config from "config";
import log from "./logger";

const db_URI = config.get<string>("db_URI");

const connectToDB = () => {
  mongoose
    .connect(db_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error(error);
      process.exit(1);
    });
};

export default connectToDB;
