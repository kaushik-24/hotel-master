import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import blogPostService from "../services/blogPost.services";

class BlogPostController {

    /**
     * Create a new room.
     * @param req Request object containing room data.
     * @param res Response object to send the result.
     */

    async getAllBlogPosts(req: Request, res: Response) {
        try {
            const response = await blogPostService.getAllBlogPosts();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.created,  // Assuming you have a generic success message
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching Blog Posts", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the blog posts.",
                originalError: error.message || "An error occurred while fetching the blog posts."
            });
        }
    }

    async getBlogPostById(req: Request, res: Response) {
        try {
            const response = await blogPostService.getBlogPostById(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.fetched,  // Assuming you have a generic "found" message
                data: response
            });
        } catch (error: any) {
            console.error("Error Fetching blog post by ID:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the blog post.",
                originalError: error.message || "An error occurred while fetching the blog post."
            });
        }
    }


    async createBlogPost(req: Request, res: Response) {
        try {
            const response = await blogPostService.createBlogPost(req.body, req.file);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: Message.created,
                data: response
            });
        } catch (error: any) {
            console.error("Error Creating Blog Post:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
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
    async editBlogPost(req: Request, res: Response) {
        try {
            const response = await blogPostService.editBlogPost(req.params.id, req.body, req.file);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.updated,
                data: response
            });
        } catch (error: any) {
            console.error("Error Editing Blog:", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the Blog post.",
                originalError: error.message || "An error occurred while editing the Blog post."
            });
        }
    }
    async getBlogPostBySlug(req: Request, res: Response) {
    try {
        const response = await blogPostService.getBlogPostBySlug(req.params.slug);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: Message.fetched,
            data: response
        });
    } catch (error: any) {
        console.error("Error Fetching blog by Slug:", error);
        res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
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
    async deleteBlogPost(req: Request, res: Response) {
        try {
            const response = await blogPostService.deleteBlogPost(req.params.id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.deleted,
                data: response
            });
        } catch (error: any) {
            console.error("Error Deleting blog", error);
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the blog post.",
                originalError: error.message || "An error occurred while deleting the blog post."
            });
        }
    }
}

export default new BlogPostController();

