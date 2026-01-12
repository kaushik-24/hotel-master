"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const hall_services_1 = __importDefault(require("../services/hall.services"));
class HallController {
    /**
     * Get all halls.
     * @param req Request object.
     * @param res Response object to send the result.
     */
    async getAllHalls(req, res) {
        try {
            const response = await hall_services_1.default.getAllHalls();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Halls:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the halls.",
                originalError: error.message || "An error occurred while fetching the halls."
            });
        }
    }
    async getHallById(req, res) {
        try {
            const response = await hall_services_1.default.getHallById(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Hall by ID:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the hall.",
                originalError: error.message || "An error occurred while fetching the hall."
            });
        }
    }
    async createHall(req, res) {
        try {
            const response = await hall_services_1.default.createHall(req.body, req.file);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response
            });
        }
        catch (error) {
            console.error("Error Creating Hall:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the hall.",
                originalError: error.message || "An error occurred while creating the hall."
            });
        }
    }
    /**
     * Edit a hall by its ID.
     * @param req Request object containing hall ID and update data.
     * @param res Response object to send the result.
     */
    async editHall(req, res) {
        try {
            const response = await hall_services_1.default.editHall(req.params.id, req.body, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response
            });
        }
        catch (error) {
            console.error("Error Editing Hall:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the hall.",
                originalError: error.message || "An error occurred while editing the hall."
            });
        }
    }
    async getHallBySlug(req, res) {
        try {
            const response = await hall_services_1.default.getHallBySlug(req.params.slug);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Hall by Slug:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the hall.",
                originalError: error.message || "An error occurred while fetching the hall."
            });
        }
    }
    /**
     * Delete a hall by its ID.
     * @param req Request object containing hall ID.
     * @param res Response object to send the result.
     */
    async deleteHall(req, res) {
        try {
            const response = await hall_services_1.default.deleteHall(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.deleted,
                data: response
            });
        }
        catch (error) {
            console.error("Error Deleting Hall:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the hall.",
                originalError: error.message || "An error occurred while deleting the hall."
            });
        }
    }
}
exports.default = new HallController();
