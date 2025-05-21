// src/middleware/role.middleware.ts

import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException.utils";
import { StatusCodes } from "../constant/statusCode";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        // This middleware should run after isAuthenticated, so req.user should be populated
        if (!req.user) {
            throw HttpException.unauthorized("User is not authenticated");
        }
        
        // Check if the user role is admin
        if (req.user.role !== 'ADMIN') {
            // Return 404 instead of 403 to hide the existence of the admin path
            // This prevents unauthorized users from knowing the path exists
            return res.status(StatusCodes.NOT_FOUND).json({ 
                message: "Resource not found" 
            });
        }
        
        next();
    } catch (error) {
        // Also return 404 for any errors to maintain consistent response
        return res.status(StatusCodes.NOT_FOUND).json({ 
            message: "Resource not found" 
        });
    }
};
