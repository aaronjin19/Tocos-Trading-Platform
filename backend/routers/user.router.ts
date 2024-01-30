import express from "express";

export const UserRouter = express.Router();

UserRouter.get("/");
UserRouter.get("/:id");
UserRouter.post("/");