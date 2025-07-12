/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { authService } from "./auth.service";
const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const user = await userServices.createUser(req.body);
    const loginInfo = await authService.credentialsLogin(req.body);
    console.log(loginInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Login Successfully",
      data: loginInfo,
    });
  }
);
const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const user = await userServices.createUser(req.body);
    const refreshToken = req.headers.authorization;
    const tokenInfo = await authService.getNewAccessToken(
      refreshToken as string
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Login Successfully",
      data: tokenInfo,
    });
  }
);

export const authController = {
  credentialsLogin,
  getNewAccessToken,
};
