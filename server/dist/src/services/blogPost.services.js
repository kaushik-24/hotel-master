"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const blogPost_model_1 = __importDefault(require("../models/blogPost.model")); // The Room model
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const fs_1 = __importDefault(require("fs"));
class blogPostService {
    /**
     * Create a new room.
     * @param data Room creation data (name, slug).
     * @returns Created room without sensitive data.
     */
    async getAllBlogPosts() {
        try {
            const blogPosts = await blogPost_model_1.default.find(); // Fetch all rooms from the database
            return blogPosts;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getBlogPostById(id) {
        try {
            const blogPost = await blogPost_model_1.default.findById(id); // Find room by ID in the database
            if (!blogPost) {
                throw HttpException_utils_1.default.notFound("Blog Posts not found");
            }
            return blogPost.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createBlogPost(data, file) {
        try {
            const slug = data.title.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters                 
                .replace(/\s+/g, '-') // Replace spaces with hyphens                 
                .trim();
            const existingBlogPost = await blogPost_model_1.default.findOne({ $or: [{ title: data.title }, { slug: slug }, { author: data.author }, { content: data.content }] });
            if (existingBlogPost) {
                throw HttpException_utils_1.default.badRequest("Room name or slug already exists");
            }
            const newBlogPost = await blogPost_model_1.default.create({ ...data, slug: slug,
                image: file ? `/uploads/${file.filename}` : undefined, });
            return newBlogPost.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    /**
     * Edit an existing room by ID.
     * @param id Room ID.
     * @param data Updated room data.
     * @returns Updated room data.
     */
    async editBlogPost(id, data, file) {
        try {
            const existingBlogPost = await blogPost_model_1.default.findById(id);
            if (!existingBlogPost) {
                throw HttpException_utils_1.default.notFound("Blog post not found");
            }
            // Prepare update data
            const updateData = { ...data };
            // Handle image upload
            if (file) {
                // Delete the old image first
                if (existingBlogPost.image) {
                    const oldImagePath = path_1.default.join(__dirname, "../../", existingBlogPost.image);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                updateData.image = `/uploads/${file.filename}`;
            }
            // Update slug if name is provided
            if (data.title) {
                updateData.slug = data.title
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .trim();
            }
            // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedBlogPost = await blogPost_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedBlogPost) {
                throw HttpException_utils_1.default.notFound("Blog post not found");
            }
            return updatedBlogPost.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getBlogPostBySlug(slug) {
        try {
            const blogPost = await blogPost_model_1.default.findOne({ slug });
            if (!blogPost) {
                throw HttpException_utils_1.default.notFound("Blog Post not found");
            }
            return blogPost.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    /**
     * Delete a room by its ID.
     * @param id Room ID.
     * @returns Success message.
     */
    async deleteBlogPost(id) {
        try {
            const blogPost = await blogPost_model_1.default.findById(id);
            if (!blogPost) {
                throw HttpException_utils_1.default.notFound("Blog post not found");
            }
            // Remove the image if it exists
            if (blogPost.image) {
                const imagePath = path_1.default.join(__dirname, "../../", blogPost.image);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            await blogPost_model_1.default.findByIdAndDelete(id);
            return { message: "Blog post deleted successfully" };
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new blogPostService();
