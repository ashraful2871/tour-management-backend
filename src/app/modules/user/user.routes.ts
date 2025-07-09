import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.post("/register", userController.createUser);
router.get("/all-users", userController.getAllUSers);

export const userRoutes = router;
