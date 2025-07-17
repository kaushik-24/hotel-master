import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import hotelLogoServices from "../services/hotelLogo.services";

class HotelLogoController {
  async getHero(req: Request, res: Response) {
    try {
      const response = await hotelLogoServices.getHero();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error("Error fetching hero section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the hero section.",
        originalError: error.message || "An error occurred while fetching the hero section.",
      });
    }
  }

  async createHero(req: Request, res: Response) {
    try {
      const response = await hotelLogoServices.createHero(req.file!);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: response,
      });
    } catch (error: any) {
      console.error("Error creating hero section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while creating the hero section.",
        originalError: error.message || "An error occurred while creating the hero section.",
      });
    }
  }

  async updateHero(req: Request, res: Response) {
    try {
      const response = await hotelLogoServices.updateHero(req.body, req.file);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: response,
      });
    } catch (error: any) {
      console.error("Error updating hero section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while updating the hero section.",
        originalError: error.message || "An error occurred while updating the hero section.",
      });
    }
  }
}

export default new HotelLogoController();

