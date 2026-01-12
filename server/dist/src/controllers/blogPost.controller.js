"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const blogPost_services_1 = __importDefault(require("../services/blogPost.services"));
class BlogPostController {
    /**
     * Create a new room.
     * @param req Request object containing room data.
     * @param res Response object to send the result.
     */
    async getAllBlogPosts(req, res) {
        try {
            const response = await blogPost_services_1.default.getAllBlogPosts();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.created, // Assuming you have a generic success message
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Blog Posts", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the blog posts.",
                originalError: error.message || "An error occurred while fetching the blog posts."
            });
        }
    }
    async getBlogPostById(req, res) {
        try {
            const response = await blogPost_services_1.default.getBlogPostById(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched, // Assuming you have a generic "found" message
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching blog post by ID:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the blog post.",
                originalError: error.message || "An error occurred while fetching the blog post."
            });
        }
    }
    async createBlogPost(req, res) {
        try {
            const response = await blogPost_services_1.default.createBlogPost(req.body, req.file);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response
            });
        }
        catch (error) {
            console.error("Error Creating Blog Post:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the blog.",
                originalError: error.message || "An error occurred while creating the blog."
            });
        }
    }
    /**
     * Edit a room by its ID.
     * @param req Request object containing room ID and update data.
     * @param res Response object to send the result.
     */
    async editBlogPost(req, res) {
        try {
            const response = await blogPost_services_1.default.editBlogPost(req.params.id, req.body, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response
            });
        }
        catch (error) {
            console.error("Error Editing Blog:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the Blog post.",
                originalError: error.message || "An error occurred while editing the Blog post."
            });
        }
    }
    async getBlogPostBySlug(req, res) {
        try {
            const response = await blogPost_services_1.default.getBlogPostBySlug(req.params.slug);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching blog by Slug:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the blog.",
                originalError: error.message || "An error occurred while fetching the blog."
            });
        }
    }
    /**
     * Delete a room by its ID.
     * @param req Request object containing room ID.
     * @param res Response object to send the result.
     */
    async deleteBlogPost(req, res) {
        try {
            const response = await blogPost_services_1.default.deleteBlogPost(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.deleted,
                data: response
            });
        }
        catch (error) {
            console.error("Error Deleting blog", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the blog post.",
                originalError: error.message || "An error occurred while deleting the blog post."
            });
        }
    }
}
exports.default = new BlogPostController();
