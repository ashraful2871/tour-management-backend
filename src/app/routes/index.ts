import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.route";
import { divisionRoutes } from "../modules/division/division.route";
import { tourType } from "../modules/tour-type/tourType.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/division",
    route: divisionRoutes,
  },
  {
    path: "/tour",
    route: tourType,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
