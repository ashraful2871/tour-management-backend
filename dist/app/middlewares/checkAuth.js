"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const appError_1 = __importDefault(require("../../erroralpers/appError"));
const jwt_1 = require("../utils/jwt");
const env_1 = require("../config/env");
const user_model_1 = require("../modules/user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_interface_1 = require("../modules/user/user.interface");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new appError_1.default(403, "No token Received");
        }
        const verifiedToken = (0, jwt_1.verifyToken)(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
        const isUserExist = yield user_model_1.User.findOne({ email: verifiedToken.email });
        if (!isUserExist) {
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "user Dose not Exist");
        }
        if (isUserExist.isActive === user_interface_1.IsActive.InActive) {
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `user is ${isUserExist.isActive}`);
        }
        if (isUserExist.isDeleted) {
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "user is deleted");
        }
        if (!authRoles.includes(verifiedToken.role)) {
            throw new appError_1.default(405, "you are not permitted view this route");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.checkAuth = checkAuth;
