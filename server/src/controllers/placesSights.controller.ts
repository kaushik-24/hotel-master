import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import placesSightsServices from "../services/placesSights.services";

class PlacesSightsController {
  async getPlacesSights(req: Request, res: Response) {
    try {
      const response = await placesSightsServices.getPlacesSights();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error("Error fetching placessights section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the placessights section.",
        originalError: error.message || "An error occurred while fetching the placessights section.",
      });
    }
  }

  async createPlacesSights(req: Request, res: Response) {
    try {
      const response = await placesSightsServices.createPlacesSights(req.body, req.file!);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: response,
      });
    } catch (error: any) {
      console.error("Error creating placesSights section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while creating the placesSights section.",
        originalError: error.message || "An error occurred while creating the placesSights section.",
      });
    }
  }

  async updatePlacesSights(req: Request, res: Response) {
    try {
      const response = await placesSightsServices.updatePlacesSights(req.body, req.file);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: response,
      });
    } catch (error: any) {
      console.error("Error updating placesSights section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while updating the placesSights section.",
        originalError: error.message || "An error occurred while updating the placesSights section.",
      });
    }
  }
}

export default new PlacesSightsController();

