/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import AppError from "../../../erroralpers/appError";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(httpStatus.BAD_REQUEST, "fake error");
    const user = await userServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "user created successfully",
      user,
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const userController = {
  createUser,
};
