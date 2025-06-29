import { sendBookingConfirmationEmail } from '../utils/email';
import { IBookingInput } from '../dto/booking.dto';
import Booking from '../models/booking.model';
import HttpException from "../utils/HttpException.utils";
import fs from 'fs';
import path from 'path';
import Room from '../models/room.model';
import RoomType from '../models/roomType.model';
import { Types } from 'mongoose';

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
    private async assignRandomRooms(roomTypeId: string, roomNames: string, numberOfRooms: number): Promise<string[]> {
        // Validate roomTypeId is a valid ObjectId
        if (!Types.ObjectId.isValid(roomTypeId)) {
            console.error(`Invalid ObjectId format for roomTypeId: ${roomTypeId}`);
            throw HttpException.badRequest(`Invalid room type ID format: ${roomTypeId}`);
        }

        // Validate roomType exists
        const roomType = await RoomType.findById(roomTypeId);
        if (!roomType) {
            console.error(`RoomType not found for ID: ${roomTypeId}`);
            throw HttpException.badRequest(`Room type not found: ${roomTypeId}`);
        }

        console.log(`Processing roomTypeId: ${roomTypeId}, Room Type Name: ${roomType.name}, Requested Rooms: ${numberOfRooms}`);

        // Check for rooms with invalid roomType values
        const invalidRooms = await Room.find({ roomType: { $not: { $type: "objectId" } } });
        if (invalidRooms.length > 0) {
            console.warn(`Found rooms with invalid roomType values:`, invalidRooms.map(r => ({ roomNumber: r.roomNumber, roomType: r.roomType })));
        }

        // Fetch available rooms for the given room type
        const availableRooms = await Room.find({
            roomType: roomNames,
            isAvailable: true,
        }).select('roomNumber');

        console.log(`Available rooms for roomType ${roomTypeId} (${roomType.name}):`, availableRooms.map(r => r.roomNumber));

        if (availableRooms.length === 0) {
            throw HttpException.badRequest(`No rooms available for room type "${roomType.name}" (ID: ${roomTypeId})`);
        }

        if (availableRooms.length < numberOfRooms) {
            throw HttpException.badRequest(`Only ${availableRooms.length} rooms available for "${roomType.name}" (ID: ${roomTypeId}), but ${numberOfRooms} requested`);
        }

        // Shuffle and select required number of rooms
        const shuffled = availableRooms.sort(() => 0.5 - Math.random());
        const assignedRooms = shuffled.slice(0, numberOfRooms).map(room => room.roomNumber);

        // Mark rooms as unavailable
        await Room.updateMany(
            { roomType: roomNames, roomNumber: { $in: assignedRooms } },
            { $set: { isAvailable: false } }
        );

        console.log(`Assigned rooms for roomType ${roomTypeId} (${roomType.name}):`, assignedRooms);

        return assignedRooms;
    }
    
     async checkOutBooking(bookingId: string) {
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                throw HttpException.notFound("Booking not found");
            }

            // Mark assigned rooms as available
            await Room.updateMany(
                { roomType: booking.roomNames, roomNumber: { $in: booking.assignedRoomNumbers } },
                { $set: { isAvailable: true } }
            );

            // Optionally delete the booking
            await Booking.findByIdAndDelete(bookingId);

            console.log(`Booking ${bookingId} checked out successfully, rooms marked available: ${booking.assignedRoomNumbers}`);
            return { message: "Booking checked out successfully" };
        } catch (error: any) {
            console.error("Check-out Error:", error.message, error.stack);
            throw HttpException.badRequest(error?.message || "Failed to check out booking");
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

             const roomType = await RoomType.findById(data.rooms);
            if (!roomType) throw HttpException.notFound("Room type not found");

            const assignedRoomNumbers = await this.assignRandomRooms(data.rooms, data.roomNames, data.numberOfRoom);

            const bookingData = { ...data, idImage: idImagePath, assignedRoomNumbers };
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
