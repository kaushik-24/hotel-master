// src/services/booking.services.ts

import { sendBookingConfirmationEmail } from '../utils/email';
import { IBookingInput } from '../interface/bookingInput.interface';
import Booking from '../models/booking.model';
import HttpException from "../utils/HttpException.utils";

interface IPaginatedResult {
    data: IBookingInput[];
    total: number;
}

class BookingService {
    async createBooking(data: IBookingInput) {
        try {
            console.log("Service Received Data:", data);

            const bookingResponse = await Booking.create(data);
            console.log("Booking Created:", bookingResponse);
            return bookingResponse;
        } catch (error: any) {
            console.error("Service Error:", error);
            throw HttpException.badRequest(error?.message);
        }
    }

    async getAllBookings(limit: number, offset: number, search: string): Promise<IPaginatedResult> {
        try {
            const query: any = {};

            if (search) {
                // Adjust the search field as per your schema
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
            const booking = await Booking.findByIdAndDelete(bookingId);
            if (!booking) {
                throw HttpException.notFound("Booking not found");
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
    roomName: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfRooms: number;
    roomPrice: number;
    totalPrice: number;
  }) {
    try {
      // Verify booking exists
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
