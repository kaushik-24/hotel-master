import QuestAndValues from "../models/questValues.model";
import HttpException from "../utils/HttpException.utils";

interface SectionData {
  topic: string;
  description: string;
}

class QuestAndValuesService {
  async getQuestAndValues() {
    try {
      const questAndValues = await QuestAndValues.findOne();
      if (!questAndValues) {
        throw HttpException.notFound("Quest and Values data not found");
      }
      return questAndValues.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createQuestAndValues(data: { questAndVision: any; coreValues: any }) {
    try {
      const existingQuestAndValues = await QuestAndValues.findOne();
      if (existingQuestAndValues) {
        throw HttpException.badRequest("Quest and Values data already exists. Please use update instead.");
      }

      const questAndVisionData = {
        title: data.questAndVision.title,
        mainDescription: data.questAndVision.mainDescription,
        sections: data.questAndVision.sections.map((section: SectionData) => ({
          topic: section.topic,
          description: section.description,
        })),
      };

      const coreValuesData = {
        title: data.coreValues.title,
        mainDescription: data.coreValues.mainDescription,
        sections: data.coreValues.sections.map((section: SectionData) => ({
          topic: section.topic,
          description: section.description,
        })),
      };

      const newQuestAndValues = await QuestAndValues.create({
        questAndVision: questAndVisionData,
        coreValues: coreValuesData,
      });
      return newQuestAndValues.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async updateQuestAndValues(data: { questAndVision?: any; coreValues?: any }) {
    try {
      const existingQuestAndValues = await QuestAndValues.findOne();
      if (!existingQuestAndValues) {
        throw HttpException.notFound("Quest and Values data not found");
      }

      const updateData: any = {
        questAndVision: data.questAndVision
          ? {
              title: data.questAndVision.title || existingQuestAndValues.questAndVision.title,
              mainDescription: data.questAndVision.mainDescription || existingQuestAndValues.questAndVision.mainDescription,
              sections: data.questAndVision.sections.map((section: SectionData) => ({
                topic: section.topic,
                description: section.description,
              })),
            }
          : existingQuestAndValues.questAndVision,
        coreValues: data.coreValues
          ? {
              title: data.coreValues.title || existingQuestAndValues.coreValues.title,
              mainDescription: data.coreValues.mainDescription || existingQuestAndValues.coreValues.mainDescription,
              sections: data.coreValues.sections.map((section: SectionData) => ({
                topic: section.topic,
                description: section.description,
              })),
            }
          : existingQuestAndValues.coreValues,
      };

      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const updatedQuestAndValues = await QuestAndValues.findOneAndUpdate({}, updateData, { new: true });
      return updatedQuestAndValues?.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new QuestAndValuesService();
