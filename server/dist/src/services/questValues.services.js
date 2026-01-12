"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const questValues_model_1 = __importDefault(require("../models/questValues.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
class QuestAndValuesService {
    async getQuestAndValues() {
        try {
            const questAndValues = await questValues_model_1.default.findOne();
            if (!questAndValues) {
                throw HttpException_utils_1.default.notFound("Quest and Values data not found");
            }
            return questAndValues.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createQuestAndValues(data) {
        try {
            const existingQuestAndValues = await questValues_model_1.default.findOne();
            if (existingQuestAndValues) {
                throw HttpException_utils_1.default.badRequest("Quest and Values data already exists. Please use update instead.");
            }
            const questAndVisionData = {
                title: data.questAndVision.title,
                mainDescription: data.questAndVision.mainDescription,
                sections: data.questAndVision.sections.map((section) => ({
                    topic: section.topic,
                    description: section.description,
                })),
            };
            const coreValuesData = {
                title: data.coreValues.title,
                mainDescription: data.coreValues.mainDescription,
                sections: data.coreValues.sections.map((section) => ({
                    topic: section.topic,
                    description: section.description,
                })),
            };
            const newQuestAndValues = await questValues_model_1.default.create({
                questAndVision: questAndVisionData,
                coreValues: coreValuesData,
            });
            return newQuestAndValues.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async updateQuestAndValues(data) {
        try {
            const existingQuestAndValues = await questValues_model_1.default.findOne();
            if (!existingQuestAndValues) {
                throw HttpException_utils_1.default.notFound("Quest and Values data not found");
            }
            const updateData = {
                questAndVision: data.questAndVision
                    ? {
                        title: data.questAndVision.title || existingQuestAndValues.questAndVision.title,
                        mainDescription: data.questAndVision.mainDescription || existingQuestAndValues.questAndVision.mainDescription,
                        sections: data.questAndVision.sections.map((section) => ({
                            topic: section.topic,
                            description: section.description,
                        })),
                    }
                    : existingQuestAndValues.questAndVision,
                coreValues: data.coreValues
                    ? {
                        title: data.coreValues.title || existingQuestAndValues.coreValues.title,
                        mainDescription: data.coreValues.mainDescription || existingQuestAndValues.coreValues.mainDescription,
                        sections: data.coreValues.sections.map((section) => ({
                            topic: section.topic,
                            description: section.description,
                        })),
                    }
                    : existingQuestAndValues.coreValues,
            };
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedQuestAndValues = await questValues_model_1.default.findOneAndUpdate({}, updateData, { new: true });
            return updatedQuestAndValues?.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new QuestAndValuesService();
