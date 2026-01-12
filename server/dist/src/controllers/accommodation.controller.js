"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const accommodation_model_1 = __importDefault(require("../models/accommodation.model"));
class AccommodationController {
    async getAccommodation(req, res) {
        try {
            const accommodation = await accommodation_model_1.default.findOne();
            if (!accommodation) {
                res.status(statusCode_1.StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "Accommodation section not found",
                });
                return;
            }
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: accommodation.toObject(),
            });
        }
        catch (error) {
            console.error("Error fetching Accommodation section:", error);
            res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "An error occurred while fetching the Accommodation section.",
                originalError: error.message,
            });
        }
    }
    async createAccommodation(req, res) {
        try {
            const { heading } = req.body;
            if (!heading) {
                res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Heading is required",
                });
                return;
            }
            const existingAccommodation = await accommodation_model_1.default.findOne();
            if (existingAccommodation) {
                res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Accommodation section already exists. Please use update instead.",
                });
                return;
            }
            const newAccommodation = await accommodation_model_1.default.create({ heading });
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: newAccommodation.toObject(),
            });
        }
        catch (error) {
            console.error("Error creating Accommodation section:", error);
            res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "An error occurred while creating the Accommodation section.",
                originalError: error.message,
            });
        }
    }
    async updateAccommodation(req, res) {
        try {
            const { heading } = req.body;
            if (!heading) {
                res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Heading is required",
                });
                return;
            }
            const existingAccommodation = await accommodation_model_1.default.findOne();
            if (!existingAccommodation) {
                res.status(statusCode_1.StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "Accommodation section not found",
                });
                return;
            }
            const updatedAccommodation = await accommodation_model_1.default.findOneAndUpdate({}, { heading }, { new: true });
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: updatedAccommodation?.toObject(),
            });
        }
        catch (error) {
            console.error("Error updating Accommodation section:", error);
            res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "An error occurred while updating the Accommodation section.",
                originalError: error.message,
            });
        }
    }
}
exports.default = new AccommodationController();
