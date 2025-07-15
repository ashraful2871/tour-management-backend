/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";

export const handleCastError = (err: mongoose.Error.CastError) => {
  return {
    statusCode: 400,
    message: "invalid mongodb object id please provide a valid object id",
  };
};
