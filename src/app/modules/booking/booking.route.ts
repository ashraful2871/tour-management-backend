import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { BookingController } from "./booking.controller";
import { validatedRequest } from "../../middlewares/validateRequest";
import { createBookingZodSchema } from "./booking.validation";

const router = express.Router();

// api/v1/booking
router.post(
  "/",
  checkAuth(...Object.values(Role)),
  validatedRequest(createBookingZodSchema),
  BookingController.createBooking
);

// api/v1/booking
router.get("/", checkAuth(Role.ADMIN, Role.SUPER_ADMIN));

// api/v1/booking/my-bookings
router.get("/my-bookings", checkAuth(...Object.values(Role)));

// api/v1/booking/bookingId
router.get("/:bookingId", checkAuth(...Object.values(Role)));

// api/v1/booking/bookingId/status
router.patch("/:bookingId/status", checkAuth(...Object.values(Role)));

export const BookingRoutes = router;
