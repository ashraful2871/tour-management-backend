/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { divisionServices } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

// create division
const createDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const division = await divisionServices.createDivision(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "division created successfully",
      data: division,
    });
  }
);
// update division
const updateDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const divisionId = req.params.id;
    const verifiedToken = req.user;
    const payload = req.body;
    const division = await divisionServices.updateDivision(
      divisionId,
      payload,
      verifiedToken as JwtPayload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "division updated successfully",
      data: division,
    });
  }
);
// delete division
const deleteDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const divisionId = req.params.id;
    const verifiedToken = req.user;
    const result = await divisionServices.deleteDivision(
      divisionId,
      verifiedToken as JwtPayload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "division deleted successfully",
      data: result,
    });
  }
);

// get all  division
const getAllDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await divisionServices.getAllDivision(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All division Retrieved Successfully",
      data: result,
    });
  }
);

const getSingleDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const result = await divisionServices.getSingleDivision(slug);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Divisions retrieved",
      data: result,
    });
  }
);

export const divisionController = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
  getSingleDivision,
};
