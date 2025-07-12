/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

// import AppError from "../../../erroralpers/appError";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // throw new AppError(httpStatus.BAD_REQUEST, "fake error");
//     const user = await userServices.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: "user created successfully",
//       user,
//     });
//   } catch (err: any) {
//     console.log(err);
//     next(err);
//   }
// };
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );
    const payload = req.body;

    const user = await userServices.updateUser(
      userId,
      payload,
      verifiedToken as JwtPayload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Updated Successfully",
      data: user,
    });
  }
);

const getAllUSers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUSers();
    // res.status(httpStatus.OK).json({
    //   success: true,
    //   message: "All user Retrieved Successfully",
    //   data: user,
    // });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All user Retrieved Successfully",
      data: result.users,
      meta: result.meta,
    });
  }
);

export const userController = {
  createUser,
  getAllUSers,
  updateUser,
};
