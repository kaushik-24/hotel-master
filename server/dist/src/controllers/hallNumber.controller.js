"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const hallNumber_services_1 = __importDefault(require("../services/hallNumber.services"));
class HallNumberController {
    /**
     * Create a new hallNumber.
     * @param req Request object containing hallNumber data.
     * @param res Response object to send the result.
     */
    async getAllHallNumbers(req, res) {
        try {
            const response = await hallNumber_services_1.default.getAllHallNumbers();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.created, // Assuming you have a generic success message
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching HallNumbers:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the hallNumbers.",
                originalError: error.message || "An error occurred while fetching the hallNumbers."
            });
        }
    }
    async getHallNumberById(req, res) {
        try {
            const response = await hallNumber_services_1.default.getHallNumberById(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched, // Assuming you have a generic "found" message
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching HallNumber by ID:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the hallNumber.",
                originalError: error.message || "An error occurred while fetching the hallNumber."
            });
        }
    }
    async createHallNumber(req, res) {
        try {
            const response = await hallNumber_services_1.default.createHallNumber(req.body);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response
            });
        }
        catch (error) {
            console.error("Error Creating HallNumber:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the hallNumber.",
                originalError: error.message || "An error occurred while creating the hallNumber."
            });
        }
    }
    /**
     * Edit a hallNumber by its ID.
     * @param req Request object containing hallNumber ID and update data.
     * @param res Response object to send the result.
     */
    async editHallNumber(req, res) {
        try {
            const response = await hallNumber_services_1.default.editHallNumber(req.params.id, req.body);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response
            });
        }
        catch (error) {
            console.error("Error Editing HallNumber:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the hallNumber.",
                originalError: error.message || "An error occurred while editing the hallNumber."
            });
        }
    }
    /**
     * Delete a hallNumber by its ID.
     * @param req Request object containing hallNumber ID.
     * @param res Response object to send the result.
     */
    async deleteHallNumber(req, res) {
        try {
            const response = await hallNumber_services_1.default.deleteHallNumber(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.deleted,
                data: response
            });
        }
        catch (error) {
            console.error("Error Deleting HallNumber:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the hallNumber.",
                originalError: error.message || "An error occurred while deleting the hallNumber."
            });
        }
    }
}
exports.default = new HallNumberController();
