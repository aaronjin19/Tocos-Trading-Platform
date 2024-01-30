import { TYPE } from "../consts";

export const validUser = (userData: TYPE.IUserData) => {
  const { name, token } = userData;
  if (!name) return "Name is required";
  if (!token) return "Token is required";
  if (token <= 0) return "Token must greater than 0";
};
