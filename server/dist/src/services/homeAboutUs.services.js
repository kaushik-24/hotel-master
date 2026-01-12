"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homeAboutUs_model_1 = __importDefault(require("../models/homeAboutUs.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
class HomeAboutUsService {
    async getAboutUs() {
        try {
            const aboutUs = await homeAboutUs_model_1.default.findOne();
            if (!aboutUs) {
                throw HttpException_utils_1.default.notFound("About Us section not found");
            }
            return aboutUs.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createAboutUs(data) {
        try {
            // Check if About Us section already exists
            const existingAboutUs = await homeAboutUs_model_1.default.findOne();
            if (existingAboutUs) {
                throw HttpException_utils_1.default.badRequest("About Us section already exists. Please use update instead.");
            }
            const newAboutUs = await homeAboutUs_model_1.default.create(data);
            return newAboutUs.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async updateAboutUs(data) {
        try {
            const existingAboutUs = await homeAboutUs_model_1.default.findOne();
            if (!existingAboutUs) {
                throw HttpException_utils_1.default.notFound("About Us section not found");
            }
            const updateData = { ...data };
            // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedAboutUs = await homeAboutUs_model_1.default.findOneAndUpdate({}, updateData, { new: true });
            return updatedAboutUs?.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new HomeAboutUsService();
