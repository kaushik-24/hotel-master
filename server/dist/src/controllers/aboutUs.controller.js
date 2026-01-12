"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const aboutUs_services_1 = __importDefault(require("../services/aboutUs.services"));
class AboutUsController {
    async getAboutUs(req, res) {
        try {
            const response = await aboutUs_services_1.default.getAboutUs();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response,
            });
        }
        catch (error) {
            console.error("Error fetching aboutUs section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the aboutUs section.",
                originalError: error.message || "An error occurred while fetching the aboutUs section.",
            });
        }
    }
    async createAboutUs(req, res) {
        try {
            const response = await aboutUs_services_1.default.createAboutUs(req.body, req.file);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response,
            });
        }
        catch (error) {
            console.error("Error creating aboutUs section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the aboutUs section.",
                originalError: error.message || "An error occurred while creating the aboutUs section.",
            });
        }
    }
    async updateAboutUs(req, res) {
        try {
            const response = await aboutUs_services_1.default.updateAboutUs(req.body, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response,
            });
        }
        catch (error) {
            console.error("Error updating aboutUs section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating the aboutUs section.",
                originalError: error.message || "An error occurred while updating the aboutUs section.",
            });
        }
    }
}
exports.default = new AboutUsController();
