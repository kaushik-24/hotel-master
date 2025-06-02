// src/services/admin.services.ts

import { UpdateAdminDTO } from '../dto/admin.dto';
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
    async create(data: IUser): Promise<string> {
        try {
            // Check if email already exists
            const alreadyExist = await User.findOne({ email: data.email });
            if (alreadyExist) throw HttpException.badRequest(`${data.email} email already exists`);

            // Hash the password
            const hashedPassword = await this.bcryptService.hash(data.password);

            // Create admin data
            const adminData = {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: hashedPassword,
                role: ROLE.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await User.create(adminData);
            return Message.created;
        } catch (err: any) {
            throw HttpException.badRequest(err.message);
        }
    }

    /**
     * Update an existing admin's information.
     * @param data Admin update data.
     * @returns Success message.
     */
    async update(data: UpdateAdminDTO): Promise<string> {
    // Find the admin by ID and role
    const admin = await User.findOne({ _id: data.id, role: ROLE.ADMIN }).exec();

    if (!admin) throw HttpException.notFound(Message.notFound);

    // Update fields if provided
    if (data.name) admin.name = data.name;
    if (data.phoneNumber) admin.phoneNumber = data.phoneNumber;
    if (data.password) {
    admin.password = await this.bcryptService.hash(data.password);
    }
    // Optionally handle role changes if necessary

    await admin.save();
    return Message.updated;
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
