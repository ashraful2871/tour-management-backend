import { Router } from "express";
import { userController } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validatedRequest } from "../../middlewares/validateRequest";
// import httpStatus from "http-status-codes";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
const router = Router();

router.post(
  "/register",
  validatedRequest(createUserZodSchema),
  userController.createUser
);
router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  userController.getAllUSers
);
router.patch(
  "/:id",
  validatedRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  userController.updateUser
);

export const userRoutes = router;
