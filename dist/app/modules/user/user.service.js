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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const appError_1 = __importDefault(require("../../../erroralpers/appError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    //const isUserExist = await User.findOne({ email });
    // if (isUserExist) {
    //   throw new AppError(httpStatus.BAD_REQUEST, "user Already Exist");
    // }
    const hasPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const authProvider = {
        provider: "credentials",
        providerId: email,
    };
    const user = yield user_model_1.User.create(Object.assign({ email, password: hasPassword, auths: [authProvider] }, rest));
    return user;
});
const updateUser = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const ifUserExist = yield user_model_1.User.findById(userId);
    if (!ifUserExist) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "User Not Exist");
    }
    if (ifUserExist.isDeleted || ifUserExist.isActive === user_interface_1.IsActive.BLOCKED) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, "This USer Can not be updated");
    }
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.GUIDE) {
            throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, "you are Not Authorized");
        }
        if (payload.role === user_interface_1.Role.SUPER_ADMIN && decodedToken.role === user_interface_1.Role.ADMIN) {
            throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, "you are Not Authorized");
        }
        if (payload.isActive || payload.isDeleted || payload.isVerified) {
            if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.GUIDE) {
                throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, "you are Not Authorized");
            }
        }
    }
    if (payload.password) {
        payload.password = yield bcryptjs_1.default.hash(payload.password, env_1.envVars.BCRYPT_SALT_ROUND);
    }
    const newUpdateUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdateUser;
});
const getAllUSers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    const totalUSers = yield user_model_1.User.countDocuments();
    return {
        users,
        meta: {
            total: totalUSers,
        },
    };
});
exports.userServices = {
    createUser,
    getAllUSers,
    updateUser,
};
