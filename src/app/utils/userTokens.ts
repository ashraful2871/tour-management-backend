import { envVars } from "../config/env";
import { IsActive, IUser } from "../modules/user/user.interface";
import { generaToken, verifyToken } from "./jwt";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import AppError from "../../erroralpers/appError";
import httpStatus from "http-status-codes";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    userID: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generaToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );
  const refreshToken = generaToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithNewToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "user Dose not Exist");
  }
  if (isUserExist.isActive === IsActive.InActive) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `user is ${isUserExist.isActive}`
    );
  }
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "user is deleted");
  }
  const jwtPayload = {
    userID: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generaToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return {
    accessToken,
  };
};
