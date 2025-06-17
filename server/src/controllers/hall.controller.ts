import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import hallService from "../services/hall.services";

class HallController {

    /**
     * Get all halls.
     * @param req Request object.
     * @param res Response object to send the result.
     */
    async getAllHalls(req: Request, res: Response) {
        try {
            const response = await hallService.getAllHalls();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching Halls:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the halls.",
                originalError: error.message || "An error occurred while fetching the halls."
            });
        }
    }

    async getHallById(req: Request, res: Response) {
        try {
            const response = await hallService.getHallById(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching Hall by ID:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the hall.",
                originalError: error.message || "An error occurred while fetching the hall."
            });
        }
    }

    async createHall(req: Request, res: Response) {
        try {
            const response = await hallService.createHall(req.body, req.file);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: Message.created,
                data: response
            });
        } catch (error: any) {
            console.error("Error Creating Hall:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
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
    async editHall(req: Request, res: Response) {
        try {
            const response = await hallService.editHall(req.params.id, req.body, req.file);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.updated,
                data: response
            });
        } catch (error: any) {
            console.error("Error Editing Hall:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the hall.",
                originalError: error.message || "An error occurred while editing the hall."
            });
        }
    }

    async getHallBySlug(req: Request, res: Response) {
        try {
            const response = await hallService.getHallBySlug(req.params.slug);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching Hall by Slug:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
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
    async deleteHall(req: Request, res: Response) {
        try {
            const response = await hallService.deleteHall(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.deleted,
                data: response
            });
        } catch (error: any) {
            console.error("Error Deleting Hall:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the hall.",
                originalError: error.message || "An error occurred while deleting the hall."
            });
        }
    }
}

export default new HallController();
