import path from "path";
import fs from "fs";
import HttpException from "../utils/HttpException.utils";
import PlacesSights from "../models/placesSights.model";

class placesSightsService {
  async getPlacesSights() {
    try {
      const placesSights = await PlacesSights.findOne();
      if (!placesSights) {
        throw HttpException.notFound("PlacesSights section not found");
      }
      return placesSights.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createPlacesSights(data: { heading1: string; description: string }, file: Express.Multer.File) {
    try {
      // Check if hero section already exists
      const existingPlacesSights = await PlacesSights.findOne();
      if (existingPlacesSights) {
        throw HttpException.badRequest("placesSights section already exists. Please use update instead.");
      }

      const placesSightsData = {
        ...data,
        placesSightsImage: `/uploads/${file.filename}`,
      };

      const newPlacesSights = await PlacesSights.create(placesSightsData);
      return newPlacesSights.toObject();
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

  async updatePlacesSights(data: { heading1?: string; description?: string }, file?: Express.Multer.File) {
    try {
      const existingPlacesSights = await PlacesSights.findOne();
      if (!existingPlacesSights) {
        throw HttpException.notFound("placesSights section not found");
      }

      const updateData: any = { ...data };

      if (file) {
        // Delete old image if it exists
        if (existingPlacesSights.placesSightsImage) {
          const oldImagePath = path.join(__dirname, "../../", existingPlacesSights.placesSightsImage);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.placesSightsImage = `/uploads/${file.filename}`;
      }

      // Remove undefined fields
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const updatedPlacesSights = await PlacesSights.findOneAndUpdate({}, updateData, { new: true });
      return updatedPlacesSights?.toObject();
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

export default new placesSightsService();

