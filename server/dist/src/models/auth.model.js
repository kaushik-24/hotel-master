"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const enum_1 = require("../constant/enum"); // Enum for user roles
const messages_1 = require("../constant/messages"); // Message constants for validation
const regex_1 = require("../constant/regex"); // Regex constants for email/phone validation
// Define the user schema
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [regex_1.emailRegex, messages_1.Message.validEmailAddress], // Email validation
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: false,
        match: [regex_1.phoneRegex, messages_1.Message.validPhoneNumber], // Phone validation
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(enum_1.ROLE),
        default: enum_1.ROLE.USER, // Default role for the user
    },
}, {
    timestamps: true, // Auto add createdAt and updatedAt fields
});
// Create the User model from the schema
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
