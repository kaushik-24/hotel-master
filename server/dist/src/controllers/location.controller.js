"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const location_services_1 = __importDefault(require("../services/location.services"));
class LocationController {
    async getLocation(req, res) {
        try {
            const response = await location_services_1.default.getLocation();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response,
            });
        }
        catch (error) {
            console.error("Error fetching Location section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the Location section.",
                originalError: error.message || "An error occurred while fetching the Location section.",
            });
        }
    }
    async createLocation(req, res) {
        try {
            const response = await location_services_1.default.createLocation(req.body);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response,
            });
        }
        catch (error) {
            console.error("Error creating Location section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the Location section.",
                originalError: error.message || "An error occurred while creating the Location section.",
            });
        }
    }
    async updateLocation(req, res) {
        try {
            const response = await location_services_1.default.updateLocation(req.body);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response,
            });
        }
        catch (error) {
            console.error("Error updating Location section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating the Location section.",
                originalError: error.message || "An error occurred while updating the Location section.",
            });
        }
    }
}
exports.default = new LocationController();
