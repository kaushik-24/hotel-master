"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const policy_services_1 = __importDefault(require("../services/policy.services"));
class PolicyController {
    async getAllPolicies(req, res) {
        try {
            const response = await policy_services_1.default.getAllPolicies();
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching Policies:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the policies.",
                originalError: error.message || "An error occurred while fetching the policies."
            });
        }
    }
    async getPolicyById(req, res) {
        try {
            const response = await policy_services_1.default.getPolicyById(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching policy by ID:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the policy.",
                originalError: error.message || "An error occurred while fetching the policy."
            });
        }
    }
    async createPolicy(req, res) {
        try {
            const response = await policy_services_1.default.createPolicy(req.body, req.file);
            res.status(statusCode_1.StatusCodes.CREATED).json({
                success: true,
                message: messages_1.Message.created,
                data: response
            });
        }
        catch (error) {
            console.error("Error Creating Policy:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the policy.",
                originalError: error.message || "An error occurred while creating the policy."
            });
        }
    }
    async editPolicy(req, res) {
        try {
            const response = await policy_services_1.default.editPolicy(req.params.id, req.body, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.updated,
                data: response
            });
        }
        catch (error) {
            console.error("Error Editing Policy:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while editing the policy.",
                originalError: error.message || "An error occurred while editing the policy."
            });
        }
    }
    async getPolicyBySlug(req, res) {
        try {
            const response = await policy_services_1.default.getPolicyBySlug(req.params.slug);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.fetched,
                data: response
            });
        }
        catch (error) {
            console.error("Error Fetching policy by Slug:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while fetching the policy.",
                originalError: error.message || "An error occurred while fetching the policy."
            });
        }
    }
    async deletePolicy(req, res) {
        try {
            const response = await policy_services_1.default.deletePolicy(req.params.id);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.deleted,
                data: response
            });
        }
        catch (error) {
            console.error("Error Deleting policy:", error);
            res.status(error.statusCode || statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while deleting the policy.",
                originalError: error.message || "An error occurred while deleting the policy."
            });
        }
    }
}
exports.default = new PolicyController();
