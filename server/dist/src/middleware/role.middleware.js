"use strict";
// src/middleware/role.middleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const statusCode_1 = require("../constant/statusCode");
const isAdmin = (req, res, next) => {
    try {
        // This middleware should run after isAuthenticated, so req.user should be populated
        if (!req.user) {
            throw HttpException_utils_1.default.unauthorized("User is not authenticated");
        }
        // Check if the user role is admin
        if (req.user.role !== 'ADMIN') {
            // Return 404 instead of 403 to hide the existence of the admin path
            // This prevents unauthorized users from knowing the path exists
            return res.status(statusCode_1.StatusCodes.NOT_FOUND).json({
                message: "Resource not found"
            });
        }
        next();
    }
    catch (error) {
        // Also return 404 for any errors to maintain consistent response
        return res.status(statusCode_1.StatusCodes.NOT_FOUND).json({
            message: "Resource not found"
        });
    }
};
exports.isAdmin = isAdmin;
