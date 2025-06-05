import { Request, Response } from 'express';
import { ROLE } from '../constant/enum';
import { Message } from '../constant/messages';
import { StatusCodes } from '../constant/statusCode';
import adminService from '../services/admin.services';
import HttpException from '../utils/HttpException.utils';
import { getPagination, getPagingData, validatePagination } from '../utils/pagination';
import { JwtPayload } from '../types/jwtPayload';
import { UpdateAdminDTO } from '../dto/admin.dto';

class AdminController {
    async getAllUsers(req: Request, res: Response) {
        const { page, perpage, search } = req.query;

        const [validatedPage, validatedPerpage] = validatePagination(page as string, perpage as string);
        const { limit, offset } = getPagination(validatedPage - 1, validatedPerpage);

        const { data, total } = await adminService.getAllUsers(limit, offset, search as string);
        const pagination = getPagingData(total, validatedPage, validatedPerpage);

        res.status(StatusCodes.SUCCESS).json({
            success: true,
            data,
            pagination,
        });
    }

    async getOne(req: Request, res: Response) {
        const id = req.params.id;
        const data = await adminService.getById(id);

        res.status(StatusCodes.SUCCESS).json({
            status: true,
            data,
            message: Message.fetched,
        });
    }

    async create(req: Request, res: Response) {
    try {
        const bodyRole = req.body?.role;
        if (bodyRole === ROLE.ADMIN) {
            throw HttpException.forbidden(Message.unAuthorized);
        }
        await adminService.create(req.body);
        res.status(StatusCodes.CREATED).json({
            status: true,
            message: Message.created,
        });
    } catch (error: any) {
        res.status(error.status || StatusCodes.BAD_REQUEST).json({
            status: false,
            message: error.message || 'Failed to create admin',
        });
    }
}
   async update(req: Request, res: Response) {
    try {
        console.log('Update request received:', {
            params: req.params,
            body: req.body,
            user: req.user
        });
        
        const { id } = req.params;
        const data: UpdateAdminDTO = req.body;
        
        await adminService.update(id, data);
        
        res.status(200).json({ 
            success: true, 
            message: 'Admin updated successfully' 
        });
    } catch (error: any) {
        console.error('Update error:', error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Update failed'
        });
    }
}
    async delete(req: Request, res: Response) {
        const id = req.params.id;
        await adminService.delete(id, req.user as JwtPayload);

        res.status(StatusCodes.SUCCESS).json({
            status: true,
            message: Message.deleted,
        });
    }
}

export default new AdminController();

