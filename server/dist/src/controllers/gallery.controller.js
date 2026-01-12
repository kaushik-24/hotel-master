"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const gallery_services_1 = __importDefault(require("../services/gallery.services"));
class GalleryController {
    async getAllGallerys(req, res) {
        try {
            const response = await gallery_services_1.default.getAllGallerys();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response,
            });
        }
        catch (error) {
            console.error('Error Fetching Gallery Images:', error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || 'An error occurred while fetching gallery images.',
                originalError: error.message || 'An error occurred while fetching gallery images.',
            });
        }
    }
    async createGallery(req, res) {
        try {
            const response = await gallery_services_1.default.createGallery(req.file);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response
            });
        }
        catch (error) {
            console.error("Error Creating Gallery:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the gallery image.",
                originalError: error.message || "An error occurred while creating the gallery image."
            });
        }
    }
    async editGallery(req, res) {
        try {
            const response = await gallery_services_1.default.editGallery(req.params.id, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response
            });
        }
        catch (error) {
            console.error("Error Editing Gallery:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the gallery image.",
                originalError: error.message || "An error occurred while editing the gallery image."
            });
        }
    }
    async deleteGallery(req, res) {
        try {
            const response = await gallery_services_1.default.deleteGallery(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.deleted,
                data: response
            });
        }
        catch (error) {
            console.error("Error Deleting Gallery:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the gallery image.",
                originalError: error.message || "An error occurred while deleting the gallery image."
            });
        }
    }
}
exports.default = new GalleryController();
