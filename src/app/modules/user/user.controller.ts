/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "user created successfully",
      user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(httpStatus.BAD_REQUEST).json({
      message: `something went wrong ${error.message}`,
    });
  }
};

export const userController = {
  createUser,
};
