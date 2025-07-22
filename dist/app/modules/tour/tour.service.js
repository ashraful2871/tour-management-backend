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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourServices = void 0;
const global_constant_1 = require("../../global.constant");
const tour_constant_1 = require("./tour.constant");
const tour_model_1 = require("./tour.model");
const queryBuilder_1 = require("../../utils/queryBuilder");
// crete tour
const createTour = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTour = yield tour_model_1.Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }
    //   const baseSlug = payload.title.toLowerCase().split(" ").join("-");
    //   let slug = `${baseSlug}`;
    //   let counter = 0;
    //   while (await Tour.exists({ slug })) {
    //     slug = `${slug}-${counter++}`;
    //   }
    //   payload.slug = slug;
    const tour = yield tour_model_1.Tour.create(payload);
    return tour;
});
// get all tour
const getAllTour = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(tour_model_1.Tour.find(), query);
    const tours = queryBuilder
        .search(tour_constant_1.searchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    // const meta = await queryBuilder.getMeta();
    const [data, meta] = yield Promise.all([
        tours.build(),
        queryBuilder.getMeta(),
    ]);
    return {
        meta,
        data,
    };
});
// // get all tour old
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllTourOld = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filter = query;
    const searchTram = query.searchTram || "";
    const sort = query.sort || "-createdAt";
    const fields = (_a = query.fields) === null || _a === void 0 ? void 0 : _a.split(",").join(" ");
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    // delete filter["searchTram"];
    // delete filter["sort"];
    for (const field of global_constant_1.excludeField) {
        // console.log(excludeField);
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete filter[field];
    }
    const searchQuery = {
        $or: tour_constant_1.searchableFields.map((field) => ({
            [field]: { $regex: searchTram, $options: "i" },
        })),
    };
    // const allTour = await Tour.find(searchQuery)
    //   .find(filter)
    //   .sort(sort)
    //   .select(fields)
    //   .skip(skip)
    //   .limit(limit);
    const filterQuery = tour_model_1.Tour.find(filter);
    const tours = filterQuery.find(searchQuery);
    const allTours = yield tours
        .sort(sort)
        .select(fields)
        .skip(skip)
        .limit(limit);
    const totalTour = yield tour_model_1.Tour.countDocuments();
    const totalPage = Math.ceil(totalTour / limit);
    const meta = {
        page: page,
        limit: limit,
        total: totalTour,
        totalPage: totalPage,
    };
    return {
        meta: meta,
        data: allTours,
    };
});
// update tour
const updateTour = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTour = yield tour_model_1.Tour.findById(id);
    if (!existingTour) {
        throw new Error("Tour not found.");
    }
    const updateTour = yield tour_model_1.Tour.findByIdAndUpdate(id, payload, { new: true });
    return updateTour;
});
//delete tour
const deleteTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_model_1.Tour.findByIdAndDelete(id);
});
exports.TourServices = {
    createTour,
    getAllTour,
    updateTour,
    deleteTour,
};
