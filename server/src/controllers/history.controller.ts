import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import historyService from "../services/history.services";

class HistoryController {
  async getHistory(req: Request, res: Response) {
    try {
      const response = await historyService.getHistory();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error("Error fetching history section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the history section.",
        originalError: error.message || "An error occurred while fetching the history section.",
      });
    }
  }

  async createHistory(req: Request, res: Response) {
    try {
      const { title, mainDescription, sections } = req.body;
      const files = req.files as Express.Multer.File[];
      const response = await historyService.createHistory({ title, mainDescription, sections: JSON.parse(sections) }, files);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: response,
      });
    } catch (error: any) {
      console.error("Error creating history section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while creating the history section.",
        originalError: error.message || "An error occurred while creating the history section.",
      });
    }
  }

  async updateHistory(req: Request, res: Response) {
    try {
      const { title, mainDescription, sections } = req.body;
      const files = req.files as Express.Multer.File[];
      const response = await historyService.updateHistory(
        { title, mainDescription, sections: sections ? JSON.parse(sections) : undefined },
        files
      );
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: response,
      });
    } catch (error: any) {
      console.error("Error updating history section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while updating the history section.",
        originalError: error.message || "An error occurred while updating the history section.",
      });
    }
  }
}

export default new HistoryController();
