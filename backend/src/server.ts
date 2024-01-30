import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import httpStatus from "http-status";

import connectMongo from "./database";
import requestLogger from "./utils/middleware";
import { TransactionRouter, UserRouter } from "./routers";
import { info } from "./utils/logger";

dotenv.config();

const app = express();

connectMongo(app);

app
  .use(cors())
  .use(express.json())
  .use(requestLogger)
  .use("/health", (_res, res) =>
    res.status(httpStatus.OK).send("Tocos Backend run successfully.")
  )
  .use("/user", UserRouter)
  .use("/transaction", TransactionRouter);

const PORT = process.env.PORT || 8000;

export const server = app.listen(PORT, () =>
  info(`Server started on port ${PORT}`)
);

export default app;
