import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import otherPageService from "../services/otherPage.services";

class OtherPageController {

    async getAllPages(req: Request, res: Response) {
        try {
            const response = await otherPageService.getAllPages();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,
                data: response,
            });
        } catch (error: any) {
            console.error("Error Fetching Pages:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the pages.",
                originalError: error.message,
            });
        }
    }

    async getPageById(req: Request, res: Response) {
        try {
            const response = await otherPageService.getPageById(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,
                data: response,
            });
        } catch (error: any) {
            console.error("Error Fetching Page by ID:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the page.",
                originalError: error.message,
            });
        }
    }

    async createPage(req: Request, res: Response) {
        try {
            const response = await otherPageService.createPage(req.body);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: Message.created,
                data: response,
            });
        } catch (error: any) {
            console.error("Error Creating Page:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the page.",
                originalError: error.message,
            });
        }
    }

    async editPage(req: Request, res: Response) {
        try {
            const response = await otherPageService.editPage(req.params.id, req.body);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.updated,
                data: response,
            });
        } catch (error: any) {
            console.error("Error Editing Page:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the page.",
                originalError: error.message,
            });
        }
    }
    async getPageBySlug(req: Request, res: Response) {
    try {
        const response = await otherPageService.getPageBySlug(req.params.slug);

        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: Message.fetched,
            data: response,
        });
    } catch (error: any) {
        console.error("Error Fetching Page by Slug:", error);
        res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error.message || "An error occurred while fetching the page.",
            originalError: error.message,
        });
    }
}


    async deletePage(req: Request, res: Response) {
        try {
            const response = await otherPageService.deletePage(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.deleted,
                data: response,
            });
        } catch (error: any) {
            console.error("Error Deleting Page:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the page.",
                originalError: error.message,
            });
        }
    }
}

export default new OtherPageController();
