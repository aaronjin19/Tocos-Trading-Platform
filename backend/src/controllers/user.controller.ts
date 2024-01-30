import { Request, Response } from "express";
import httpStatus from "http-status";

import { User } from "../models";
import { TYPE } from "../consts";
import { validUser } from "../validations";
import { error } from "../utils/logger";
import { CustomeError } from "../utils/customError";

export const addUser = async (req: Request, res: Response) => {
  try {
    const userData: TYPE.IUserData = req.body;
    const validError = validUser(userData);
    if (validError) {
      throw new CustomeError(validError, httpStatus.BAD_REQUEST);
    }
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return res
      .status(httpStatus.CREATED)
      .json({ id: savedUser._id, createdData: savedUser.createdDate });
  } catch (err: any) {
    error(err);
    if (err instanceof CustomeError)
      return res.status(err.status).json({ msg: err.message });
    else
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: "An error occured while adding the user!" });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(httpStatus.OK).json(users);
  } catch (err: any) {
    error(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: "An error occurred while getting the list of users." });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const getUser = await User.findById(id);
    if (!getUser)
      throw new CustomeError("User not found", httpStatus.NOT_FOUND);
    return res.status(httpStatus.OK).json(getUser);
  } catch (err: any) {
    error(err);
    if (err instanceof CustomeError)
      return res.status(err.status).json({ msg: err.message });
    else
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ msg: "An error occurred while getting the user" });
  }
};
