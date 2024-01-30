import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import httpStatus from "http-status";

dotenv.config();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use("/health", (_res, res) =>
    res.status(httpStatus.OK).send("Tocos Backend run successfully.")
  );

const PORT = process.env.PORT || 8000;

export const server = app.listen(PORT, () => 
  console.log(`Server started on port ${PORT}`)
);

export default app;