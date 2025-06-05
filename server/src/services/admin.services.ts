// src/services/admin.services.ts

import { CreateAdminDTO, UpdateAdminDTO } from '../dto/admin.dto';
import { ROLE } from '../constant/enum';
import { Message } from '../constant/messages';
import { IUser } from '../interface/user.interface';
import User from '../models/auth.model';
import HttpException from '../utils/HttpException.utils';
import BcryptService from './bcrypt.services';

interface IPaginatedResult {
    data: IUser[];
    total: number;
}

class AdminService {
    private readonly bcryptService = new BcryptService();

    /**
     * Retrieve all admins with pagination and optional search.
     * @param page Current page number.
     * @param perpage Number of items per page.
     * @param search Search query string.
     * @returns Paginated result containing admin data and total count.
     */
    async getAllUsers(limit: number, offset: number, search: string): Promise<IPaginatedResult> {
    try {
        const query: any = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        const data = await User.find(query).skip(offset).limit(limit).exec();
        const total = await User.countDocuments(query).exec();
        return {
            data: data.map(user => ({
                ...user.toJSON(),
                _id: user._id.toString(),
            })),
            total,
        };
    } catch (error: any) {
        throw HttpException.badRequest(error.message);
    }
}
    /**
     * Retrieve a single admin by ID.
     * @param id Admin's unique identifier.
     * @returns Admin user data.
     */
    async getById(id: string): Promise<IUser> {
    const admin = await User.findOne({ _id: id, role: ROLE.ADMIN }).select('-password').exec();
    if (!admin) throw HttpException.notFound(Message.notFound);
    return admin; // No need for manual toJSON() or _id conversion
}

    /**
     * Create a new admin.
     * @param data Admin creation data.
     * @returns Success message.
     */
    async create(data: CreateAdminDTO): Promise<string> {
    try {
        // Check for duplicate name, email, and phone number
        const alreadyExists = await Promise.any([
            User.findOne({ name: data.name.trim() }).exec().then(user => user && { field: 'name', value: data.name }),
            User.findOne({ email: data.email.trim() }).exec().then(user => user && { field: 'email', value: data.email }),
            User.findOne({ phoneNumber: data.phoneNumber.trim() }).exec().then(user => user && { field: 'phoneNumber', value: data.phoneNumber }),
        ]).catch(() => null);

        if (alreadyExists) {
            throw HttpException.badRequest(`${alreadyExists.field} '${alreadyExists.value}' already exists`);
        }

        // Hash the password
        const hashedPassword = await this.bcryptService.hash(data.password);

        // Create admin
        const adminData = {
            name: data.name.trim(),
            email: data.email.trim(),
            phoneNumber: data.phoneNumber.trim(),
            password: hashedPassword,
            role: ROLE.ADMIN,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await User.create(adminData);
        return Message.created;
    } catch (error: any) {
        if (error.code === 11000) { // MongoDB duplicate key error
            const field = Object.keys(error.keyValue)[0];
            throw HttpException.badRequest(`${field} '${error.keyValue[field]}' already exists`);
        }
        throw HttpException.badRequest(error.message || 'Failed to create admin');
    }
}

    /**
     * Update an existing admin's information.
     * @param data Admin update data.
     * @returns Success message.
     */
    async update(id: string, data: UpdateAdminDTO): Promise<string> {
    const admin = await User.findById(id).exec();
    if (!admin) throw HttpException.notFound(Message.notFound);
    
    if (data.name) admin.name = data.name;
    if (data.phoneNumber) admin.phoneNumber = data.phoneNumber;
    if (data.password) {
        admin.password = await this.bcryptService.hash(data.password);
    }
    
    try {
        await admin.save();
        return Message.updated;
    } catch (error: any) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            throw HttpException.badRequest(`${field} '${error.keyValue[field]}' already exists`);
        }
        throw HttpException.badRequest(error.message || 'Failed to update admin');
    }
}

    /**
     * Delete an admin by ID.
     * @param id Admin's unique identifier.
     * @param user Current authenticated user performing the deletion.
     * @returns Success message.
     */
    async delete(id: string, user: any): Promise<string> {
        const admin = await User.findOne({ _id: id, role: ROLE.ADMIN }).exec();

        if (!admin) throw HttpException.notFound(Message.notFound);

        // Prevent admin from deleting themselves
        if (user.id === id) {
            throw HttpException.badRequest('You cannot delete yourself');
        }

        await User.deleteOne({ _id: id });
        return Message.deleted;
    }
}

export default new AdminService();
