import { Request, Response } from "express";
import { Message } from "../constant/messages";
import { StatusCodes } from "../constant/statusCode";
import { CreateBookingDTO, UpdateBookingDTO } from "../dto/booking.dto";
import { IBookingInput } from "../interface/bookingInput.interface";
import bookingServices from "../services/booking.services";
import { getPagination, getPagingData, validatePagination } from "../utils/pagination";
import { IBooking } from "../interface/booking.interface";

class BookingController {
    async createBooking(req: Request, res: Response) {
        try {
            const dto: CreateBookingDTO = req.body;
            console.log('Incoming Data:', dto);

            let checkInDate: Date | undefined;
            if (dto.checkInDate) {
                checkInDate = new Date(dto.checkInDate);
                if (isNaN(checkInDate.getTime())) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Invalid Check In Date',
                    });
                }
            }

            let checkOutDate: Date | undefined;
            if (dto.checkOutDate) {
                checkOutDate = new Date(dto.checkOutDate);
                if (isNaN(checkOutDate.getTime())) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Invalid Check Out Date',
                    });
                }
            }

            let roomPrice = dto.roomPrice || 0;
            const totalPrice = roomPrice * dto.numberOfRoom;

            const bookingData: IBookingInput = {
                name: dto.name,
                email: dto.email,
                numberOfRoom: dto.numberOfRoom,
                rooms: dto.rooms,
                roomNames: dto.roomNames,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                idImage: dto.idImage,
                roomPrice,
                totalPrice,
            };

            const response: IBooking = await bookingServices.createBooking(bookingData, req.file);

            try {
                const emailResult = await bookingServices.sendBookingEmail({
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
                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: 'Booking created successfully and confirmation email sent',
                    data: response,
                    bookingId: response._id.toString(),
                });
            } catch (emailError: any) {
                console.error('Failed to send booking email:', emailError.message, emailError.stack);
                res.status(StatusCodes.CREATED).json({
                    success: true,
                    message: 'Booking created successfully, but failed to send confirmation email',
                    data: response,
                    bookingId: response._id.toString(),
                });
            }
        } catch (error: any) {
            console.error('Error Creating Booking:', error);
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || 'An error occurred',
            });
        }
    }

    async updateBooking(req: Request, res: Response) {
        try {
            const dto: UpdateBookingDTO = req.body;
            let checkInDate: Date | undefined;
            if (dto.checkInDate) {
                checkInDate = new Date(dto.checkInDate);
                if (isNaN(checkInDate.getTime())) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Invalid Check In Date',
                    });
                }
            }

            let checkOutDate: Date | undefined;
            if (dto.checkOutDate) {
                checkOutDate = new Date(dto.checkOutDate);
                if (isNaN(checkOutDate.getTime())) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: 'Invalid Check Out Date',
                    });
                }
            }

            let roomPrice = dto.roomPrice || 0;
            const totalPrice = roomPrice * (dto.numberOfRoom || 1);

            const bookingData: Partial<IBookingInput> = {
                name: dto.name,
                email: dto.email,
                numberOfRoom: dto.numberOfRoom,
                rooms: dto.rooms,
                roomNames: dto.roomNames,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                roomPrice,
                totalPrice,
            };

            const response = await bookingServices.updateBooking(req.params.bookingId, bookingData, req.file);

            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: 'Booking updated successfully',
                data: response,
            });
        } catch (error: any) {
            console.error('Error Updating Booking:', error);
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || 'An error occurred',
            });
        }
    }

    async getAllBookings(req: Request, res: Response) {
        try {
            const { page, perpage, search } = req.query;

            const [validatedPage, validatedPerpage] = validatePagination(
                page as string,
                perpage as string
            );

            const { limit, offset } = getPagination(validatedPage - 1, validatedPerpage);

            const { data, total } = await bookingServices.getAllBookings(limit, offset, search as string);

            const pagination = getPagingData(total, validatedPage, validatedPerpage);

            res.status(StatusCodes.SUCCESS).json({
                success: true,
                data,
                pagination
            });
        } catch (error: any) {
            console.error("Error Fetching Bookings:", error);
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred",
            });
        }
    }

    async getBookingById(req: Request, res: Response) {
        try {
            const response = await bookingServices.getBookingById(req.params.bookingId);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                data: response
            });
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred",
            });
        }
    }

    async deleteBooking(req: Request, res: Response) {
        try {
            const response = await bookingServices.deleteBooking(req.params.bookingId);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: Message.deleted,
                data: response
            });
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || "An error occurred",
            });
        }
    }

    async deleteBookingImage(req: Request, res: Response) {
        try {
            const response = await bookingServices.deleteBookingImage(req.params.bookingId);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: 'Booking image deleted successfully',
                data: response
            });
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.message || 'An error occurred',
            });
        }
    }
}

export default BookingController;
