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

export const authController = {
  credentialsLogin,
};
