import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import HomeAboutUsService from "../services/homeAboutUs.services";

class HomeAboutUsController {
  async getAboutUs(req: Request, res: Response) {
    try {
      const response = await HomeAboutUsService.getAboutUs();
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
      const response = await HomeAboutUsService.createAboutUs(req.body);
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
      const response = await HomeAboutUsService.updateAboutUs(req.body);
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
}

export default new HomeAboutUsController();
