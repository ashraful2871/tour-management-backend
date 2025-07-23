import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TourServices } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";
import { ITour } from "./tour.interface";

const createTour = catchAsync(async (req: Request, res: Response) => {
  const payload: ITour = {
    ...req.body,
    images: (req.files as Express.Multer.File[]).map((file) => file.path),
  };

  const result = await TourServices.createTour(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour created successfully",
    data: result,
  });
});

const getAllTour = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await TourServices.getAllTour(query as Record<string, string>);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tours retrieved successfully",
    data: result,
  });
});
const updateTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload: ITour = {
    ...req.body,
    images: (req.files as Express.Multer.File[]).map((file) => file.path),
  };
  const result = await TourServices.updateTour(id, payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tours updated successfully",
    data: result,
  });
});
const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TourServices.deleteTour(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tours deleted successfully",
    data: result,
  });
});

export const TourController = {
  createTour,
  getAllTour,
  updateTour,
  deleteTour,
};
