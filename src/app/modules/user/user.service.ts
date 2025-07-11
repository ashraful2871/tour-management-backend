import AppError from "../../../erroralpers/appError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "user Already Exist");
  }

  const hasPassword = await bcryptjs.hash(password as string, 10);

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: hasPassword,
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
