import { sendBookingConfirmationEmail } from '../utils/email';
import { IBookingInput } from '../dto/booking.dto';
import Booking from '../models/booking.model';
import HttpException from "../utils/HttpException.utils";
import fs from 'fs';
import path from 'path';

interface IPaginatedResult {
    data: IBookingInput[];
    total: number;
}

class BookingService {
    private readonly uploadDir = path.join(__dirname, '../../uploads');

    constructor() {
        // Ensure uploads directory exists
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    async createBooking(data: IBookingInput, file?: Express.Multer.File) {
        try {
            let idImagePath: string | undefined;
            if (file) {
                idImagePath = `/uploads/${file.filename}`;
            } else {
                throw HttpException.badRequest("No image file provided");
            }

            const bookingData = { ...data, idImage: idImagePath };
            const bookingResponse = await Booking.create(bookingData);
            console.log("Booking Created:", bookingResponse);
            return bookingResponse;
        } catch (error: any) {
            console.error("Service Error:", error);
            throw HttpException.badRequest(error?.message);
        }
    }

    async updateBooking(bookingId: string, data: Partial<IBookingInput>, file?: Express.Multer.File) {
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                throw HttpException.notFound("Booking not found");
            }

            // Handle file update
            if (file) {
                // Delete old image if it exists
                if (booking.idImage) {
                    const oldImagePath = path.join(__dirname, '../../', booking.idImage);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                // Update with new image path
                data.idImage = `/uploads/${file.filename}`;
            }

            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, data, { new: true });
            return updatedBooking;
        } catch (error: any) {
            console.error("Service Error:", error);
            throw HttpException.badRequest(error?.message);
        }
    }

    async getAllBookings(limit: number, offset: number, search: string) {
        try {
            const query: any = {};

            if (search) {
                query.name = { $regex: search, $options: 'i' };
            }

            const data = await Booking.find(query).skip(offset).limit(limit).exec();
            const total = await Booking.countDocuments(query).exec();

            return { data, total };
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async getBookingById(bookingId: string) {
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                throw HttpException.notFound("Booking not found");
            }
            return booking;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async deleteBooking(bookingId: string) {
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                throw HttpException.notFound("Booking not found");
            }

            // Delete associated image
            if (booking.idImage) {
                const imagePath = path.join(__dirname, '../../', booking.idImage);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            const deletedBooking = await Booking.findByIdAndDelete(bookingId);
            return deletedBooking;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async deleteBookingImage(bookingId: string) {
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                throw HttpException.notFound("Booking not found");
            }

            if (booking.idImage) {
                const imagePath = path.join(__dirname, '../../', booking.idImage);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
                booking.idImage = undefined;
                await booking.save();
            }

            return booking;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    async sendBookingEmail(data: {
        bookingId: string;
        name: string;
        email: string;
        roomNames: string;
        checkInDate: string;
        checkOutDate: string;
        numberOfRooms: number;
        roomPrice: number;
        totalPrice: number;
    }) {
        try {
            const booking = await Booking.findById(data.bookingId);
            if (!booking) {
                throw HttpException.notFound("Booking not found");
            }
            const emailResult = await sendBookingConfirmationEmail(data);
            return emailResult;
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
}

export default new BookingService();
