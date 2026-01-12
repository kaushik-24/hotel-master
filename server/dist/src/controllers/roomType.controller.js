"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const roomType_services_1 = __importDefault(require("../services/roomType.services"));
class RoomTypeController {
    /**
     * Create a new room.
     * @param req Request object containing room data.
     * @param res Response object to send the result.
     */
    async getAllRoomsType(req, res) {
        try {
            const response = await roomType_services_1.default.getAllRoomsType();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.created, // Assuming you have a generic success message
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Rooms Type:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the rooms type.",
                originalError: error.message || "An error occurred while fetching the rooms type."
            });
        }
    }
    async getRoomTypeById(req, res) {
        try {
            const response = await roomType_services_1.default.getRoomTypeById(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched, // Assuming you have a generic "found" message
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Room type by ID:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the room type.",
                originalError: error.message || "An error occurred while fetching the room type."
            });
        }
    }
    async createRoomType(req, res) {
        try {
            const response = await roomType_services_1.default.createRoomType(req.body, req.file);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response
            });
        }
        catch (error) {
            console.error("Error Creating Room:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the room.",
                originalError: error.message || "An error occurred while creating the room."
            });
        }
    }
    /**
     * Edit a room by its ID.
     * @param req Request object containing room ID and update data.
     * @param res Response object to send the result.
     */
    async editRoomType(req, res) {
        try {
            const response = await roomType_services_1.default.editRoomType(req.params.id, req.body, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response
            });
        }
        catch (error) {
            console.error("Error Editing Room:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the room.",
                originalError: error.message || "An error occurred while editing the room."
            });
        }
    }
    async getRoomTypeBySlug(req, res) {
        try {
            const response = await roomType_services_1.default.getRoomTypeBySlug(req.params.slug);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Room by Slug:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the room.",
                originalError: error.message || "An error occurred while fetching the room."
            });
        }
    }
    /**
     * Delete a room by its ID.
     * @param req Request object containing room ID.
     * @param res Response object to send the result.
     */
    async deleteRoomType(req, res) {
        try {
            const response = await roomType_services_1.default.deleteRoomType(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.deleted,
                data: response
            });
        }
        catch (error) {
            console.error("Error Deleting Room:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the room.",
                originalError: error.message || "An error occurred while deleting the room."
            });
        }
    }
}
exports.default = new RoomTypeController();
