import { Router } from "express";
import { validatedRequest } from "../../middlewares/validateRequest";
import { createTourTypeZodSchema } from "./tourType.validation";
import { tourTypeController } from "./tourType.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

//get all tour type
router.get("/tour-type", tourTypeController.getAllTourType);

//create tour type
router.post(
  "/create-tour-type",
  validatedRequest(createTourTypeZodSchema),
  tourTypeController.createTourType
);
//update tour-type
router.patch(
  "/tour-type/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourTypeController.updateTourType
);
//update tour-type
router.delete(
  "/tour-type/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourTypeController.deleteTourType
);
export const tourType = router;
