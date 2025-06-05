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
import path from "path";

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
  
    // Body parser
    app.use(
        express.json({
            limit: "10mb",
        }),
    );
// Serve static files from the uploads directory
  app.use("/uploads", express.static(path.join(__dirname, "../../uploads"))); // Add this line

    // Logging
    app.use(morgan("common"));

    // API routes
    app.use("/api", router);

          
    // Catch-all route for non-existent routes
    app.use('*', (req: Request, res: Response) => {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Resource not found' });
    });
     
    // Error handling middleware
    app.use(errorHandler);
};

export default middleware;
