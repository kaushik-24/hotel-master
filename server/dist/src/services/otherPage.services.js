"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const otherPage_model_1 = __importDefault(require("../models/otherPage.model")); // The Room model
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const fs_1 = __importDefault(require("fs"));
class PageService {
    /**
     * Create a new room.
     * @param data Room creation data (name, slug).
     * @returns Created room without sensitive data.
     */
    async getAllPages() {
        try {
            const pages = await otherPage_model_1.default.find(); // Fetch all rooms from the database
            return pages;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getPageById(id) {
        try {
            const page = await otherPage_model_1.default.findById(id); // Find room by ID in the database
            if (!page) {
                throw HttpException_utils_1.default.notFound("Page not found");
            }
            return page.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createPage(data, file) {
        try {
            const slug = data.name.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters                 
                .replace(/\s+/g, '-') // Replace spaces with hyphens                 
                .trim();
            const existingPage = await otherPage_model_1.default.findOne({ $or: [{ name: data.name }, { slug: slug }, { shortdesc: data.shortdesc }] });
            if (existingPage) {
                throw HttpException_utils_1.default.badRequest("Page name or slug already exists");
            }
            const newPage = await otherPage_model_1.default.create({ ...data, slug: slug, pageImage: file ? `/uploads/${file.filename}` : undefined, });
            return newPage.toObject();
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
    async editPage(id, data, file) {
        try {
            const existingPage = await otherPage_model_1.default.findById(id);
            if (!existingPage) {
                throw HttpException_utils_1.default.notFound("Page not found");
            }
            // Prepare update data
            const updateData = { ...data };
            // Handle image upload
            if (file) {
                // Delete the old image first
                if (existingPage.pageImage) {
                    const oldImagePath = path_1.default.join(__dirname, "../../", existingPage.pageImage);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                updateData.pageImage = `/uploads/${file.filename}`;
            }
            // Update slug if name is provided
            if (data.name) {
                updateData.slug = data.name
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .trim();
            }
            // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedPage = await otherPage_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedPage) {
                throw HttpException_utils_1.default.notFound("Page not found");
            }
            return updatedPage.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getPageBySlug(slug) {
        try {
            const page = await otherPage_model_1.default.findOne({ slug });
            if (!page) {
                throw HttpException_utils_1.default.notFound("Page not found");
            }
            return page.toObject();
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
    async deletePage(id) {
        try {
            const page = await otherPage_model_1.default.findById(id);
            if (!page) {
                throw HttpException_utils_1.default.notFound("Page not found");
            }
            // Remove the image if it exists
            if (page.pageImage) {
                const imagePath = path_1.default.join(__dirname, "../../", page.pageImage);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            await otherPage_model_1.default.findByIdAndDelete(id);
            return { message: "Page deleted successfully" };
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new PageService();
