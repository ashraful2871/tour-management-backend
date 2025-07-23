import { JwtPayload } from "jsonwebtoken";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import AppError from "../../../erroralpers/appError";
import httpStatus from "http-status-codes";
import { Role } from "../user/user.interface";
import { QueryBuilder } from "../../utils/queryBuilder";
import { divisionSearchableFields } from "./division.constant";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";
//create division
const createDivision = async (payload: Partial<IDivision>) => {
  const isDivisionExist = await Division.findOne({ name: payload.name });
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
  const division = await Division.create(payload);
  return division;
};

//update division
const updateDivision = async (
  divisionId: string,
  payload: Partial<IDivision>,
  decodedToken: JwtPayload
) => {
  const isDivisionExist = await Division.findById(divisionId);
  if (!isDivisionExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Division Not Found");
  }

  const duplicateDivision = await Division.findOne({
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

  if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }

  const newUpdatedDivision = await Division.findByIdAndUpdate(
    divisionId,
    payload,
    { new: true, runValidators: true }
  );

  if (payload.thumbnail && isDivisionExist.thumbnail) {
    await deleteImageFromCloudinary(isDivisionExist.thumbnail);
  }
  return newUpdatedDivision;
};

//delete division
const deleteDivision = async (divisionId: string, decodedToken: JwtPayload) => {
  const isDivisionExist = await Division.findById(divisionId);
  if (!isDivisionExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Division Not Found");
  }

  if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }

  const result = await Division.findByIdAndDelete(divisionId);

  return result;
};

//get all division
const getAllDivision = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Division.find(), query);

  const divisionData = queryBuilder
    .search(divisionSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();
  const [data, meta] = await Promise.all([
    divisionData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

// get single division
const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });
  return {
    data: division,
  };
};

export const divisionServices = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
  getSingleDivision,
};
