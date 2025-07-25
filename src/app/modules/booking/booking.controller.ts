import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const booking = await BookingService.createBooking(
    req.body,
    decodedToken.userID
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Booking created successfully",
    data: booking,
  });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingService.getUserBookings();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});
const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await BookingService.getBookingById();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking retrieved successfully",
    data: booking,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const bookings = await BookingService.getAllBookings();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrieved successfully",
    data: {},
    // meta: {},
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const updated = await BookingService.updateBookingStatus();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking Status Updated Successfully",
    data: updated,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getUserBookings,
  updateBookingStatus,
};
