import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import socialMediaService from "../services/socialMedia.services";

class SocialMediaController {
    /**
     * Get all social media links
     * @param req Request
     * @param res Response
     */
    async getSocialMedia(req: Request, res: Response) {
        try {
            const socialMedia = await socialMediaService.getSocialMedia();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,
                data: socialMedia
            });
        } catch (error: any) {
            console.error("Error Fetching Social Media:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching social media links.",
            });
        }
    }

    /**
     * Update social media links
     * @param req Request
     * @param res Response
     */
    async updateSocialMedia(req: Request, res: Response) {
        try {
            const updatedSocialMedia = await socialMediaService.updateSocialMedia(req.body);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.updated,
                data: updatedSocialMedia
            });
        } catch (error: any) {
            console.error("Error Updating Social Media:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating social media links.",
            });
        }
    }
}

export default new SocialMediaController();
