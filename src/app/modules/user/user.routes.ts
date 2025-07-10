import { Router } from "express";
import { userController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validatedRequest } from "../../middlewares/validateRequest";

const router = Router();
router.post(
  "/register",
  validatedRequest(createUserZodSchema),
  userController.createUser
);
router.get("/all-users", userController.getAllUSers);

export const userRoutes = router;
