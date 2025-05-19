import cors from "cors";
import express, { NextFunction, Request, Response, type Application } from "express";
import morgan from "morgan";
import { DotenvConfig } from "../config/env.config";
import { StatusCodes } from "../constant/statusCode";
import router from "../routes/index.route";
import { errorHandler } from "./errorHandler.middleware";

const middleware = (app: Application) => {
    app.use(
        cors({
            origin: DotenvConfig.CORS_ORIGIN,
            methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }),
    );

    app.use((req: Request, res: Response, next: NextFunction) => {
        const userAgent = req.headers['user-agent'];
        const apiKey = req.headers['apikey'];
        if (userAgent && userAgent.includes('Mozilla')) {
            next();
        } else {
            if (apiKey === DotenvConfig.API_KEY) next();
            else res.status(StatusCodes.FORBIDDEN).send('Forbidden');
        }
    });

    app.use(
        express.json({
            limit: "10mb",
        }),
    );

    app.use(morgan("common"));
    app.use("/api", router);
    app.use(errorHandler);
};
export default middleware;
