// src/middleware/role.middleware.ts

import { NextFunction, Request, Response } from "express";
import { ROLE } from "../constant/enum";
import HttpException from "../utils/HttpException.utils";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== ROLE.ADMIN) {
        throw HttpException.forbidden("You do not have permission to perform this action");
    }
    next();
};