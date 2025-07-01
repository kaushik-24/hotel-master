import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import contactService from "../services/contact.services";
import HttpException from "../utils/HttpException.utils";

class ContactController {
  async getContact(req: Request, res: Response) {
    try {
      const response = await contactService.getContact();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error("Error fetching contact section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the contact section.",
        originalError: error.message || "An error occurred while fetching the contact section.",
      });
    }
  }

  async createContact(req: Request, res: Response) {
    try {
      const { address, email, phoneNumber } = req.body;
      let parsedPhoneNumber: string[] = [];
      if (phoneNumber) {
        parsedPhoneNumber = typeof phoneNumber === "string" ? JSON.parse(phoneNumber) : phoneNumber;
        if (!Array.isArray(parsedPhoneNumber)) {
          throw HttpException.badRequest("Phone number must be an array of strings");
        }
      }
      const response = await contactService.createContact(
        { address, email, phoneNumber: parsedPhoneNumber },
        req.file!
      );
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: response,
      });
    } catch (error: any) {
      console.error("Error creating contact section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while creating the contact section.",
        originalError: error.message || "An error occurred while creating the contact section.",
      });
    }
  }

  async updateContact(req: Request, res: Response) {
    try {
      const { address, email, phoneNumber } = req.body;
      let parsedPhoneNumber: string[] | undefined;
      if (phoneNumber) {
        parsedPhoneNumber = typeof phoneNumber === "string" ? JSON.parse(phoneNumber) : phoneNumber;
        if (!Array.isArray(parsedPhoneNumber)) {
          throw HttpException.badRequest("Phone number must be an array of strings");
        }
      }
      const response = await contactService.updateContact(
        { address, email, phoneNumber: parsedPhoneNumber },
        req.file
      );
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: response,
      });
    } catch (error: any) {
      console.error("Error updating contact section:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while updating the contact section.",
        originalError: error.message || "An error occurred while updating the contact section.",
      });
    }
  }
}

export default new ContactController();
