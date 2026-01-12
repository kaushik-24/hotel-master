"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const infoSection_service_1 = require("../services/infoSection.service");
class InfoSectionController {
    /**
     * Get all info section details
     * @param req Request
     * @param res Response
     */
    async getInfoSection(req, res) {
        try {
            const infoSection = await infoSection_service_1.infoSectionService.getInfoSection();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: infoSection
            });
        }
        catch (error) {
            console.error("Error Fetching Info Section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching info section.",
            });
        }
    }
    /**
     * Update info section details
     * @param req Request
     * @param res Response
     */
    async updateInfoSection(req, res) {
        try {
            const updatedInfoSection = await infoSection_service_1.infoSectionService.updateInfoSection(req.body);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: updatedInfoSection
            });
        }
        catch (error) {
            console.error("Error Updating Info Section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating info section.",
            });
        }
    }
}
exports.default = new InfoSectionController();
