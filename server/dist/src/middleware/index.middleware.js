"use strict";
// src/middleware/index.middleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const env_config_1 = require("../config/env.config");
const statusCode_1 = require("../constant/statusCode");
const index_route_1 = __importDefault(require("../routes/index.route"));
const errorHandler_middleware_1 = require("./errorHandler.middleware");
const path_1 = __importDefault(require("path"));
const middleware = (app) => {
    // CORS configuration
    app.use((0, cors_1.default)({
        origin: env_config_1.DotenvConfig.CORS_ORIGIN,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }));
    // User agent and API key check
    // Body parser
    app.use(express_1.default.json({
        limit: "10mb",
    }));
    // Serve static files from the uploads directory
    app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../../uploads"))); // Add this line
    // Logging
    app.use((0, morgan_1.default)("common"));
    // API routes
    app.use("/api", index_route_1.default);
    // Catch-all route for non-existent routes
    app.use('*', (req, res) => {
        res.status(statusCode_1.StatusCodes.NOT_FOUND).json({ message: 'Resource not found' });
    });
    // Error handling middleware
    app.use(errorHandler_middleware_1.errorHandler);
};
exports.default = middleware;
