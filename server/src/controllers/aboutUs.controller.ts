import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import aboutUsService from "../services/aboutUs.services";

class AboutUsController {
  async getAboutUs(req: Request, res: Response) {
    try {
      const response = await aboutUsService.getAboutUs();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error("Error fetching aboutUs section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the aboutUs section.",
        originalError: error.message || "An error occurred while fetching the aboutUs section.",
      });
    }
  }

  async createAboutUs(req: Request, res: Response) {
    try {
      const response = await aboutUsService.createAboutUs(req.body, req.file!);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: response,
      });
    } catch (error: any) {
      console.error("Error creating aboutUs section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while creating the aboutUs section.",
        originalError: error.message || "An error occurred while creating the aboutUs section.",
      });
    }
  }

  async updateAboutUs(req: Request, res: Response) {
    try {
      const response = await aboutUsService.updateAboutUs(req.body, req.file);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: response,
      });
    } catch (error: any) {
      console.error("Error updating aboutUs section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while updating the aboutUs section.",
        originalError: error.message || "An error occurred while updating the aboutUs section.",
      });
    }
  }
}

export default new AboutUsController();
