import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import Accommodation from "../models/accommodation.model";

class AccommodationController {
  async getAccommodation(req: Request, res: Response) {
    try {
      const accommodation = await Accommodation.findOne();
      if (!accommodation) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Accommodation section not found",
        });
        return;
      }
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: accommodation.toObject(),
      });
    } catch (error: any) {
      console.error("Error fetching Accommodation section:", error);
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "An error occurred while fetching the Accommodation section.",
        originalError: error.message,
      });
    }
  }

  async createAccommodation(req: Request, res: Response) {
    try {
      const { heading } = req.body;
      if (!heading) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Heading is required",
        });
        return;
      }

      const existingAccommodation = await Accommodation.findOne();
      if (existingAccommodation) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Accommodation section already exists. Please use update instead.",
        });
        return;
      }

      const newAccommodation = await Accommodation.create({ heading });
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: newAccommodation.toObject(),
      });
    } catch (error: any) {
      console.error("Error creating Accommodation section:", error);
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "An error occurred while creating the Accommodation section.",
        originalError: error.message,
      });
    }
  }

  async updateAccommodation(req: Request, res: Response) {
    try {
      const { heading } = req.body;
      if (!heading) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Heading is required",
        });
        return;
      }

      const existingAccommodation = await Accommodation.findOne();
      if (!existingAccommodation) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Accommodation section not found",
        });
        return;
      }

      const updatedAccommodation = await Accommodation.findOneAndUpdate(
        {},
        { heading },
        { new: true }
      );
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: updatedAccommodation?.toObject(),
      });
    } catch (error: any) {
      console.error("Error updating Accommodation section:", error);
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "An error occurred while updating the Accommodation section.",
        originalError: error.message,
      });
    }
  }
}

export default new AccommodationController();
