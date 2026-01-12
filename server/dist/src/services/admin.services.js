"use strict";
// src/services/admin.services.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../constant/enum");
const messages_1 = require("../constant/messages");
const auth_model_1 = __importDefault(require("../models/auth.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const bcrypt_services_1 = __importDefault(require("./bcrypt.services"));
class AdminService {
    constructor() {
        this.bcryptService = new bcrypt_services_1.default();
    }
    /**
     * Retrieve all admins with pagination and optional search.
     * @param page Current page number.
     * @param perpage Number of items per page.
     * @param search Search query string.
     * @returns Paginated result containing admin data and total count.
     */
    async getAllUsers(limit, offset, search) {
        try {
            const query = {};
            if (search) {
                query.name = { $regex: search, $options: 'i' };
            }
            const data = await auth_model_1.default.find(query).skip(offset).limit(limit).exec();
            const total = await auth_model_1.default.countDocuments(query).exec();
            return {
                data: data.map(user => ({
                    ...user.toJSON(),
                    _id: user._id.toString(),
                })),
                total,
            };
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    /**
     * Retrieve a single admin by ID.
     * @param id Admin's unique identifier.
     * @returns Admin user data.
     */
    async getById(id) {
        const admin = await auth_model_1.default.findOne({ _id: id, role: enum_1.ROLE.ADMIN }).select('-password').exec();
        if (!admin)
            throw HttpException_utils_1.default.notFound(messages_1.Message.notFound);
        return admin; // No need for manual toJSON() or _id conversion
    }
    /**
     * Create a new admin.
     * @param data Admin creation data.
     * @returns Success message.
     */
    async create(data) {
        try {
            // Check for duplicate name, email, and phone number
            const alreadyExists = await Promise.any([
                auth_model_1.default.findOne({ name: data.name.trim() }).exec().then(user => user && { field: 'name', value: data.name }),
                auth_model_1.default.findOne({ email: data.email.trim() }).exec().then(user => user && { field: 'email', value: data.email }),
                auth_model_1.default.findOne({ phoneNumber: data.phoneNumber.trim() }).exec().then(user => user && { field: 'phoneNumber', value: data.phoneNumber }),
            ]).catch(() => null);
            if (alreadyExists) {
                throw HttpException_utils_1.default.badRequest(`${alreadyExists.field} '${alreadyExists.value}' already exists`);
            }
            // Hash the password
            const hashedPassword = await this.bcryptService.hash(data.password);
            // Create admin
            const adminData = {
                name: data.name.trim(),
                email: data.email.trim(),
                phoneNumber: data.phoneNumber.trim(),
                password: hashedPassword,
                role: enum_1.ROLE.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await auth_model_1.default.create(adminData);
            return messages_1.Message.created;
        }
        catch (error) {
            if (error.code === 11000) { // MongoDB duplicate key error
                const field = Object.keys(error.keyValue)[0];
                throw HttpException_utils_1.default.badRequest(`${field} '${error.keyValue[field]}' already exists`);
            }
            throw HttpException_utils_1.default.badRequest(error.message || 'Failed to create admin');
        }
    }
    /**
     * Update an existing admin's information.
     * @param data Admin update data.
     * @returns Success message.
     */
    async update(id, data) {
        const admin = await auth_model_1.default.findById(id).exec();
        if (!admin)
            throw HttpException_utils_1.default.notFound(messages_1.Message.notFound);
        if (data.name)
            admin.name = data.name;
        if (data.phoneNumber)
            admin.phoneNumber = data.phoneNumber;
        if (data.password) {
            admin.password = await this.bcryptService.hash(data.password);
        }
        try {
            await admin.save();
            return messages_1.Message.updated;
        }
        catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyValue)[0];
                throw HttpException_utils_1.default.badRequest(`${field} '${error.keyValue[field]}' already exists`);
            }
            throw HttpException_utils_1.default.badRequest(error.message || 'Failed to update admin');
        }
    }
    /**
     * Delete an admin by ID.
     * @param id Admin's unique identifier.
     * @param user Current authenticated user performing the deletion.
     * @returns Success message.
     */
    async delete(id, user) {
        const admin = await auth_model_1.default.findOne({ _id: id, role: enum_1.ROLE.ADMIN }).exec();
        if (!admin)
            throw HttpException_utils_1.default.notFound(messages_1.Message.notFound);
        // Prevent admin from deleting themselves
        if (user.id === id) {
            throw HttpException_utils_1.default.badRequest('You cannot delete yourself');
        }
        await auth_model_1.default.deleteOne({ _id: id });
        return messages_1.Message.deleted;
    }
}
exports.default = new AdminService();
