import path from "path";
import fs from "fs";
import AboutUs from "../models/aboutUs.model";
import HttpException from "../utils/HttpException.utils";

class AboutUsService {
  async getAboutUs() {
    try {
      const aboutUs = await AboutUs.findOne();
      if (!aboutUs) {
        throw HttpException.notFound("AboutUs section not found");
      }
      return aboutUs.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createAboutUs(data: { heading1: string; heading2: string; subtitle: string; description: string }, file: Express.Multer.File) {
    try {
      // Check if aboutUs section already exists
      const existingAboutUs = await AboutUs.findOne();
      if (existingAboutUs) {
        throw HttpException.badRequest("AboutUs section already exists. Please use update instead.");
      }

      const aboutUsData = {
        ...data,
        aboutUsImage: `/uploads/${file.filename}`,
      };

      const newAboutUs = await AboutUs.create(aboutUsData);
      return newAboutUs.toObject();
    } catch (error: any) {
      // Clean up uploaded file if creation fails
      if (file) {
        const filePath = path.join(__dirname, "../../Uploads", file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      throw HttpException.badRequest(error.message);
    }
  }

  async updateAboutUs(data: { heading1?: string; heading2?: string; subtitle?: string; description?: string }, file?: Express.Multer.File) {
    try {
      const existingAboutUs = await AboutUs.findOne();
      if (!existingAboutUs) {
        throw HttpException.notFound("AboutUs section not found");
      }

      const updateData: any = { ...data };

      if (file) {
        // Delete old image if it exists
        if (existingAboutUs.aboutUsImage) {
          const oldImagePath = path.join(__dirname, "../../", existingAboutUs.aboutUsImage);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.aboutUsImage = `/uploads/${file.filename}`;
      }

      // Remove undefined fields
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const updatedAboutUs = await AboutUs.findOneAndUpdate({}, updateData, { new: true });
      return updatedAboutUs?.toObject();
    } catch (error: any) {
      // Clean up uploaded file if update fails
      if (file) {
        const filePath = path.join(__dirname, "../../Uploads", file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new AboutUsService();
