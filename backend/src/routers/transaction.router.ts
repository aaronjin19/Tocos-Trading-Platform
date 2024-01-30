import express from "express";
import { addTransaction, getTransaction } from "../controllers";

export const TransactionRouter = express.Router();

TransactionRouter.get("/:id", getTransaction);
TransactionRouter.post("/", addTransaction);
