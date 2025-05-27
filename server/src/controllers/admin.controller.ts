import { Request, Response } from 'express';
import { ROLE } from '../constant/enum';
import { Message } from '../constant/messages';
import { StatusCodes } from '../constant/statusCode';
import { default as adminService } from '../services/admin.services';
import { JwtPayload } from '../types/jwtPayload';
import HttpException from '../utils/HttpException.utils';
import { getPagination, getPagingData, validatePagination } from '../utils/pagination';

export class AdminController {

    // Updated getAll method to handle Request and Response
    async getAllUsers(req: Request, res: Response) {
        try {
            const { page, perpage, search } = req.query;

            // Validate and parse pagination parameters
            const [validatedPage, validatedPerpage] = validatePagination(page as string, perpage as string);

            // Get pagination limit and offset
            const { limit, offset } = getPagination(validatedPage - 1, validatedPerpage);

            // Fetch users from the service with pagination
            const { data, total } = await adminService.getAllUsers(limit, offset, search as string);

            // Get pagination response
            const pagination = getPagingData(total, validatedPage, validatedPerpage);

            // Return users and pagination details
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                data,
                pagination,
            });
        } catch (error: any) {
            console.error('Error Fetching Users:', error);
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || 'An error occurred',
            });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = await adminService.getById(id);

            res.status(StatusCodes.SUCCESS).json({
                status: true,
                data,
                message: Message.fetched,
            });
        } catch (error: any) {
            console.error("Error Fetching Admin:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                status: false,
                message: error.message || "An error occurred while fetching the admin.",
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const bodyRole = req.body?.role;

            // Prevent setting role to ADMIN via request body
            if (bodyRole === ROLE.ADMIN) {
                throw HttpException.forbidden(Message.unAuthorized);
            }

            await adminService.create(req.body);

            res.status(StatusCodes.CREATED).json({
                status: true,
                message: Message.created,
            });
        } catch (error: any) {
            console.error("Error Creating Admin:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                status: false,
                message: error.message || "An error occurred while creating the admin.",
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            await adminService.delete(id, req.user as JwtPayload); // Ensure user is authenticated

            res.status(StatusCodes.SUCCESS).json({
                status: true,
                message: Message.deleted,
            });
        } catch (error: any) {
            console.error("Error Deleting Admin:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                status: false,
                message: error.message || "An error occurred while deleting the admin.",
            });
        }
    }
 
}

export default new AdminController();
