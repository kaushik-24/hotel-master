"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const room_services_1 = __importDefault(require("../services/room.services"));
class RoomController {
    /**
     * Create a new room.
     * @param req Request object containing room data.
     * @param res Response object to send the result.
     */
    async getAllRooms(req, res) {
        try {
            const response = await room_services_1.default.getAllRooms();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.created, // Assuming you have a generic success message
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Rooms:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the rooms.",
                originalError: error.message || "An error occurred while fetching the rooms."
            });
        }
    }
    async getRoomById(req, res) {
        try {
            const response = await room_services_1.default.getRoomById(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched, // Assuming you have a generic "found" message
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Room by ID:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the room.",
                originalError: error.message || "An error occurred while fetching the room."
            });
        }
    }
    async createRoom(req, res) {
        try {
            const response = await room_services_1.default.createRoom(req.body);
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
    async editRoom(req, res) {
        try {
            const response = await room_services_1.default.editRoom(req.params.id, req.body);
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
    /**
     * Delete a room by its ID.
     * @param req Request object containing room ID.
     * @param res Response object to send the result.
     */
    async deleteRoom(req, res) {
        try {
            const response = await room_services_1.default.deleteRoom(req.params.id);
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
exports.default = new RoomController();
