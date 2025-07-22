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
exports.tourTypeServices = void 0;
const tour_model_1 = require("../tour/tour.model");
const appError_1 = __importDefault(require("../../../erroralpers/appError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_interface_1 = require("../user/user.interface");
const queryBuilder_1 = require("../../utils/queryBuilder");
const tourType_constant_1 = require("./tourType.constant");
// create tour type
const createTourType = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tourType = yield tour_model_1.TourType.create(payload);
    return tourType;
});
// update tour type
const updateTourType = (tourTypeId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isTourExist = yield tour_model_1.TourType.findById(tourTypeId);
    if (!isTourExist) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "tour type is not found");
    }
    if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.GUIDE) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
    }
    const newUpdatedTourType = yield tour_model_1.TourType.findByIdAndUpdate(tourTypeId, payload, { new: true, runValidators: true });
    return newUpdatedTourType;
});
// update tour type
const deleteTourType = (tourTypeId, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isTourExist = yield tour_model_1.TourType.findById(tourTypeId);
    if (!isTourExist) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "tour type is not found");
    }
    if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.GUIDE) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
    }
    const result = yield tour_model_1.TourType.findByIdAndDelete(tourTypeId);
    return result;
});
// get tour type
const getAllTourType = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(tour_model_1.TourType.find(), query);
    const tourTypeData = queryBuilder
        .search(tourType_constant_1.tourTypeSearchableFields)
        .sort()
        .filter()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        tourTypeData.build(),
        queryBuilder.getMeta(),
    ]);
    return {
        meta,
        data,
    };
});
exports.tourTypeServices = {
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
};
