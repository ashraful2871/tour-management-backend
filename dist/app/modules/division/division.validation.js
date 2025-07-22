"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedDivisionZodSchema = exports.createDivisionZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createDivisionZodSchema = zod_1.default.object({
    name: zod_1.default.string().min(2),
    thumbnail: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
});
exports.updatedDivisionZodSchema = zod_1.default.object({
    name: zod_1.default.string(),
    thumbnail: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
});
