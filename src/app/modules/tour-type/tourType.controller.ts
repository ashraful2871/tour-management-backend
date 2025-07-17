/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { tourTypeServices } from "./tourType.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

// crete-tour
const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourType = await tourTypeServices.createTourType(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "tour type created successfully",
      data: tourType,
    });
  }
);
// update-tour
const updateTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourTypeId = req.params.id;
    const payload = req.body;
    const verifiedToken = req.user;
    const newUpdatedTourType = await tourTypeServices.updateTourType(
      tourTypeId,
      payload,
      verifiedToken as JwtPayload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "tour type updated successfully",
      data: newUpdatedTourType,
    });
  }
);
// delete-tour
const deleteTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourTypeId = req.params.id;
    const verifiedToken = req.user;
    const result = await tourTypeServices.deleteTourType(
      tourTypeId,
      verifiedToken as JwtPayload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "tour type deleted successfully",
      data: result,
    });
  }
);
// get all tour
const getAllTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourTypeServices.getAllTourType();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "tour type Retrieved successfully",
      data: result,
    });
  }
);

export const tourTypeController = {
  createTourType,
  getAllTourType,
  updateTourType,
  deleteTourType,
};
