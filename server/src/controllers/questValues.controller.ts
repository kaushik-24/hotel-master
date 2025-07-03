import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import questAndValuesService from "../services/questValues.services";

class QuestAndValuesController {
  async getQuestAndValues(req: Request, res: Response) {
    try {
      const response = await questAndValuesService.getQuestAndValues();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error("Error fetching Quest and Values data:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the Quest and Values data.",
        originalError: error.message || "An error occurred while fetching the Quest and Values data.",
      });
    }
  }
    async createQuestAndValues(req: Request, res: Response) {
  try {
    const { questAndVision, coreValues } = req.body;
    console.log("Request body:", req.body); // Debug log
    const response = await questAndValuesService.createQuestAndValues({
      questAndVision,
      coreValues,
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: Message.created,
      data: response,
    });
  } catch (error: any) {
    console.error("Error creating Quest and Values data:", error);
    res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message || "An error occurred while creating the Quest and Values data.",
      originalError: error.message || "An error occurred while creating the Quest and Values data.",
    });
  }
}

async updateQuestAndValues(req: Request, res: Response) {
  try {
    const { questAndVision, coreValues } = req.body;
    console.log("Request body:", req.body); // Debug log
    const response = await questAndValuesService.updateQuestAndValues({
      questAndVision,
      coreValues,
    });
    res.status(StatusCodes.SUCCESS).json({
      success: true,
      message: Message.updated,
      data: response,
    });
  } catch (error: any) {
    console.error("Error updating Quest and Values data:", error);
    res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message || "An error occurred while updating the Quest and Values data.",
      originalError: error.message || "An error occurred while updating the Quest and Values data.",
    });
  }
}

}

export default new QuestAndValuesController();
