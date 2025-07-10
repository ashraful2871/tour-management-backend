import AppError from "../../../erroralpers/appError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
const createUser = async (payload: Partial<IUser>) => {
  const { email, ...rest } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "user Already Exist");
  }
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const getAllUSers = async () => {
  const users = await User.find({});
  const totalUSers = await User.countDocuments();

  return {
    users,
    meta: {
      total: totalUSers,
    },
  };
};

export const userServices = {
  createUser,
  getAllUSers,
};
