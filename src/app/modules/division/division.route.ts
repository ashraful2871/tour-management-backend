import { Router } from "express";
import { validatedRequest } from "../../middlewares/validateRequest";
import {
  createDivisionZodSchema,
  updatedDivisionZodSchema,
} from "./division.validation";
import { divisionController } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validatedRequest(createDivisionZodSchema),
  divisionController.createDivision
);
router.get("/all-division", divisionController.getAllDivision);
router.get("/:slug", divisionController.getSingleDivision);
router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validatedRequest(updatedDivisionZodSchema),
  divisionController.updateDivision
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.deleteDivision
);

export const divisionRoutes = router;
