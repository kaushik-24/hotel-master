import { Request, Response, Router } from "express";
import admin from './admin.route';
import auth from './auth.route';
import booking from './booking.route';
import otherPage from './otherPage.route';
import ping from "./ping.route";
import room from './room.route';
import siteInfo from "./siteInfo.route";
import social from './socialMedia.route';
import count from './count.route';

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
        path: '/admin',
        route: admin // Add the admin route
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
        path: "/room",
        route: room
    },
    {
        path: "/page",
        route: otherPage
    },
    {
        path: "/dashboardstats",
        route: count
    }

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
