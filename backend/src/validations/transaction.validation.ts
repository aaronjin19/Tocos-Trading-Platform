import { TYPE } from "../consts";

export const validTransaction = (userData: TYPE.ITransactionData) => {
  const { sender, receiver, amount } = userData;
  if (!sender) return "Sender is required";
  if (!receiver) return "Receiver is required";
  if (!amount) return "Token amount is required";
  if (amount < 0) return "Token amount must greater than 0";
};
