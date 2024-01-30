import express from "express";
import { addUser, getOneUser, getUsers } from "../controllers";

export const UserRouter = express.Router();

UserRouter.get("/", getUsers);
UserRouter.get("/:id", getOneUser);
UserRouter.post("/", addUser);
