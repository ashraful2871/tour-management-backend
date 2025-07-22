"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourType = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewares/validateRequest");
const tourType_validation_1 = require("./tourType.validation");
const tourType_controller_1 = require("./tourType.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
//get all tour type
router.get("/tour-type", tourType_controller_1.tourTypeController.getAllTourType);
//create tour type
router.post("/create-tour-type", (0, validateRequest_1.validatedRequest)(tourType_validation_1.createTourTypeZodSchema), tourType_controller_1.tourTypeController.createTourType);
//update tour-type
router.patch("/tour-type/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tourType_controller_1.tourTypeController.updateTourType);
//update tour-type
router.delete("/tour-type/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tourType_controller_1.tourTypeController.deleteTourType);
exports.tourType = router;
