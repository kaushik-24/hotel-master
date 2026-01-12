"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const history_services_1 = __importDefault(require("../services/history.services"));
class HistoryController {
    async getHistory(req, res) {
        try {
            const response = await history_services_1.default.getHistory();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response,
            });
        }
        catch (error) {
            console.error("Error fetching history section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the history section.",
                originalError: error.message || "An error occurred while fetching the history section.",
            });
        }
    }
    async createHistory(req, res) {
        try {
            const { title, mainDescription, sections } = req.body;
            const files = req.files;
            const response = await history_services_1.default.createHistory({ title, mainDescription, sections: JSON.parse(sections) }, files);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response,
            });
        }
        catch (error) {
            console.error("Error creating history section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the history section.",
                originalError: error.message || "An error occurred while creating the history section.",
            });
        }
    }
    async updateHistory(req, res) {
        try {
            const { title, mainDescription, sections } = req.body;
            const files = req.files;
            const response = await history_services_1.default.updateHistory({ title, mainDescription, sections: sections ? JSON.parse(sections) : undefined }, files);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response,
            });
        }
        catch (error) {
            console.error("Error updating history section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating the history section.",
                originalError: error.message || "An error occurred while updating the history section.",
            });
        }
    }
}
exports.default = new HistoryController();
