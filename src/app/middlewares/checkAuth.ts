/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import AppError from "../../erroralpers/appError";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(403, "No token Received");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(405, "you are not permitted view this route");
      }

      req.user = verifiedToken;

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
