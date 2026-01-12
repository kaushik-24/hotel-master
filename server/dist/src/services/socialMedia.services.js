"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socialMedia_model_1 = __importDefault(require("../models/socialMedia.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
class SocialMediaService {
    /**
     * Get social media links
     * @returns Social media data
     */
    async getSocialMedia() {
        try {
            let socialMedia = await socialMedia_model_1.default.findOne();
            if (!socialMedia) {
                // If no social media document exists, create one with default empty strings
                socialMedia = await socialMedia_model_1.default.create({});
                if (!socialMedia) {
                    throw HttpException_utils_1.default.badRequest("Failed to create social media links");
                }
            }
            return socialMedia;
        }
        catch (error) {
            console.error("Error in getSocialMedia service:", error);
            throw HttpException_utils_1.default.badRequest("Unable to fetch social media links");
        }
    }
    /**
     * Update social media links
     * @param data Partial social media data to update
     * @returns Updated social media data
     */
    async updateSocialMedia(data) {
        try {
            let socialMedia = await socialMedia_model_1.default.findOne();
            if (!socialMedia) {
                // If no document exists, create one
                socialMedia = await socialMedia_model_1.default.create(data);
                if (!socialMedia) {
                    throw HttpException_utils_1.default.badRequest("Failed to create social media links");
                }
            }
            else {
                // Update the fields
                socialMedia = await socialMedia_model_1.default.findOneAndUpdate({}, data, { new: true });
                if (!socialMedia) {
                    throw HttpException_utils_1.default.badRequest("Failed to update social media links");
                }
            }
            return socialMedia;
        }
        catch (error) {
            console.error("Error in updateSocialMedia service:", error);
            throw HttpException_utils_1.default.badRequest("Unable to update social media links");
        }
    }
}
exports.default = new SocialMediaService();
