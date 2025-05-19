// src/services/infoSection.services.ts
import InfoSection, { IInfoSection } from "../models/infoSection.model";
import HttpException from "../utils/HttpException.utils";

class InfoSectionService {
    /**
     * Get the hotel info section
     * @returns Info section data
     */
    async getInfoSection(): Promise<IInfoSection> {
        try {
            let infoSection = await InfoSection.findOne();
            if (!infoSection) {
                // Create a default info section if none exists
                infoSection = await InfoSection.create({
                    address: "",
                    phoneNumbers: [],
                    whatsapp: "",
                    enquiryEmail: "",
                    contactEmail: ""
                });
                if (!infoSection) {
                    throw HttpException.badRequest("Failed to create info section");
                }
            }
            return infoSection;
        } catch (error: any) {
            console.error("Error in getInfoSection service:", error);
            throw HttpException.badRequest("Unable to fetch info section");
        }
    }

    /**
     * Update the hotel info section
     * @param data Partial info section data to update
     * @returns Updated info section data
     */
    async updateInfoSection(data: Partial<IInfoSection>): Promise<IInfoSection> {
        try {
            let infoSection = await InfoSection.findOne();
            if (!infoSection) {
                // Create a new document if none exists
                infoSection = await InfoSection.create(data);
                if (!infoSection) {
                    throw HttpException.badRequest("Failed to create info section");
                }
            } else {
                // Update existing fields
                infoSection = await InfoSection.findOneAndUpdate({}, data, { new: true });
                if (!infoSection) {
                    throw HttpException.badRequest("Failed to update info section");
                }
            }
            return infoSection;
        } catch (error: any) {
            console.error("Error in updateInfoSection service:", error);
            throw HttpException.badRequest("Unable to update info section");
        }
    }
}

export const infoSectionService = new InfoSectionService();
