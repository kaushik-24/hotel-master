"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const questValues_services_1 = __importDefault(require("../services/questValues.services"));
class QuestAndValuesController {
    async getQuestAndValues(req, res) {
        try {
            const response = await questValues_services_1.default.getQuestAndValues();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response,
            });
        }
        catch (error) {
            console.error("Error fetching Quest and Values data:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the Quest and Values data.",
                originalError: error.message || "An error occurred while fetching the Quest and Values data.",
            });
        }
    }
    async createQuestAndValues(req, res) {
        try {
            const { questAndVision, coreValues } = req.body;
            console.log("Request body:", req.body); // Debug log
            const response = await questValues_services_1.default.createQuestAndValues({
                questAndVision,
                coreValues,
            });
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response,
            });
        }
        catch (error) {
            console.error("Error creating Quest and Values data:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the Quest and Values data.",
                originalError: error.message || "An error occurred while creating the Quest and Values data.",
            });
        }
    }
    async updateQuestAndValues(req, res) {
        try {
            const { questAndVision, coreValues } = req.body;
            console.log("Request body:", req.body); // Debug log
            const response = await questValues_services_1.default.updateQuestAndValues({
                questAndVision,
                coreValues,
            });
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response,
            });
        }
        catch (error) {
            console.error("Error updating Quest and Values data:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating the Quest and Values data.",
                originalError: error.message || "An error occurred while updating the Quest and Values data.",
            });
        }
    }
}
exports.default = new QuestAndValuesController();
