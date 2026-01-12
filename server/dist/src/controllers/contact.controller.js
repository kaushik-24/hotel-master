"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const contact_services_1 = __importDefault(require("../services/contact.services"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
class ContactController {
    async getContact(req, res) {
        try {
            const response = await contact_services_1.default.getContact();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response,
            });
        }
        catch (error) {
            console.error("Error fetching contact section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the contact section.",
                originalError: error.message || "An error occurred while fetching the contact section.",
            });
        }
    }
    async createContact(req, res) {
        try {
            const { address, email, phoneNumber } = req.body;
            let parsedPhoneNumber = [];
            if (phoneNumber) {
                parsedPhoneNumber = typeof phoneNumber === "string" ? JSON.parse(phoneNumber) : phoneNumber;
                if (!Array.isArray(parsedPhoneNumber)) {
                    throw HttpException_utils_1.default.badRequest("Phone number must be an array of strings");
                }
            }
            const response = await contact_services_1.default.createContact({ address, email, phoneNumber: parsedPhoneNumber }, req.file);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response,
            });
        }
        catch (error) {
            console.error("Error creating contact section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the contact section.",
                originalError: error.message || "An error occurred while creating the contact section.",
            });
        }
    }
    async updateContact(req, res) {
        try {
            const { address, email, phoneNumber } = req.body;
            let parsedPhoneNumber;
            if (phoneNumber) {
                parsedPhoneNumber = typeof phoneNumber === "string" ? JSON.parse(phoneNumber) : phoneNumber;
                if (!Array.isArray(parsedPhoneNumber)) {
                    throw HttpException_utils_1.default.badRequest("Phone number must be an array of strings");
                }
            }
            const response = await contact_services_1.default.updateContact({ address, email, phoneNumber: parsedPhoneNumber }, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response,
            });
        }
        catch (error) {
            console.error("Error updating contact section:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while updating the contact section.",
                originalError: error.message || "An error occurred while updating the contact section.",
            });
        }
    }
}
exports.default = new ContactController();
