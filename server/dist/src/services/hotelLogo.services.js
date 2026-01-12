"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const hotelLogo_model_1 = __importDefault(require("../models/hotelLogo.model"));
class hotelLogoService {
    async getHero() {
        try {
            const hero = await hotelLogo_model_1.default.findOne();
            if (!hero) {
                throw HttpException_utils_1.default.notFound("Hero section not found");
            }
            return hero.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createHero(file) {
        try {
            // Check if hero section already exists
            const existingHero = await hotelLogo_model_1.default.findOne();
            if (existingHero) {
                throw HttpException_utils_1.default.badRequest("Hero section already exists. Please use update instead.");
            }
            const heroData = {
                path: `/uploads/${file.filename}`,
            };
            const newHero = await hotelLogo_model_1.default.create(heroData);
            return newHero.toObject();
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
    async updateHero(data, file) {
        try {
            const existingHero = await hotelLogo_model_1.default.findOne();
            if (!existingHero) {
                throw HttpException_utils_1.default.notFound("Hero section not found");
            }
            const updateData = { ...data };
            if (file) {
                // Delete old image if it exists
                if (existingHero.path) {
                    const oldImagePath = path_1.default.join(__dirname, "../../", existingHero.path);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                updateData.path = `/uploads/${file.filename}`;
            }
            // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedHero = await hotelLogo_model_1.default.findOneAndUpdate({}, updateData, { new: true });
            return updatedHero?.toObject();
        }
        catch (error) {
            // Clean up uploaded file if update fails
            if (file) {
                const filePath = path_1.default.join(__dirname, "../../uploads", file.filename);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
            }
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new hotelLogoService();
