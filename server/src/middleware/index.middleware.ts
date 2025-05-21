// src/middleware/index.middleware.ts

import cors from "cors";
import express, { NextFunction, Request, Response, type Application } from "express";
import morgan from "morgan";
import { DotenvConfig } from "../config/env.config";
import { StatusCodes } from "../constant/statusCode";
import router from "../routes/index.route";
import adminRouter from "../routes/admin.route";
import { errorHandler } from "./errorHandler.middleware";
import { isAuthenticated } from "./auth.middleware";
import { isAdmin } from "./role.middleware";

const middleware = (app: Application) => {
    // CORS configuration
    app.use(
        cors({
            origin: DotenvConfig.CORS_ORIGIN,
            methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }),
    );

    // User agent and API key check
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

    // Body parser
    app.use(
        express.json({
            limit: "10mb",
        }),
    );

    // Logging
    app.use(morgan("common"));

    // API routes
    app.use("/api", router);

    // Custom admin path (using environment variable)
    const ADMIN_PATH = DotenvConfig.ADMIN_PATH; 
    
    // Apply admin route with proper middleware
    app.use(`/api/${ADMIN_PATH}`, isAuthenticated, isAdmin, adminRouter);
    
    // Block the standard admin path with a 404 to hide its existence
    app.use('/admin', (req: Request, res: Response) => {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Resource not found' });
    });

    // Error handling middleware
    app.use(errorHandler);
    
    // Catch-all route for non-existent routes
    app.use('*', (req: Request, res: Response) => {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Resource not found' });
    });
};

export default middleware;
