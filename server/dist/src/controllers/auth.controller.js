"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const auth_services_1 = __importDefault(require("../services/auth.services"));
class AuthController {
    async createUser(req, res) {
        const { name, email, phoneNumber, password } = req.body;
        if (!name || name.length < 2) {
            return res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Name must be at least 5 characters long",
            });
        }
        if (!email || !email.includes("@")) {
            return res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid email address",
            });
        }
        if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
            return res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Enter a valid phone number",
            });
        }
        // No need to validate password here, it's handled in the model
        try {
            const response = await auth_services_1.default.createUser(req.body);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response
            });
        }
        catch (error) {
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the user."
            });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !email.includes("@")) {
            return res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid email address",
            });
        }
        // No need to validate password here, it's handled in the service
        try {
            const response = await auth_services_1.default.loginUser(req.body);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.loginSuccessfully,
                data: response
            });
        }
        catch (error) {
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred during login."
            });
        }
    }
}
exports.default = AuthController;
