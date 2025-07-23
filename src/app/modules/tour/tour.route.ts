import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validatedRequest } from "../../middlewares/validateRequest";
import { createTourZodSchema, updateTourZodSchema } from "./tour.validation";
import { TourController } from "./tour.controller";
import { multerUpload } from "../../config/multer.config";
const router = express.Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.array("files"),
  validatedRequest(createTourZodSchema),
  TourController.createTour
);
router.get("/", TourController.getAllTour);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.array("files"),
  validatedRequest(updateTourZodSchema),
  TourController.updateTour
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TourController.deleteTour
);
export const TourRoutes = router;
