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
exports.authService = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const appError_1 = __importDefault(require("../../../erroralpers/appError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("../user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userTokens_1 = require("../../utils/userTokens");
const env_1 = require("../../config/env");
// const credentialsLogin = async (payload: Partial<IUser>) => {
//   const { email, password } = payload;
//   const isUserExist = await User.findOne({ email });
//   if (!isUserExist) {
//     throw new AppError(httpStatus.BAD_REQUEST, "user Dose not Exist");
//   }
//   const isPasswordMatch = await bcryptjs.compare(
//     password as string,
//     isUserExist.password as string
//   );
//   if (!isPasswordMatch) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Incorrect  Password");
//   }
//   // const jwtPayload = {
//   //   userID: isUserExist._id,
//   //   email: isUserExist.email,
//   //   role: isUserExist.role,
//   // };
//   // const accessToken = generaToken(
//   //   jwtPayload,
//   //   envVars.JWT_ACCESS_SECRET,
//   //   envVars.JWT_ACCESS_EXPIRES
//   // );
//   // const refreshToken = generaToken(
//   //   jwtPayload,
//   //   envVars.JWT_ACCESS_SECRET,
//   //   envVars.JWT_ACCESS_EXPIRES
//   // );
//   const userTokens = createUserTokens(isUserExist);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { password: pass, ...rest } = isUserExist.toObject();
//   return {
//     accessToken: userTokens.accessToken,
//     refreshToken: userTokens.refreshToken,
//     user: rest,
//   };
// };
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccessToken = yield (0, userTokens_1.createNewAccessTokenWithNewToken)(refreshToken);
    // const userTokens = createUserTokens(isUserExist);
    return {
        accessToken: newAccessToken,
    };
});
const resetPassword = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedToken.userID);
    const isOldPAsswordMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isOldPAsswordMatch) {
        throw new appError_1.default(http_status_codes_1.default.UNAUTHORIZED, "old Password dose not match");
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    user.save();
    return true;
});
exports.authService = {
    // credentialsLogin,
    getNewAccessToken,
    resetPassword,
};
