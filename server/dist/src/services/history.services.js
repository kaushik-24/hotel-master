"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const history_model_1 = __importDefault(require("../models/history.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
class HistoryService {
    async getHistory() {
        try {
            const history = await history_model_1.default.findOne();
            if (!history) {
                throw HttpException_utils_1.default.notFound("History section not found");
            }
            return history.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createHistory(data, files) {
        try {
            const existingHistory = await history_model_1.default.findOne();
            if (existingHistory) {
                throw HttpException_utils_1.default.badRequest("History section already exists. Please use update instead.");
            }
            const historyData = {
                title: data.title,
                mainDescription: data.mainDescription,
                sections: data.sections.map((section, index) => ({
                    ...section,
                    image: files && files[index] ? `/uploads/${files[index].filename}` : undefined,
                })),
            };
            const newHistory = await history_model_1.default.create(historyData);
            return newHistory.toObject();
        }
        catch (error) {
            if (files) {
                files.forEach((file) => {
                    const filePath = path_1.default.join(__dirname, "../../uploads", file.filename);
                    if (fs_1.default.existsSync(filePath)) {
                        fs_1.default.unlinkSync(filePath);
                    }
                });
            }
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async updateHistory(data, files) {
        try {
            const existingHistory = await history_model_1.default.findOne();
            if (!existingHistory) {
                throw HttpException_utils_1.default.notFound("History section not found");
            }
            const updateData = {
                title: data.title || existingHistory.title,
                mainDescription: data.mainDescription || existingHistory.mainDescription,
                sections: data.sections
                    ? data.sections.map((section, index) => ({
                        ...section,
                        image: files && files[index] ? `/uploads/${files[index].filename}` : existingHistory.sections[index]?.image,
                    }))
                    : existingHistory.sections,
            };
            if (files) {
                existingHistory.sections.forEach((section, index) => {
                    if (section.image && (!data.sections || index < data.sections.length)) {
                        const oldImagePath = path_1.default.join(__dirname, "../../", section.image);
                        if (fs_1.default.existsSync(oldImagePath)) {
                            fs_1.default.unlinkSync(oldImagePath);
                        }
                    }
                });
            }
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedHistory = await history_model_1.default.findOneAndUpdate({}, updateData, { new: true });
            return updatedHistory?.toObject();
        }
        catch (error) {
            if (files) {
                files.forEach((file) => {
                    const filePath = path_1.default.join(__dirname, "../../uploads", file.filename);
                    if (fs_1.default.existsSync(filePath)) {
                        fs_1.default.unlinkSync(filePath);
                    }
                });
            }
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new HistoryService();
