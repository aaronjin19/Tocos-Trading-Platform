import { Application } from "express";
import mongoose from "mongoose";
import Logger from "./utils/logger";

const connectMongo = (app: Application) => {
  const connectAndRetry = async () => {
    const mongoURI =
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_PRODUCTION_URI
        : process.env.MONGO_TEST_URI;
    if (!mongoURI) {
      Logger.error("MongoURI is not defined.");
      return;
    }
    try {
      await mongoose.connect(mongoURI);
      Logger.info("MongoDB is connected");
      app.emit("ready");
    } catch (err: any) {
      Logger.error(err);
      Logger.info("Connection is failed, retry after 5seconds.");
      setTimeout(connectAndRetry, 5000);
    }
  };

  connectAndRetry();
};

export default connectMongo;
