"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTourZodSchema = exports.createTourZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTourZodSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    location: zod_1.default.string(),
    costFrom: zod_1.default.number(),
    startDate: zod_1.default.string().optional().optional(),
    endDate: zod_1.default.string().optional().optional(),
    included: zod_1.default.array(zod_1.default.string()).optional(),
    excluded: zod_1.default.array(zod_1.default.string()).optional(),
    amenities: zod_1.default.array(zod_1.default.string()).optional(),
    tourPlan: zod_1.default.array(zod_1.default.string()).optional(),
    maxGuest: zod_1.default.number().optional(),
    minAge: zod_1.default.number().optional(),
    division: zod_1.default.string(),
    tourType: zod_1.default.string(),
    departureLocation: zod_1.default.string().optional(),
    arrivalLocation: zod_1.default.string().optional(),
});
exports.updateTourZodSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    location: zod_1.default.string().optional(),
    costFrom: zod_1.default.number().optional(),
    startDate: zod_1.default.string().optional().optional(),
    endDate: zod_1.default.string().optional().optional(),
    tourType: zod_1.default.string().optional(),
    included: zod_1.default.array(zod_1.default.string()).optional(),
    excluded: zod_1.default.array(zod_1.default.string()).optional(),
    amenities: zod_1.default.array(zod_1.default.string()).optional(),
    tourPlan: zod_1.default.array(zod_1.default.string()).optional(),
    maxGuest: zod_1.default.number().optional(),
    minAge: zod_1.default.number().optional(),
    departureLocation: zod_1.default.string().optional(),
    arrivalLocation: zod_1.default.string().optional(),
});
