"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const otherPage_services_1 = __importDefault(require("../services/otherPage.services"));
class PageController {
    /**
     * Create a new r
     * @param req Request object containing room data.
     * @param res Response object to send the result.
     */
    async getAllPages(req, res) {
        try {
            const response = await otherPage_services_1.default.getAllPages();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.created, // Assuming you have a generic success message
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Rooms:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the pages.",
                originalError: error.message || "An error occurred while fetching the pages."
            });
        }
    }
    async getPageById(req, res) {
        try {
            const response = await otherPage_services_1.default.getPageById(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched, // Assuming you have a generic "found" message
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching page by ID:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the page.",
                originalError: error.message || "An error occurred while fetching the page."
            });
        }
    }
    async createPage(req, res) {
        console.log("Request body:", req.body, "Request file:", req.file);
        try {
            const response = await otherPage_services_1.default.createPage(req.body, req.file);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response
            });
        }
        catch (error) {
            console.error("Error Creating page:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
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
    async editPage(req, res) {
        try {
            const response = await otherPage_services_1.default.editPage(req.params.id, req.body, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response
            });
        }
        catch (error) {
            console.error("Error Editing page:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the page.",
                originalError: error.message || "An error occurred while editing the page."
            });
        }
    }
    async getPageBySlug(req, res) {
        try {
            const response = await otherPage_services_1.default.getPageBySlug(req.params.slug);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching page by Slug:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
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
    async deletePage(req, res) {
        try {
            const response = await otherPage_services_1.default.deletePage(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.deleted,
                data: response
            });
        }
        catch (error) {
            console.error("Error Deleting Page:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the page.",
                originalError: error.message || "An error occurred while deleting the page."
            });
        }
    }
}
exports.default = new PageController();
