"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const placesSights_services_1 = __importDefault(require("../services/placesSights.services"));
class PlacesSightsController {
    async getPlacesSights(req, res) {
        try {
            const response = await placesSights_services_1.default.getPlacesSights();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response,
            });
        }
        catch (error) {
            console.error("Error fetching placessights section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the placessights section.",
                originalError: error.message || "An error occurred while fetching the placessights section.",
            });
        }
    }
    async createPlacesSights(req, res) {
        try {
            const response = await placesSights_services_1.default.createPlacesSights(req.body, req.file);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response,
            });
        }
        catch (error) {
            console.error("Error creating placesSights section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the placesSights section.",
                originalError: error.message || "An error occurred while creating the placesSights section.",
            });
        }
    }
    async updatePlacesSights(req, res) {
        try {
            const response = await placesSights_services_1.default.updatePlacesSights(req.body, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response,
            });
        }
        catch (error) {
            console.error("Error updating placesSights section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating the placesSights section.",
                originalError: error.message || "An error occurred while updating the placesSights section.",
            });
        }
    }
}
exports.default = new PlacesSightsController();
