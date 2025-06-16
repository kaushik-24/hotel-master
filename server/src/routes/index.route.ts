import { Request, Response, Router } from "express";
import admin from './admin.route';
import auth from './auth.route';
import booking from './booking.route';
import otherPage from './otherPage.route';
import ping from "./ping.route";
import roomType from './roomType.route';
import siteInfo from "./siteInfo.route";
import social from './socialMedia.route';
import count from './count.route';
import facility from './facility.route';
import hero from './hero.route';
import homeAboutUs from './homeAboutUs.route';
import accommodation from './accommodation.route';
import placesSights from './placesSights.route';
import blogPost from './blogPost.route';

interface Route {
    path: string;
    route: Router;
}

const router = Router();
const routes: Route[] = [
    {
        path: "/ping",
        route: ping,
    },
    {
        path: "/auth",
        route: auth,
    },
    {
        path: '/booking',
        route: booking
    },
    {
        path: '/admins',
        route: admin 
    },
    {
        path: '/hero',
        route: hero
    },
    {
        path: '/social',
        route: social
    },
    {
        path: '/siteInfo',
        route: siteInfo
    },
    {
        path: "/roomType",
        route: roomType
    },
    { 
        path: "/facility",
        route: facility
    },
    {
        path: "/page",
        route: otherPage
    },
    {
        path: "/dashboardstats",
        route: count
    },
    {
        path: "/homeAboutUs",
        route: homeAboutUs
    },
    {
        path: "/accommodation",
        route: accommodation
    },
    {
        path: "/placesSights",
        route: placesSights
    },
    {
        path: "/blogPost",
        route: blogPost
    },


];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

router.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "Welcome to Hotel Venus API",
    });
});

export default router;
