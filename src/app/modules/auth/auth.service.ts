import AppError from "../../../erroralpers/appError";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import {
  createNewAccessTokenWithNewToken,
  createUserTokens,
} from "../../utils/userTokens";

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
  // const jwtPayload = {
  //   userID: isUserExist._id,
  //   email: isUserExist.email,
  //   role: isUserExist.role,
  // };

  // const accessToken = generaToken(
  //   jwtPayload,
  //   envVars.JWT_ACCESS_SECRET,
  //   envVars.JWT_ACCESS_EXPIRES
  // );
  // const refreshToken = generaToken(
  //   jwtPayload,
  //   envVars.JWT_ACCESS_SECRET,
  //   envVars.JWT_ACCESS_EXPIRES
  // );
  const userTokens = createUserTokens(isUserExist);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = isUserExist.toObject();
  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};
const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithNewToken(refreshToken);

  // const userTokens = createUserTokens(isUserExist);

  return {
    accessToken: newAccessToken,
  };
};

export const authService = {
  credentialsLogin,
  getNewAccessToken,
};
