"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_route_1 = __importDefault(require("./admin.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const booking_route_1 = __importDefault(require("./booking.route"));
const otherPage_route_1 = __importDefault(require("./otherPage.route"));
const ping_route_1 = __importDefault(require("./ping.route"));
const roomType_route_1 = __importDefault(require("./roomType.route"));
const siteInfo_route_1 = __importDefault(require("./siteInfo.route"));
const socialMedia_route_1 = __importDefault(require("./socialMedia.route"));
const count_route_1 = __importDefault(require("./count.route"));
const facility_route_1 = __importDefault(require("./facility.route"));
const hero_route_1 = __importDefault(require("./hero.route"));
const homeAboutUs_route_1 = __importDefault(require("./homeAboutUs.route"));
const accommodation_route_1 = __importDefault(require("./accommodation.route"));
const placesSights_route_1 = __importDefault(require("./placesSights.route"));
const blogPost_route_1 = __importDefault(require("./blogPost.route"));
const hall_route_1 = __importDefault(require("./hall.route"));
const room_route_1 = __importDefault(require("./room.route"));
const hallNumber_route_1 = __importDefault(require("./hallNumber.route"));
const gallery_route_1 = __importDefault(require("./gallery.route"));
const policy_route_1 = __importDefault(require("./policy.route"));
const contact_route_1 = __importDefault(require("./contact.route"));
const location_route_1 = __importDefault(require("./location.route"));
const aboutUs_route_1 = __importDefault(require("./aboutUs.route"));
const history_route_1 = __importDefault(require("./history.route"));
const questValues_route_1 = __importDefault(require("./questValues.route"));
const review_route_1 = __importDefault(require("./review.route"));
const hotelLogo_route_1 = __importDefault(require("./hotelLogo.route"));
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/ping",
        route: ping_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    {
        path: '/booking',
        route: booking_route_1.default
    },
    {
        path: '/admins',
        route: admin_route_1.default
    },
    {
        path: '/hero',
        route: hero_route_1.default
    },
    {
        path: '/social',
        route: socialMedia_route_1.default
    },
    {
        path: '/siteInfo',
        route: siteInfo_route_1.default
    },
    {
        path: "/roomType",
        route: roomType_route_1.default
    },
    {
        path: "/facility",
        route: facility_route_1.default
    },
    {
        path: "/page",
        route: otherPage_route_1.default
    },
    {
        path: "/dashboardstats",
        route: count_route_1.default
    },
    {
        path: "/homeAboutUs",
        route: homeAboutUs_route_1.default
    },
    {
        path: "/accommodation",
        route: accommodation_route_1.default
    },
    {
        path: "/placesSights",
        route: placesSights_route_1.default
    },
    {
        path: "/blogPost",
        route: blogPost_route_1.default
    },
    {
        path: "/halls",
        route: hall_route_1.default
    },
    {
        path: "/room",
        route: room_route_1.default
    },
    {
        path: "/hallNumber",
        route: hallNumber_route_1.default
    },
    {
        path: "/gallery",
        route: gallery_route_1.default
    },
    {
        path: "/policy",
        route: policy_route_1.default
    },
    {
        path: "/contact",
        route: contact_route_1.default
    },
    {
        path: "/location",
        route: location_route_1.default
    },
    {
        path: "/aboutUs",
        route: aboutUs_route_1.default
    },
    {
        path: "/history",
        route: history_route_1.default
    },
    {
        path: "/questValues",
        route: questValues_route_1.default
    },
    {
        path: "/reviews",
        route: review_route_1.default
    },
    {
        path: "/hotelLogo",
        route: hotelLogo_route_1.default
    },
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
router.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Welcome to Hotel Venus API",
    });
});
exports.default = router;
