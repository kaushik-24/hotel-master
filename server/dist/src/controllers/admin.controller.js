"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../constant/enum");
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const admin_services_1 = __importDefault(require("../services/admin.services"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const pagination_1 = require("../utils/pagination");
class AdminController {
    async getAllUsers(req, res) {
        const { page, perpage, search } = req.query;
        const [validatedPage, validatedPerpage] = (0, pagination_1.validatePagination)(page, perpage);
        const { limit, offset } = (0, pagination_1.getPagination)(validatedPage - 1, validatedPerpage);
        const { data, total } = await admin_services_1.default.getAllUsers(limit, offset, search);
        const pagination = (0, pagination_1.getPagingData)(total, validatedPage, validatedPerpage);
        res.status(statusCode_1.StatusCodes.SUCCESS).json({
            success: true,
            data,
            pagination,
        });
    }
    async getOne(req, res) {
        const id = req.params.id;
        const data = await admin_services_1.default.getById(id);
        res.status(statusCode_1.StatusCodes.SUCCESS).json({
            status: true,
            data,
            message: messages_1.Message.fetched,
        });
    }
    async create(req, res) {
        try {
            const bodyRole = req.body?.role;
            if (bodyRole === enum_1.ROLE.ADMIN) {
                throw HttpException_utils_1.default.forbidden(messages_1.Message.unAuthorized);
            }
            await admin_services_1.default.create(req.body);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                status: true,
                message: messages_1.Message.created,
            });
        }
        catch (error) {
            res.status(error.status || statusCode_1.StatusCodes.BAD_REQUEST).json({
                status: false,
                message: error.message || 'Failed to create admin',
            });
        }
    }
    async update(req, res) {
        try {
            console.log('Update request received:', {
                params: req.params,
                body: req.body,
                user: req.user
            });
            const { id } = req.params;
            const data = req.body;
            await admin_services_1.default.update(id, data);
            res.status(200).json({
                success: true,
                message: 'Admin updated successfully'
            });
        }
        catch (error) {
            console.error('Update error:', error);
            res.status(error.status || 500).json({
                success: false,
                message: error.message || 'Update failed'
            });
        }
    }
    async delete(req, res) {
        const id = req.params.id;
        await admin_services_1.default.delete(id, req.user);
        res.status(statusCode_1.StatusCodes.SUCCESS).json({
            status: true,
            message: messages_1.Message.deleted,
        });
    }
}
exports.default = new AdminController();
