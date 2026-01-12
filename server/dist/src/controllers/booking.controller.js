"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const booking_services_1 = __importDefault(require("../services/booking.services"));
const pagination_1 = require("../utils/pagination");
class BookingController {
    async createBooking(req, res) {
        try {
            const dto = req.body;
            console.log('Incoming Data:', dto);
            let checkInDate;
            if (dto.checkInDate) {
                checkInDate = new Date(dto.checkInDate);
                if (isNaN(checkInDate.getTime())) {
                    return res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Invalid Check In Date',
                    });
                }
            }
            let checkOutDate;
            if (dto.checkOutDate) {
                checkOutDate = new Date(dto.checkOutDate);
                if (isNaN(checkOutDate.getTime())) {
                    return res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Invalid Check Out Date',
                    });
                }
            }
            let roomPrice = dto.roomPrice || 0;
            const totalPrice = roomPrice * dto.numberOfRoom;
            const bookingData = {
                name: dto.name,
                email: dto.email,
                numberOfRoom: dto.numberOfRoom,
                rooms: dto.rooms,
                roomNames: dto.roomNames,
                checkInDate: dto.checkInDate || "",
                checkOutDate: dto.checkOutDate || "",
                idImage: dto.idImage,
                roomPrice,
                totalPrice,
            };
            const response = await booking_services_1.default.createBooking(bookingData, req.file);
            try {
                const emailResult = await booking_services_1.default.sendBookingEmail({
                    bookingId: response._id.toString(),
                    name: dto.name,
                    email: dto.email,
                    roomNames: dto.roomNames,
                    checkInDate: dto.checkInDate || '',
                    checkOutDate: dto.checkOutDate || '',
                    numberOfRooms: dto.numberOfRoom,
                    roomPrice,
                    totalPrice,
                });
                console.log('Email sent successfully:', emailResult);
                res.status(statusCode_1.StatusCodes.CREATED).json({
                    success: true,
                    message: 'Booking created successfully and confirmation email sent',
                    data: response,
                    bookingId: response._id.toString(),
                });
            }
            catch (emailError) {
                console.error('Failed to send booking email:', emailError.message, emailError.stack);
                res.status(statusCode_1.StatusCodes.CREATED).json({
                    success: true,
                    message: 'Booking created successfully, but failed to send confirmation email',
                    data: response,
                    bookingId: response._id.toString(),
                });
            }
        }
        catch (error) {
            console.error('Error Creating Booking:', error);
            res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || 'An error occurred',
            });
        }
    }
    async updateBooking(req, res) {
        try {
            const dto = req.body;
            let checkInDate;
            if (dto.checkInDate) {
                checkInDate = new Date(dto.checkInDate);
                if (isNaN(checkInDate.getTime())) {
                    return res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Invalid Check In Date',
                    });
                }
            }
            let checkOutDate;
            if (dto.checkOutDate) {
                checkOutDate = new Date(dto.checkOutDate);
                if (isNaN(checkOutDate.getTime())) {
                    return res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Invalid Check Out Date',
                    });
                }
            }
            let roomPrice = dto.roomPrice || 0;
            const totalPrice = roomPrice * (dto.numberOfRoom || 1);
            const bookingData = {
                name: dto.name,
                email: dto.email,
                numberOfRoom: dto.numberOfRoom,
                rooms: dto.rooms,
                roomNames: dto.roomNames,
                checkInDate: dto.checkInDate,
                checkOutDate: dto.checkOutDate,
                roomPrice,
                totalPrice,
            };
            const response = await booking_services_1.default.updateBooking(req.params.bookingId, bookingData, req.file);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: 'Booking updated successfully',
                data: response,
            });
        }
        catch (error) {
            console.error('Error Updating Booking:', error);
            res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || 'An error occurred',
            });
        }
    }
    async getAllBookings(req, res) {
        try {
            const { page, perpage, search } = req.query;
            const [validatedPage, validatedPerpage] = (0, pagination_1.validatePagination)(page, perpage);
            const { limit, offset } = (0, pagination_1.getPagination)(validatedPage - 1, validatedPerpage);
            const { data, total } = await booking_services_1.default.getAllBookings(limit, offset, search);
            const pagination = (0, pagination_1.getPagingData)(total, validatedPage, validatedPerpage);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                data,
                pagination
            });
        }
        catch (error) {
            console.error("Error Fetching Bookings:", error);
            res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred",
            });
        }
    }
    async getBookingById(req, res) {
        try {
            const response = await booking_services_1.default.getBookingById(req.params.bookingId);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                data: response
            });
        }
        catch (error) {
            res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred",
            });
        }
    }
    async deleteBooking(req, res) {
        try {
            const response = await booking_services_1.default.deleteBooking(req.params.bookingId);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: messages_1.Message.deleted,
                data: response
            });
        }
        catch (error) {
            res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred",
            });
        }
    }
    async deleteBookingImage(req, res) {
        try {
            const response = await booking_services_1.default.deleteBookingImage(req.params.bookingId);
            res.status(statusCode_1.StatusCodes.SUCCESS).json({
                success: true,
                message: 'Booking image deleted successfully',
                data: response
            });
        }
        catch (error) {
            res.status(statusCode_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || 'An error occurred',
            });
        }
    }
}
exports.default = BookingController;
