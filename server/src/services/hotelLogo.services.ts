import path from "path";
import fs from "fs";
import HttpException from "../utils/HttpException.utils";
import HotelLogo from "../models/hotelLogo.model";

class hotelLogoService {
  async getHero() {
    try {
      const hero = await HotelLogo.findOne();
      if (!hero) {
        throw HttpException.notFound("Hero section not found");
      }
      return hero.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createHero( file: Express.Multer.File) {
    try {
      // Check if hero section already exists
      const existingHero = await HotelLogo.findOne();
      if (existingHero) {
        throw HttpException.badRequest("Hero section already exists. Please use update instead.");
      }

      const heroData = {
        path: `/uploads/${file.filename}`,
      };

      const newHero = await HotelLogo.create(heroData);
      return newHero.toObject();
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

  async updateHero(data: {  }, file?: Express.Multer.File) {
    try {
      const existingHero = await HotelLogo.findOne();
      if (!existingHero) {
        throw HttpException.notFound("Hero section not found");
      }

      const updateData: any = { ...data };

      if (file) {
        // Delete old image if it exists
        if (existingHero.path) {
          const oldImagePath = path.join(__dirname, "../../", existingHero.path);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.path = `/uploads/${file.filename}`;
      }

      // Remove undefined fields
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const updatedHero = await HotelLogo.findOneAndUpdate({}, updateData, { new: true });
      return updatedHero?.toObject();
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
}

export default new hotelLogoService();

