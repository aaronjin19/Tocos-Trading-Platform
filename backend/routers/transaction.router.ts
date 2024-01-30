import express from "express";

export const TransactionRouter = express.Router();

TransactionRouter.get("/:id");
TransactionRouter.post("/");
