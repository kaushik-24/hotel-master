import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import AboutUsService from "../services/aboutUs.services";

class AboutUsController {
  async getAboutUs(req: Request, res: Response) {
    try {
      const response = await AboutUsService.getAboutUs();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error("Error fetching About Us section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the About Us section.",
        originalError: error.message || "An error occurred while fetching the About Us section.",
      });
    }
  }

  async createAboutUs(req: Request, res: Response) {
    try {
      const { subtitle, heading, subheading, description1, image } = req.body;
      const data = { subtitle, heading, subheading, description1, image };

      const response = await AboutUsService.createAboutUs(data, req.file);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: response,
      });
    } catch (error: any) {
      console.error("Error creating About Us section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while creating the About Us section.",
        originalError: error.message || "An error occurred while creating the About Us section.",
      });
    }
  }

  async updateAboutUs(req: Request, res: Response) {
    try {
      const { subtitle, heading, subheading, description1, image } = req.body;
      const data = { subtitle, heading, subheading, description1, image };

      const response = await AboutUsService.updateAboutUs(data, req.file);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: response,
      });
    } catch (error: any) {
      console.error("Error updating About Us section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while updating the About Us section.",
        originalError: error.message || "An error occurred while updating the About Us section.",
      });
    }
  }

  async deleteAboutUs(req: Request, res: Response) {
    try {
      const response = await AboutUsService.deleteAboutUs();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.deleted,
        data: response,
      });
    } catch (error: any) {
      console.error("Error deleting About Us section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while deleting the About Us section.",
        originalError: error.message || "An error occurred while deleting the About Us section.",
      });
    }
  }
}

export default new AboutUsController();
