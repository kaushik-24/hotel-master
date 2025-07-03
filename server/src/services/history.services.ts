import path from "path";
import fs from "fs";
import History from "../models/history.model";
import HttpException from "../utils/HttpException.utils";

class HistoryService {
  async getHistory() {
    try {
      const history = await History.findOne();
      if (!history) {
        throw HttpException.notFound("History section not found");
      }
      return history.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createHistory(data: { title: string; mainDescription: string; sections: { heading: string; description: string }[] }, files?: Express.Multer.File[]) {
    try {
      const existingHistory = await History.findOne();
      if (existingHistory) {
        throw HttpException.badRequest("History section already exists. Please use update instead.");
      }

      const historyData: any = {
        title: data.title,
        mainDescription: data.mainDescription,
        sections: data.sections.map((section, index) => ({
          ...section,
          image: files && files[index] ? `/uploads/${files[index].filename}` : undefined,
        })),
      };

      const newHistory = await History.create(historyData);
      return newHistory.toObject();
    } catch (error: any) {
      if (files) {
        files.forEach((file) => {
          const filePath = path.join(__dirname, "../../uploads", file.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
      throw HttpException.badRequest(error.message);
    }
  }

  async updateHistory(data: { title?: string; mainDescription?: string; sections?: { heading: string; description: string }[] }, files?: Express.Multer.File[]) {
    try {
      const existingHistory = await History.findOne();
      if (!existingHistory) {
        throw HttpException.notFound("History section not found");
      }

      const updateData: any = {
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
            const oldImagePath = path.join(__dirname, "../../", section.image);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          }
        });
      }

      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const updatedHistory = await History.findOneAndUpdate({}, updateData, { new: true });
      return updatedHistory?.toObject();
    } catch (error: any) {
      if (files) {
        files.forEach((file) => {
          const filePath = path.join(__dirname, "../../uploads", file.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new HistoryService();
