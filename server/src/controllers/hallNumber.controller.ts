import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import hallNumberService from "../services/hallNumber.services";

class HallNumberController {

    /**
     * Create a new hallNumber.
     * @param req Request object containing hallNumber data.
     * @param res Response object to send the result.
     */

    async getAllHallNumbers(req: Request, res: Response) {
        try {
            const response = await hallNumberService.getAllHallNumbers();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.created,  // Assuming you have a generic success message
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching HallNumbers:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the hallNumbers.",
                originalError: error.message || "An error occurred while fetching the hallNumbers."
            });
        }
    }

    async getHallNumberById(req: Request, res: Response) {
        try {
            const response = await hallNumberService.getHallNumberById(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,  // Assuming you have a generic "found" message
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching HallNumber by ID:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the hallNumber.",
                originalError: error.message || "An error occurred while fetching the hallNumber."
            });
        }
    }

    async createHallNumber(req: Request, res: Response) {
        try {
            const response = await hallNumberService.createHallNumber(req.body);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: Message.created,
                data: response
            });
        } catch (error: any) {
            console.error("Error Creating HallNumber:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
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
    async editHallNumber(req: Request, res: Response) {
        try {
            const response = await hallNumberService.editHallNumber(req.params.id, req.body);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.updated,
                data: response
            });
        } catch (error: any) {
            console.error("Error Editing HallNumber:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
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
    async deleteHallNumber(req: Request, res: Response) {
        try {
            const response = await hallNumberService.deleteHallNumber(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.deleted,
                data: response
            });
        } catch (error: any) {
            console.error("Error Deleting HallNumber:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the hallNumber.",
                originalError: error.message || "An error occurred while deleting the hallNumber."
            });
        }
    }
}

export default new HallNumberController();
