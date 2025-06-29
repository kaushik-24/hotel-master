import path from "path";
import Gallery from "../models/gallery.model";
import HttpException from "../utils/HttpException.utils";
import fs from "fs";

class GalleryService {

  async getAllGallerys() {
    try {
      const gallerys = await Gallery.find(); // Fetch all gallery images
      return gallerys;
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createGallery(file?: Express.Multer.File) {
    try {
      if (!file) {
        throw HttpException.badRequest("No image file provided");
      }

      const newGallery = await Gallery.create({
        image: `/uploads/${file.filename}`,
      });
      return newGallery.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async editGallery(id: string, file?: Express.Multer.File) {
    try {
      const existingGallery = await Gallery.findById(id);
      if (!existingGallery) {
        throw HttpException.notFound("Gallery image not found");
      }

      const updateData: any = {};
      if (file) {
        // Delete the old image first
        if (existingGallery.image) {
          const oldImagePath = path.join(__dirname, "../../", existingGallery.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.image = `/uploads/${file.filename}`;
      }

      const updatedGallery = await Gallery.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedGallery) {
        throw HttpException.notFound("Gallery image not found");
      }

      return updatedGallery.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async deleteGallery(id: string) {
    try {
      const gallery = await Gallery.findById(id);
      if (!gallery) {
        throw HttpException.notFound("Gallery image not found");
      }

      // Remove the image if it exists
      if (gallery.image) {
        const imagePath = path.join(__dirname, "../../", gallery.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await Gallery.findByIdAndDelete(id);
      return { message: "Gallery image deleted successfully" };
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new GalleryService();

