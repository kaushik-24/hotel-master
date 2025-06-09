import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import pageService from "../services/otherPage.services";

class PageController {

    /**
     * Create a new r
     * @param req Request object containing room data.
     * @param res Response object to send the result.
     */

    async getAllPages(req: Request, res: Response) {
        try {
            const response = await pageService.getAllPages();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.created,  // Assuming you have a generic success message
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching Rooms:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the pages.",
                originalError: error.message || "An error occurred while fetching the pages."
            });
        }
    }

    async getPageById(req: Request, res: Response) {
        try {
            const response = await pageService.getPageById(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,  // Assuming you have a generic "found" message
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching page by ID:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the page.",
                originalError: error.message || "An error occurred while fetching the page."
            });
        }
    }


    async createPage(req: Request, res: Response) {
        console.log("Request body:", req.body, "Request file:", req.file);
        try {
            const response = await pageService.createPage(req.body, req.file);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: Message.created,
                data: response
            });
        } catch (error: any) {
            console.error("Error Creating page:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the page.",
                originalError: error.message || "An error occurred while creating the page."
            });
        }
    }

    /**
     * Edit a room by its ID.
     * @param req Request object containing room ID and update data.
     * @param res Response object to send the result.
     */
    async editPage(req: Request, res: Response) {
        try {
            const response = await pageService.editPage(req.params.id, req.body, req.file);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.updated,
                data: response
            });
        } catch (error: any) {
            console.error("Error Editing page:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the page.",
                originalError: error.message || "An error occurred while editing the page."
            });
        }
    }
    async getPageBySlug(req: Request, res: Response) {
    try {
        const response = await pageService.getPageBySlug(req.params.slug);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: Message.fetched,
            data: response
        });
    } catch (error: any) {
        console.error("Error Fetching page by Slug:", error);
        res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error.message || "An error occurred while fetching the page.",
            originalError: error.message || "An error occurred while fetching the page."
        });
    }
}


    /**
     * Delete a room by its ID.
     * @param req Request object containing room ID.
     * @param res Response object to send the result.
     */
    async deletePage(req: Request, res: Response) {
        try {
            const response = await pageService.deletePage(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.deleted,
                data: response
            });
        } catch (error: any) {
            console.error("Error Deleting Page:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the page.",
                originalError: error.message || "An error occurred while deleting the page."
            });
        }
    }
}

export default new PageController();

