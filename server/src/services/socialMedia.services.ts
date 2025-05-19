import SocialMedia, { ISocialMedia } from "../models/socialMedia.model";
import HttpException from "../utils/HttpException.utils";

class SocialMediaService {
    /**
     * Get social media links
     * @returns Social media data
     */
    async getSocialMedia(): Promise<ISocialMedia> {
        try {
            let socialMedia = await SocialMedia.findOne();
            if (!socialMedia) {
                // If no social media document exists, create one with default empty strings
                socialMedia = await SocialMedia.create({});
                if (!socialMedia) {
                    throw HttpException.badRequest("Failed to create social media links");
                }
            }
            return socialMedia;
        } catch (error: any) {
            console.error("Error in getSocialMedia service:", error);
            throw HttpException.badRequest("Unable to fetch social media links");
        }
    }

    /**
     * Update social media links
     * @param data Partial social media data to update
     * @returns Updated social media data
     */
    async updateSocialMedia(data: Partial<ISocialMedia>): Promise<ISocialMedia> {
        try {
            let socialMedia = await SocialMedia.findOne();
            if (!socialMedia) {
                // If no document exists, create one
                socialMedia = await SocialMedia.create(data);
                if (!socialMedia) {
                    throw HttpException.badRequest("Failed to create social media links");
                }
            } else {
                // Update the fields
                socialMedia = await SocialMedia.findOneAndUpdate({}, data, { new: true });
                if (!socialMedia) {
                    throw HttpException.badRequest("Failed to update social media links");
                }
            }
            return socialMedia;
        } catch (error: any) {
            console.error("Error in updateSocialMedia service:", error);
            throw HttpException.badRequest("Unable to update social media links");
        }
    }
}

export default new SocialMediaService();
