"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const gallery_model_1 = __importDefault(require("../models/gallery.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const fs_1 = __importDefault(require("fs"));
class GalleryService {
    async getAllGallerys() {
        try {
            const gallerys = await gallery_model_1.default.find(); // Fetch all gallery images
            return gallerys;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createGallery(file) {
        try {
            if (!file) {
                throw HttpException_utils_1.default.badRequest("No image file provided");
            }
            const newGallery = await gallery_model_1.default.create({
                image: `/uploads/${file.filename}`,
            });
            return newGallery.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async editGallery(id, file) {
        try {
            const existingGallery = await gallery_model_1.default.findById(id);
            if (!existingGallery) {
                throw HttpException_utils_1.default.notFound("Gallery image not found");
            }
            const updateData = {};
            if (file) {
                // Delete the old image first
                if (existingGallery.image) {
                    const oldImagePath = path_1.default.join(__dirname, "../../", existingGallery.image);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                updateData.image = `/uploads/${file.filename}`;
            }
            const updatedGallery = await gallery_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedGallery) {
                throw HttpException_utils_1.default.notFound("Gallery image not found");
            }
            return updatedGallery.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async deleteGallery(id) {
        try {
            const gallery = await gallery_model_1.default.findById(id);
            if (!gallery) {
                throw HttpException_utils_1.default.notFound("Gallery image not found");
            }
            // Remove the image if it exists
            if (gallery.image) {
                const imagePath = path_1.default.join(__dirname, "../../", gallery.image);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            await gallery_model_1.default.findByIdAndDelete(id);
            return { message: "Gallery image deleted successfully" };
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new GalleryService();
