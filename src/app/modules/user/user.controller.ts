/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

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
    res.status(httpStatus.CREATED).json({
      message: "user created successfully",
      data: user,
    });
  }
);

const getAllUSers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.getAllUSers();
    res.status(httpStatus.OK).json({
      success: true,
      message: "All user Retrieved Successfully",
      data: user,
    });
  }
);

export const userController = {
  createUser,
  getAllUSers,
};
