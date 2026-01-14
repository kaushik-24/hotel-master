import path from "path";
import fs from "fs";
import Hero from "../models/hero.model";
import HttpException from "../utils/HttpException.utils";

class heroService {
  async getHero() {
    try {
      const hero = await Hero.findOne();
      if (!hero) {
        throw HttpException.notFound("Hero section not found");
      }
      return hero.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createHero(data: { heading1: string; heading2: string }, file: Express.Multer.File) {
    try {
      // Check if hero section already exists
      const existingHero = await Hero.findOne();
      if (existingHero) {
        throw HttpException.badRequest("Hero section already exists. Please use update instead.");
      }

      const heroData = {
        ...data,
        heroImage: `/uploads/${file.filename}`,
      };

      const newHero = await Hero.create(heroData);
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

  async updateHero(data: { heading1?: string; heading2?: string }, file?: Express.Multer.File) {
    try {
      const existingHero = await Hero.findOne();
      if (!existingHero) {
        throw HttpException.notFound("Hero section not found");
      }

      const updateData: any = { ...data };

      if (file) {
        // Delete old image if it exists
        if (existingHero.heroImage) {
          const oldImagePath = path.join(__dirname, "../../", existingHero.heroImage);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.heroImage = `/uploads/${file.filename}`;
      }

      // Remove undefined fields
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const updatedHero = await Hero.findOneAndUpdate({}, updateData, { new: true });
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

export default new heroService();
