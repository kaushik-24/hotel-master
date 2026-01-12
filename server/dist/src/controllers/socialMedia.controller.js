"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const socialMedia_services_1 = __importDefault(require("../services/socialMedia.services"));
class SocialMediaController {
    /**
     * Get all social media links
     * @param req Request
     * @param res Response
     */
    async getSocialMedia(req, res) {
        try {
            const socialMedia = await socialMedia_services_1.default.getSocialMedia();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: socialMedia
            });
        }
        catch (error) {
            console.error("Error Fetching Social Media:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
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
    async updateSocialMedia(req, res) {
        try {
            const updatedSocialMedia = await socialMedia_services_1.default.updateSocialMedia(req.body);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: updatedSocialMedia
            });
        }
        catch (error) {
            console.error("Error Updating Social Media:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating social media links.",
            });
        }
    }
}
exports.default = new SocialMediaController();
