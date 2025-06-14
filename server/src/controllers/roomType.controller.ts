import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import roomTypeService from "../services/roomType.services";

class RoomTypeController {

    /**
     * Create a new room.
     * @param req Request object containing room data.
     * @param res Response object to send the result.
     */

    async getAllRoomsType(req: Request, res: Response) {
        try {
            const response = await roomTypeService.getAllRoomsType();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.created,  // Assuming you have a generic success message
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching Rooms Type:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the rooms type.",
                originalError: error.message || "An error occurred while fetching the rooms type."
            });
        }
    }

    async getRoomTypeById(req: Request, res: Response) {
        try {
            const response = await roomTypeService.getRoomTypeById(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,  // Assuming you have a generic "found" message
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching Room type by ID:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the room type.",
                originalError: error.message || "An error occurred while fetching the room type."
            });
        }
    }


    async createRoomType(req: Request, res: Response) {
        try {
            const response = await roomTypeService.createRoomType(req.body, req.file);
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
    async editRoomType(req: Request, res: Response) {
        try {
            const response = await roomTypeService.editRoomType(req.params.id, req.body, req.file);
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
    async getRoomTypeBySlug(req: Request, res: Response) {
    try {
        const response = await roomTypeService.getRoomTypeBySlug(req.params.slug);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: Message.fetched,
            data: response
        });
    } catch (error: any) {
        console.error("Error Fetching Room by Slug:", error);
        res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
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
    async deleteRoomType(req: Request, res: Response) {
        try {
            const response = await roomTypeService.deleteRoomType(req.params.id);
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

export default new RoomTypeController();
