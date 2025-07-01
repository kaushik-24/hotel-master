import AboutUs from "../models/aboutUs.model";
import HttpException from "../utils/HttpException.utils";
import path from "path";
import fs from "fs";

class AboutUsService {
  async getAboutUs() {
    try {
      const aboutUs = await AboutUs.findOne();
      if (!aboutUs) {
        throw HttpException.notFound("About Us section not found");
      }
      return aboutUs.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createAboutUs(data: { subtitle: string; heading: string; subheading: string; description1: string; image: string;}, file?: Express.Multer.File) {
    try {
      // Check if About Us section already exists
      const existingAboutUs = await AboutUs.findOne();
      if (existingAboutUs) {
        throw HttpException.badRequest("About Us section already exists. Please use update instead.");
      }

      const newAboutUs = await AboutUs.create({
        ...data,
        image: file ? `/uploads/${file.filename}` : undefined,
      });
      return newAboutUs.toObject();
    } catch (error: any) {
      // Clean up uploaded file if creation fails
      if (file) {
        const filePath = path.join(__dirname, "../../uploads", file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      throw HttpException.badRequest(error.message);
    }
  }

  async updateAboutUs(data: { subtitle?: string; heading?: string; subheading?: string; description1?: string; image: string; }, file?: Express.Multer.File) {
    try {
      const existingAboutUs = await AboutUs.findOne();
      if (!existingAboutUs) {
        throw HttpException.notFound("About Us section not found");
      }

      const updateData: any = { ...data };

      // Handle image upload
      if (file) {
        // Delete the old image if it exists
        if (existingAboutUs.image) {
          const oldImagePath = path.join(__dirname, "../../", existingAboutUs.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.image = `/uploads/${file.filename}`;
      }

      // Remove undefined fields
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const updatedAboutUs = await AboutUs.findOneAndUpdate({}, updateData, { new: true });
      return updatedAboutUs?.toObject();
    } catch (error: any) {
      // Clean up uploaded file if update fails
      if (file) {
        const filePath = path.join(__dirname, "../../uploads", file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      throw HttpException.badRequest(error.message);
    }
  }

  async deleteAboutUs() {
    try {
      const aboutUs = await AboutUs.findOne();
      if (!aboutUs) {
        throw HttpException.notFound("About Us section not found");
      }

      // Remove the image if it exists
      if (aboutUs.image) {
        const imagePath = path.join(__dirname, "../../", aboutUs.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await AboutUs.deleteOne({});
      return { message: "About Us section deleted successfully" };
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new AboutUsService();
