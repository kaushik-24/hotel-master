// src/controllers/infoSection.controller.ts
import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import { infoSectionService } from "../services/infoSection.service";

class InfoSectionController {
    /**
     * Get all info section details
     * @param req Request
     * @param res Response
     */
    async getInfoSection(req: Request, res: Response) {
        try {
            const infoSection = await infoSectionService.getInfoSection();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,
                data: infoSection
            });
        } catch (error: any) {
            console.error("Error Fetching Info Section:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching info section.",
            });
        }
    }

    /**
     * Update info section details
     * @param req Request
     * @param res Response
     */
    async updateInfoSection(req: Request, res: Response) {
        try {
            const updatedInfoSection = await infoSectionService.updateInfoSection(req.body);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.updated,
                data: updatedInfoSection
            });
        } catch (error: any) {
            console.error("Error Updating Info Section:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating info section.",
            });
        }
    }
}

export default new InfoSectionController();
