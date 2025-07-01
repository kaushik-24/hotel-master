import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import LocationService from "../services/location.services";

class LocationController {
  async getLocation(req: Request, res: Response) {
    try {
      const response = await LocationService.getLocation();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error("Error fetching Location section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the Location section.",
        originalError: error.message || "An error occurred while fetching the Location section.",
      });
    }
  }

  async createLocation(req: Request, res: Response) {
    try {
      const response = await LocationService.createLocation(req.body);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: response,
      });
    } catch (error: any) {
      console.error("Error creating Location section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while creating the Location section.",
        originalError: error.message || "An error occurred while creating the Location section.",
      });
    }
  }

  async updateLocation(req: Request, res: Response) {
    try {
      const response = await LocationService.updateLocation(req.body);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: response,
      });
    } catch (error: any) {
      console.error("Error updating Location section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while updating the Location section.",
        originalError: error.message || "An error occurred while updating the Location section.",
      });
    }
  }
}

export default new LocationController();
