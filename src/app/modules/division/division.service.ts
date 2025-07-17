import { JwtPayload } from "jsonwebtoken";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import AppError from "../../../erroralpers/appError";
import httpStatus from "http-status-codes";
import { Role } from "../user/user.interface";
//create division
const createDivision = async (payload: Partial<IDivision>) => {
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

  if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }

  const newUpdatedDivision = await Division.findByIdAndUpdate(
    divisionId,
    payload,
    { new: true, runValidators: true }
  );
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
const getAllDivision = async () => {
  const division = await Division.find({});
  const totalDivision = await Division.countDocuments();
  return {
    division,
    meta: {
      total: totalDivision,
    },
  };
};

export const divisionServices = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
};
