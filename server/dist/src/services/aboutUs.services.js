"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const aboutUs_model_1 = __importDefault(require("../models/aboutUs.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
class AboutUsService {
    async getAboutUs() {
        try {
            const aboutUs = await aboutUs_model_1.default.findOne();
            if (!aboutUs) {
                throw HttpException_utils_1.default.notFound("AboutUs section not found");
            }
            return aboutUs.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createAboutUs(data, file) {
        try {
            // Check if aboutUs section already exists
            const existingAboutUs = await aboutUs_model_1.default.findOne();
            if (existingAboutUs) {
                throw HttpException_utils_1.default.badRequest("AboutUs section already exists. Please use update instead.");
            }
            const aboutUsData = {
                ...data,
                aboutUsImage: `/uploads/${file.filename}`,
            };
            const newAboutUs = await aboutUs_model_1.default.create(aboutUsData);
            return newAboutUs.toObject();
        }
        catch (error) {
            // Clean up uploaded file if creation fails
            if (file) {
                const filePath = path_1.default.join(__dirname, "../../Uploads", file.filename);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
            }
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async updateAboutUs(data, file) {
        try {
            const existingAboutUs = await aboutUs_model_1.default.findOne();
            if (!existingAboutUs) {
                throw HttpException_utils_1.default.notFound("AboutUs section not found");
            }
            const updateData = { ...data };
            if (file) {
                // Delete old image if it exists
                if (existingAboutUs.aboutUsImage) {
                    const oldImagePath = path_1.default.join(__dirname, "../../", existingAboutUs.aboutUsImage);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                updateData.aboutUsImage = `/uploads/${file.filename}`;
            }
            // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedAboutUs = await aboutUs_model_1.default.findOneAndUpdate({}, updateData, { new: true });
            return updatedAboutUs?.toObject();
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
exports.default = new AboutUsService();
