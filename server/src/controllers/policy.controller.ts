import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import policyService from "../services/policy.services";

class PolicyController {
  async getAllPolicies(req: Request, res: Response) {
    try {
      const response = await policyService.getAllPolicies();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response
      });
    } catch (error: any) {
      console.error("Error Fetching Policies:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the policies.",
        originalError: error.message || "An error occurred while fetching the policies."
      });
    }
  }

  async getPolicyById(req: Request, res: Response) {
    try {
      const response = await policyService.getPolicyById(req.params.id);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response
      });
    } catch (error: any) {
      console.error("Error Fetching policy by ID:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the policy.",
        originalError: error.message || "An error occurred while fetching the policy."
      });
    }
  }

  async createPolicy(req: Request, res: Response) {
    try {
      const response = await policyService.createPolicy(req.body, req.file);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: response
      });
    } catch (error: any) {
      console.error("Error Creating Policy:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while creating the policy.",
        originalError: error.message || "An error occurred while creating the policy."
      });
    }
  }

  async editPolicy(req: Request, res: Response) {
    try {
      const response = await policyService.editPolicy(req.params.id, req.body, req.file);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: response
      });
    } catch (error: any) {
      console.error("Error Editing Policy:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while editing the policy.",
        originalError: error.message || "An error occurred while editing the policy."
      });
    }
  }

  async getPolicyBySlug(req: Request, res: Response) {
    try {
      const response = await policyService.getPolicyBySlug(req.params.slug);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response
      });
    } catch (error: any) {
      console.error("Error Fetching policy by Slug:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while fetching the policy.",
        originalError: error.message || "An error occurred while fetching the policy."
      });
    }
  }

  async deletePolicy(req: Request, res: Response) {
    try {
      const response = await policyService.deletePolicy(req.params.id);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.deleted,
        data: response
      });
    } catch (error: any) {
      console.error("Error Deleting policy:", error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || "An error occurred while deleting the policy.",
        originalError: error.message || "An error occurred while deleting the policy."
      });
    }
  }
}

export default new PolicyController();
