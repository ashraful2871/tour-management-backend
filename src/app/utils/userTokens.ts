import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generaToken } from "./jwt";

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
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};
