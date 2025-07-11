import AppError from "../../../erroralpers/appError";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "user Dose not Exist");
  }

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect  Password");
  }
  return {
    email: isUserExist.email,
  };
};

export const authService = {
  credentialsLogin,
};
