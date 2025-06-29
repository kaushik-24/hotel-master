import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import galleryService from "../services/gallery.services";

class GalleryController {

  async getAllGallerys(req: Request, res: Response) {
    try {
      const response = await galleryService.getAllGallerys();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error('Error Fetching Gallery Images:', error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || 'An error occurred while fetching gallery images.',
        originalError: error.message || 'An error occurred while fetching gallery images.',
      });
    }
  }

  async createGallery(req: Request, res: Response) {
    try {
      const response = await galleryService.createGallery(req.file);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: response
      });
    } catch (error: any) {
      console.error("Error Creating Gallery:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while creating the gallery image.",
        originalError: error.message || "An error occurred while creating the gallery image."
      });
    }
  }

  async editGallery(req: Request, res: Response) {
    try {
      const response = await galleryService.editGallery(req.params.id, req.file);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: response
      });
    } catch (error: any) {
      console.error("Error Editing Gallery:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while editing the gallery image.",
        originalError: error.message || "An error occurred while editing the gallery image."
      });
    }
  }

  async deleteGallery(req: Request, res: Response) {
    try {
      const response = await galleryService.deleteGallery(req.params.id);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.deleted,
        data: response
      });
    } catch (error: any) {
      console.error("Error Deleting Gallery:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while deleting the gallery image.",
        originalError: error.message || "An error occurred while deleting the gallery image."
      });
    }
  }
}

export default new GalleryController();
