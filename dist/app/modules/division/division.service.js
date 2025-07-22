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
exports.divisionServices = void 0;
const division_model_1 = require("./division.model");
const appError_1 = __importDefault(require("../../../erroralpers/appError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_interface_1 = require("../user/user.interface");
const queryBuilder_1 = require("../../utils/queryBuilder");
const division_constant_1 = require("./division.constant");
//create division
const createDivision = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isDivisionExist = yield division_model_1.Division.findOne({ name: payload.name });
    if (isDivisionExist) {
        throw new Error("A division  With this nme already exist");
    }
    // const baseSlug = payload.name?.toLowerCase().split(" ").join("-");
    // let slug = `${baseSlug}-division`;
    // // console.log(slug);
    // let counter = 0;
    // while (await Division.exists({ slug })) {
    //   slug = `${slug}-${counter++}`;
    // }
    // payload.slug = slug;
    const division = yield division_model_1.Division.create(payload);
    return division;
});
//update division
const updateDivision = (divisionId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isDivisionExist = yield division_model_1.Division.findById(divisionId);
    if (!isDivisionExist) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Division Not Found");
    }
    const duplicateDivision = yield division_model_1.Division.findOne({
        name: payload.name,
        _id: { $ne: divisionId },
    });
    if (duplicateDivision) {
        throw new Error("A division with this name already exists.");
    }
    // const baseSlug = payload.name?.toLowerCase().split(" ").join("-");
    // let slug = `${baseSlug}-division`;
    // // console.log(slug);
    // let counter = 0;
    // while (await Division.exists({ slug })) {
    //   slug = `${slug}-${counter++}`;
    // }
    // payload.slug = slug;
    if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.GUIDE) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
    }
    const newUpdatedDivision = yield division_model_1.Division.findByIdAndUpdate(divisionId, payload, { new: true, runValidators: true });
    return newUpdatedDivision;
});
//delete division
const deleteDivision = (divisionId, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isDivisionExist = yield division_model_1.Division.findById(divisionId);
    if (!isDivisionExist) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Division Not Found");
    }
    if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.GUIDE) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
    }
    const result = yield division_model_1.Division.findByIdAndDelete(divisionId);
    return result;
});
//get all division
const getAllDivision = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(division_model_1.Division.find(), query);
    const divisionData = queryBuilder
        .search(division_constant_1.divisionSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        divisionData.build(),
        queryBuilder.getMeta(),
    ]);
    return {
        data,
        meta,
    };
});
// get single division
const getSingleDivision = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const division = yield division_model_1.Division.findOne({ slug });
    return {
        data: division,
    };
});
exports.divisionServices = {
    createDivision,
    getAllDivision,
    updateDivision,
    deleteDivision,
    getSingleDivision,
};
