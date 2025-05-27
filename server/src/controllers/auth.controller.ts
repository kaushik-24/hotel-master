import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import authServices from "../services/auth.services";

class AuthController {

    async createUser(req: Request, res: Response) {
        const { name, email, phoneNumber, password } = req.body;

        if (!name || name.length < 2) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Name must be at least 5 characters long",
            });
        }

        if (!email || !email.includes("@")) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid email address",
            });
        }

        if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Enter a valid phone number",
            });
        }

        // No need to validate password here, it's handled in the model
        try {
            const response = await authServices.createUser(req.body);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: Message.created,
                data: response
            });
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred while creating the user."
            });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !email.includes("@")) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid email address",
            });
        }

        // No need to validate password here, it's handled in the service
        try {
            const response = await authServices.loginUser(req.body);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.loginSuccessfully,
                data: response
            });
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred during login."
            });
        }
    }
}

export default AuthController;
