"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const hall_model_1 = __importDefault(require("../models/hall.model")); // The Hall model
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const fs_1 = __importDefault(require("fs"));
class HallService {
    /**
     * Get all halls.
     * @returns All halls.
     */
    async getAllHalls() {
        try {
            const halls = await hall_model_1.default.find(); // Fetch all halls from the database
            return halls;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getHallById(id) {
        try {
            const hall = await hall_model_1.default.findById(id); // Find hall by ID in the database
            if (!hall) {
                throw HttpException_utils_1.default.notFound("Hall not found");
            }
            return hall.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createHall(data, file) {
        try {
            const featuresArray = data.features.split(',')
                .map(feature => feature.trim())
                .filter(feature => feature !== '');
            const slug = data.name.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim();
            const existingHall = await hall_model_1.default.findOne({ $or: [{ name: data.name }, { slug: slug }, { price: data.price }, { shortdesc: data.shortdesc }] });
            if (existingHall) {
                throw HttpException_utils_1.default.badRequest("Hall name or slug already exists");
            }
            const newHall = await hall_model_1.default.create({
                ...data,
                slug: slug,
                features: featuresArray,
                hallImage: file ? `/uploads/${file.filename}` : undefined,
            });
            return newHall.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    /**
     * Edit an existing hall by ID.
     * @param id Hall ID.
     * @param data Updated hall data.
     * @returns Updated hall data.
     */
    async editHall(id, data, file) {
        try {
            const existingHall = await hall_model_1.default.findById(id);
            if (!existingHall) {
                throw HttpException_utils_1.default.notFound("Hall not found");
            }
            // Prepare update data
            const updateData = { ...data };
            // Handle features safely
            if (typeof data.features === "string") {
                updateData.features = data.features.trim() !== ""
                    ? data.features
                        .split(",")
                        .map((feature) => feature.trim())
                        .filter((feature) => feature !== "")
                    : [];
            }
            else {
                updateData.features = existingHall.features || [];
            }
            // Handle image upload
            if (file) {
                // Delete the old image first
                if (existingHall.hallImage) {
                    const oldImagePath = path_1.default.join(__dirname, "../../", existingHall.hallImage);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                updateData.hallImage = `/Uploads/${file.filename}`;
            }
            // Update slug if name is provided
            if (data.name) {
                updateData.slug = data.name
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .trim();
            }
            // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedHall = await hall_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedHall) {
                throw HttpException_utils_1.default.notFound("Hall not found");
            }
            return updatedHall.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getHallBySlug(slug) {
        try {
            const hall = await hall_model_1.default.findOne({ slug });
            if (!hall) {
                throw HttpException_utils_1.default.notFound("Hall not found");
            }
            return hall.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    /**
     * Delete a hall by its ID.
     * @param id Hall ID.
     * @returns Success message.
     */
    async deleteHall(id) {
        try {
            const hall = await hall_model_1.default.findById(id);
            if (!hall) {
                throw HttpException_utils_1.default.notFound("Hall not found");
            }
            // Remove the image if it exists
            if (hall.hallImage) {
                const imagePath = path_1.default.join(__dirname, "../../", hall.hallImage);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            await hall_model_1.default.findByIdAndDelete(id);
            return { message: "Hall deleted successfully" };
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new HallService();
