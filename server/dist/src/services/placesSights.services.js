"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const placesSights_model_1 = __importDefault(require("../models/placesSights.model"));
class placesSightsService {
    async getPlacesSights() {
        try {
            const placesSights = await placesSights_model_1.default.findOne();
            if (!placesSights) {
                throw HttpException_utils_1.default.notFound("PlacesSights section not found");
            }
            return placesSights.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createPlacesSights(data, file) {
        try {
            // Check if hero section already exists
            const existingPlacesSights = await placesSights_model_1.default.findOne();
            if (existingPlacesSights) {
                throw HttpException_utils_1.default.badRequest("placesSights section already exists. Please use update instead.");
            }
            const placesSightsData = {
                ...data,
                placesSightsImage: `/uploads/${file.filename}`,
            };
            const newPlacesSights = await placesSights_model_1.default.create(placesSightsData);
            return newPlacesSights.toObject();
        }
        catch (error) {
            // Clean up uploaded file if creation fails
            if (file) {
                const filePath = path_1.default.join(__dirname, "../../uploads", file.filename);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
            }
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async updatePlacesSights(data, file) {
        try {
            const existingPlacesSights = await placesSights_model_1.default.findOne();
            if (!existingPlacesSights) {
                throw HttpException_utils_1.default.notFound("placesSights section not found");
            }
            const updateData = { ...data };
            if (file) {
                // Delete old image if it exists
                if (existingPlacesSights.placesSightsImage) {
                    const oldImagePath = path_1.default.join(__dirname, "../../", existingPlacesSights.placesSightsImage);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                updateData.placesSightsImage = `/uploads/${file.filename}`;
            }
            // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedPlacesSights = await placesSights_model_1.default.findOneAndUpdate({}, updateData, { new: true });
            return updatedPlacesSights?.toObject();
        }
        catch (error) {
            // Clean up uploaded file if update fails
            if (file) {
                const filePath = path_1.default.join(__dirname, "../../Uploads", file.filename);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
            }
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new placesSightsService();
