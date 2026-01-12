"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const contact_model_1 = __importDefault(require("../models/contact.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
class contactService {
    async getContact() {
        try {
            const contact = await contact_model_1.default.findOne();
            if (!contact) {
                throw HttpException_utils_1.default.notFound("Contact section not found");
            }
            return contact.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createContact(data, file) {
        try {
            // Check if contact section already exists
            const existingContact = await contact_model_1.default.findOne();
            if (existingContact) {
                throw HttpException_utils_1.default.badRequest("Contact section already exists. Please use update instead.");
            }
            // Ensure phoneNumber is an array of strings
            if (!Array.isArray(data.phoneNumber)) {
                throw HttpException_utils_1.default.badRequest("Phone number must be an array of strings");
            }
            const contactData = {
                address: data.address,
                email: data.email,
                phoneNumber: data.phoneNumber.filter((phone) => phone.trim() !== ""),
                contactImage: `/uploads/${file.filename}`,
            };
            const newContact = await contact_model_1.default.create(contactData);
            return newContact.toObject();
        }
        catch (error) {
            // Clean up uploaded file if creation fails
            if (file) {
                const filePath = path_1.default.join(__dirname, "../../uploads", file.filename);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
            }
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async updateContact(data, file) {
        try {
            const existingContact = await contact_model_1.default.findOne();
            if (!existingContact) {
                throw HttpException_utils_1.default.notFound("Contact section not found");
            }
            const updateData = {
                address: data.address,
                email: data.email,
                phoneNumber: data.phoneNumber?.filter((phone) => phone.trim() !== ""),
            };
            if (file) {
                // Delete old image if it exists
                if (existingContact.contactImage) {
                    const oldImagePath = path_1.default.join(__dirname, "../../", existingContact.contactImage);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                updateData.contactImage = `/uploads/${file.filename}`;
            }
            // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            // Ensure phoneNumber is an array of strings
            if (updateData.phoneNumber && !Array.isArray(updateData.phoneNumber)) {
                throw HttpException_utils_1.default.badRequest("Phone number must be an array of strings");
            }
            const updatedContact = await contact_model_1.default.findOneAndUpdate({}, updateData, { new: true });
            return updatedContact?.toObject();
        }
        catch (error) {
            // Clean up uploaded file if update fails
            if (file) {
                const filePath = path_1.default.join(__dirname, "../../Uploads", file.filename);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
            }
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new contactService();
