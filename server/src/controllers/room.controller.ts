import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import roomService from "../services/room.services";

class RoomController {

    /**
     * Create a new room.
     * @param req Request object containing room data.
     * @param res Response object to send the result.
     */

    async getAllRooms(req: Request, res: Response) {
        try {
            const response = await roomService.getAllRooms();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.created,  // Assuming you have a generic success message
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching Rooms:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the rooms.",
                originalError: error.message || "An error occurred while fetching the rooms."
            });
        }
    }

    async getRoomById(req: Request, res: Response) {
        try {
            const response = await roomService.getRoomById(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,  // Assuming you have a generic "found" message
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching Room by ID:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the room.",
                originalError: error.message || "An error occurred while fetching the room."
            });
        }
    }

    async createRoom(req: Request, res: Response) {
        try {
            const response = await roomService.createRoom(req.body);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: Message.created,
                data: response
            });
        } catch (error: any) {
            console.error("Error Creating Room:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
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
    async editRoom(req: Request, res: Response) {
        try {
            const response = await roomService.editRoom(req.params.id, req.body);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.updated,
                data: response
            });
        } catch (error: any) {
            console.error("Error Editing Room:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
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
    async deleteRoom(req: Request, res: Response) {
        try {
            const response = await roomService.deleteRoom(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.deleted,
                data: response
            });
        } catch (error: any) {
            console.error("Error Deleting Room:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the room.",
                originalError: error.message || "An error occurred while deleting the room."
            });
        }
    }
}

export default new RoomController();
