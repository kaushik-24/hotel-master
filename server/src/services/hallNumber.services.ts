import HallNumber from "../models/hallNumber.model"; // The HallNumber model
import HttpException from "../utils/HttpException.utils";
import mongoose from "mongoose";

class HallNumberService {

    /**
     * Create a new hallNumber.
     * @param data HallNumber creation data (name, slug).
     * @returns Created hallNumber without sensitive data.
     */
    async getAllHallNumbers() {
        try {
            const hallNumbers = await HallNumber.find();  // Fetch all hallNumbers from the database
            return hallNumbers;
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getHallNumberById(id: string) {
        try {
            const hallNumber = await HallNumber.findById(id);  // Find hallNumber by ID in the database
            if (!hallNumber) {
                throw HttpException.notFound("HallNumber not found");
            }
            return hallNumber.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async createHallNumber(data: { hallNumber: string, roomType: mongoose.Schema.Types.ObjectId, floor: string }, ) {
        try {
            const existingHallNumber = await HallNumber.findOne({ $or: [{ hallNumber: data.hallNumber},] });
            if (existingHallNumber) {
                throw HttpException.badRequest("HallNumber name or slug already exists");
            }
            const newHallNumber = await HallNumber.create({
                ...data,
            });
            return newHallNumber.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
    /**
     * Edit an existing hallNumber by ID.
     * @param id HallNumber ID.
     * @param data Updated hallNumber data.
     * @returns Updated hallNumber data.
     */
    async editHallNumber(id: string, data: { hallNumber?: string, }, ) {
        try {
            const existingHallNumber = await HallNumber.findById(id);
            if (!existingHallNumber) {
                throw HttpException.notFound("HallNumber not found");
            }
            // Prepare update data
            const updateData: any = { ...data };
            
                       // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

            const updatedHallNumber = await HallNumber.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedHallNumber) {
                throw HttpException.notFound("HallNumber not found");
            }

            return updatedHallNumber.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    /**
     * Delete a hallNumber by its ID.
     * @param id HallNumber ID.
     * @returns Success message.
     */
    async deleteHallNumber(id: string) {
        try {
            const hallNumber = await HallNumber.findById(id);
            if (!hallNumber) {
                throw HttpException.notFound("HallNumber not found");
            }

            await HallNumber.findByIdAndDelete(id);
            return { message: "HallNumber deleted successfully" };
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
}

export default new HallNumberService();
