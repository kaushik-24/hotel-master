"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoSectionService = void 0;
// src/services/infoSection.services.ts
const infoSection_model_1 = __importDefault(require("../models/infoSection.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
class InfoSectionService {
    /**
     * Get the hotel info section
     * @returns Info section data
     */
    async getInfoSection() {
        try {
            let infoSection = await infoSection_model_1.default.findOne();
            if (!infoSection) {
                // Create a default info section if none exists
                infoSection = await infoSection_model_1.default.create({
                    name: "",
                    address: "",
                    phoneNumbers: [],
                    whatsapp: "",
                    enquiryEmail: "",
                    contactEmail: ""
                });
                if (!infoSection) {
                    throw HttpException_utils_1.default.badRequest("Failed to create info section");
                }
            }
            return infoSection;
        }
        catch (error) {
            console.error("Error in getInfoSection service:", error);
            throw HttpException_utils_1.default.badRequest("Unable to fetch info section");
        }
    }
    /**
     * Update the hotel info section
     * @param data Partial info section data to update
     * @returns Updated info section data
     */
    async updateInfoSection(data) {
        try {
            let infoSection = await infoSection_model_1.default.findOne();
            if (!infoSection) {
                // Create a new document if none exists
                infoSection = await infoSection_model_1.default.create(data);
                if (!infoSection) {
                    throw HttpException_utils_1.default.badRequest("Failed to create info section");
                }
            }
            else {
                // Update existing fields
                infoSection = await infoSection_model_1.default.findOneAndUpdate({}, data, { new: true });
                if (!infoSection) {
                    throw HttpException_utils_1.default.badRequest("Failed to update info section");
                }
            }
            return infoSection;
        }
        catch (error) {
            console.error("Error in updateInfoSection service:", error);
            throw HttpException_utils_1.default.badRequest("Unable to update info section");
        }
    }
}
exports.infoSectionService = new InfoSectionService();
