"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const hotelLogo_services_1 = __importDefault(require("../services/hotelLogo.services"));
class HotelLogoController {
    async getHero(req, res) {
        try {
            const response = await hotelLogo_services_1.default.getHero();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response,
            });
        }
        catch (error) {
            console.error("Error fetching hero section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the hero section.",
                originalError: error.message || "An error occurred while fetching the hero section.",
            });
        }
    }
    async createHero(req, res) {
        try {
            const response = await hotelLogo_services_1.default.createHero(req.file);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response,
            });
        }
        catch (error) {
            console.error("Error creating hero section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the hero section.",
                originalError: error.message || "An error occurred while creating the hero section.",
            });
        }
    }
    async updateHero(req, res) {
        try {
            const response = await hotelLogo_services_1.default.updateHero(req.body, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response,
            });
        }
        catch (error) {
            console.error("Error updating hero section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating the hero section.",
                originalError: error.message || "An error occurred while updating the hero section.",
            });
        }
    }
}
exports.default = new HotelLogoController();
