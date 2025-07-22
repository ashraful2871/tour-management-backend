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
exports.tourTypeController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const tourType_service_1 = require("./tourType.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// crete-tour
const createTourType = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tourType = yield tourType_service_1.tourTypeServices.createTourType(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "tour type created successfully",
        data: tourType,
    });
}));
// update-tour
const updateTourType = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tourTypeId = req.params.id;
    const payload = req.body;
    const verifiedToken = req.user;
    const newUpdatedTourType = yield tourType_service_1.tourTypeServices.updateTourType(tourTypeId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "tour type updated successfully",
        data: newUpdatedTourType,
    });
}));
// delete-tour
const deleteTourType = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tourTypeId = req.params.id;
    const verifiedToken = req.user;
    const result = yield tourType_service_1.tourTypeServices.deleteTourType(tourTypeId, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "tour type deleted successfully",
        data: result,
    });
}));
// get all tour
const getAllTourType = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield tourType_service_1.tourTypeServices.getAllTourType(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "tour type Retrieved successfully",
        data: result,
    });
}));
exports.tourTypeController = {
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
};
