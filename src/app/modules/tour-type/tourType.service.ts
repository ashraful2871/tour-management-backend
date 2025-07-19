import { JwtPayload } from "jsonwebtoken";
import { ITourType } from "../tour/tour.interface";
import { TourType } from "../tour/tour.model";
import AppError from "../../../erroralpers/appError";
import httpStatus from "http-status-codes";
import { Role } from "../user/user.interface";
import { QueryBuilder } from "../../utils/queryBuilder";
import { tourTypeSearchableFields } from "./tourType.constant";
// create tour type
const createTourType = async (payload: Partial<ITourType>) => {
  const tourType = await TourType.create(payload);
  return tourType;
};
// update tour type
const updateTourType = async (
  tourTypeId: string,
  payload: Partial<ITourType>,
  decodedToken: JwtPayload
) => {
  const isTourExist = await TourType.findById(tourTypeId);
  if (!isTourExist) {
    throw new AppError(httpStatus.NOT_FOUND, "tour type is not found");
  }
  if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }

  const newUpdatedTourType = await TourType.findByIdAndUpdate(
    tourTypeId,
    payload,
    { new: true, runValidators: true }
  );
  return newUpdatedTourType;
};
// update tour type
const deleteTourType = async (tourTypeId: string, decodedToken: JwtPayload) => {
  const isTourExist = await TourType.findById(tourTypeId);
  if (!isTourExist) {
    throw new AppError(httpStatus.NOT_FOUND, "tour type is not found");
  }
  if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }

  const result = await TourType.findByIdAndDelete(tourTypeId);
  return result;
};

// get tour type
const getAllTourType = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(TourType.find(), query);
  const tourTypeData = queryBuilder
    .search(tourTypeSearchableFields)
    .sort()
    .filter()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tourTypeData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    meta,
    data,
  };
};

export const tourTypeServices = {
  createTourType,
  getAllTourType,
  updateTourType,
  deleteTourType,
};
