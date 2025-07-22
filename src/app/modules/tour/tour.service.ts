import { excludeField } from "../../global.constant";
import { searchableFields } from "./tour.constant";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";
import { QueryBuilder } from "../../utils/queryBuilder";

// crete tour
const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });
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

  const tour = await Tour.create(payload);
  return tour;
};

// get all tour
const getAllTour = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);
  const tours = queryBuilder
    .search(searchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  // const meta = await queryBuilder.getMeta();
  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);
  return {
    meta,
    data,
  };
};
// // get all tour old
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllTourOld = async (query: Record<string, string>) => {
  const filter = query;
  const searchTram = query.searchTram || "";
  const sort = query.sort || "-createdAt";
  const fields = query.fields?.split(",").join(" ");
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  // delete filter["searchTram"];
  // delete filter["sort"];

  for (const field of excludeField) {
    // console.log(excludeField);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete filter[field];
  }

  const searchQuery = {
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTram, $options: "i" },
    })),
  };

  // const allTour = await Tour.find(searchQuery)
  //   .find(filter)
  //   .sort(sort)
  //   .select(fields)
  //   .skip(skip)
  //   .limit(limit);

  const filterQuery = Tour.find(filter);
  const tours = filterQuery.find(searchQuery);
  const allTours = await tours
    .sort(sort)
    .select(fields)
    .skip(skip)
    .limit(limit);
  const totalTour = await Tour.countDocuments();
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
};

// update tour
const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await Tour.findById(id);

  if (!existingTour) {
    throw new Error("Tour not found.");
  }

  const updateTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return updateTour;
};

//delete tour
const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};
export const TourServices = {
  createTour,
  getAllTour,
  updateTour,
  deleteTour,
};
