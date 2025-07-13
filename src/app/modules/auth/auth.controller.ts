/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { authService } from "./auth.service";
import AppError from "../../../erroralpers/appError";
import { setAuthCookie } from "../../utils/setCookie";
const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const user = await userServices.createUser(req.body);

    const loginInfo = await authService.credentialsLogin(req.body);

    // res.cookie("refresh-token", loginInfo.refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    // });

    // res.cookie("access-token", loginInfo.accessToken, {
    //   httpOnly: true,
    //   secure: false,
    // });

    setAuthCookie(res, loginInfo);

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
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "no refresh token received from cookies"
      );
    }
    const tokenInfo = await authService.getNewAccessToken(
      refreshToken as string
    );

    // res.cookie("access-token", tokenInfo.accessToken, {
    //   httpOnly: true,
    //   secure: false,
    // });
    setAuthCookie(res, tokenInfo.accessToken);
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
