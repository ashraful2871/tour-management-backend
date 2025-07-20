"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const division_route_1 = require("../modules/division/division.route");
const tourType_route_1 = require("../modules/tour-type/tourType.route");
const tour_route_1 = require("../modules/tour/tour.route");
const booking_route_1 = require("../modules/booking/booking.route");
const payment_route_1 = require("../modules/payment/payment.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/division",
        route: division_route_1.divisionRoutes,
    },
    {
        path: "/tour",
        route: tourType_route_1.tourType,
    },
    {
        path: "/tour",
        route: tour_route_1.TourRoutes,
    },
    {
        path: "/booking",
        route: booking_route_1.BookingRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
