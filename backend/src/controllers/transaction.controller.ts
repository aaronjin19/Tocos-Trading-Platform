import { Request, Response } from "express";
import httpStatus from "http-status";

import { TYPE } from "../consts";
import { Transaction, User } from "../models";
import { validTransaction } from "../validations";
import { CustomeError } from "../utils/customError";
import { error } from "../utils/logger";

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const userData: TYPE.ITransactionData = req.body;
    const validError = validTransaction(userData);
    if (validError) throw new CustomeError(validError, httpStatus.BAD_REQUEST);
    const sendUser = await User.findById(userData.sender);
    if (!sendUser)
      throw new CustomeError("Sender does not exist.", httpStatus.NOT_FOUND);
    const receiveUser = await User.findById(userData.receiver);
    if (!receiveUser)
      throw new CustomeError("Receiver does not exist.", httpStatus.NOT_FOUND);
    if (userData.sender == userData.receiver)
      throw new CustomeError(
        "Sender can't be same with receiver.",
        httpStatus.BAD_REQUEST
      );
    if (sendUser.token < userData.amount)
      throw new CustomeError(
        "Sender hasn't got enough money.",
        httpStatus.BAD_REQUEST
      );

    await new Transaction(userData).save();
    sendUser.token -= userData.amount;
    receiveUser.token += userData.amount;
    await sendUser.save();
    await receiveUser.save();

    return res
      .status(httpStatus.CREATED)
      .json({ msg: "Transaction created successfully!" });
  } catch (err: any) {
    error(err);
    if (err instanceof CustomeError)
      return res.status(err.status).json({ msg: err.message });
    else
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        msg: "An error occurred while adding the transaction.",
      });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const transactions = await Transaction.find({
      $or: [{ sender: id }, { receiver: id }],
    })
      .populate("sender", "name")
      .populate("receiver", "name");
    return res.status(httpStatus.OK).json(transactions);
  } catch (err: any) {
    error(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "An error occurred while getting the list of transaction.",
    });
  }
};
