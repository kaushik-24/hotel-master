"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hallNumber_model_1 = __importDefault(require("../models/hallNumber.model")); // The HallNumber model
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
class HallNumberService {
    /**
     * Create a new hallNumber.
     * @param data HallNumber creation data (name, slug).
     * @returns Created hallNumber without sensitive data.
     */
    async getAllHallNumbers() {
        try {
            const hallNumbers = await hallNumber_model_1.default.find(); // Fetch all hallNumbers from the database
            return hallNumbers;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getHallNumberById(id) {
        try {
            const hallNumber = await hallNumber_model_1.default.findById(id); // Find hallNumber by ID in the database
            if (!hallNumber) {
                throw HttpException_utils_1.default.notFound("HallNumber not found");
            }
            return hallNumber.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createHallNumber(data) {
        try {
            const existingHallNumber = await hallNumber_model_1.default.findOne({ $or: [{ hallNumber: data.hallNumber },] });
            if (existingHallNumber) {
                throw HttpException_utils_1.default.badRequest("HallNumber name or slug already exists");
            }
            const newHallNumber = await hallNumber_model_1.default.create({
                ...data,
            });
            return newHallNumber.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    /**
     * Edit an existing hallNumber by ID.
     * @param id HallNumber ID.
     * @param data Updated hallNumber data.
     * @returns Updated hallNumber data.
     */
    async editHallNumber(id, data) {
        try {
            const existingHallNumber = await hallNumber_model_1.default.findById(id);
            if (!existingHallNumber) {
                throw HttpException_utils_1.default.notFound("HallNumber not found");
            }
            // Prepare update data
            const updateData = { ...data };
            // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedHallNumber = await hallNumber_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedHallNumber) {
                throw HttpException_utils_1.default.notFound("HallNumber not found");
            }
            return updatedHallNumber.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    /**
     * Delete a hallNumber by its ID.
     * @param id HallNumber ID.
     * @returns Success message.
     */
    async deleteHallNumber(id) {
        try {
            const hallNumber = await hallNumber_model_1.default.findById(id);
            if (!hallNumber) {
                throw HttpException_utils_1.default.notFound("HallNumber not found");
            }
            await hallNumber_model_1.default.findByIdAndDelete(id);
            return { message: "HallNumber deleted successfully" };
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new HallNumberService();
