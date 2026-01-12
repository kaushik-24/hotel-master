"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_1 = require("../utils/email");
const booking_model_1 = __importDefault(require("../models/booking.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const room_model_1 = __importDefault(require("../models/room.model"));
const roomType_model_1 = __importDefault(require("../models/roomType.model"));
const mongoose_1 = require("mongoose");
class BookingService {
    constructor() {
        this.uploadDir = path_1.default.join(__dirname, '../../Uploads');
        // Ensure uploads directory exists
        if (!fs_1.default.existsSync(this.uploadDir)) {
            fs_1.default.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async assignRandomRooms(roomTypeId, roomNames, numberOfRooms) {
        // Validate roomTypeId is a valid ObjectId
        if (!mongoose_1.Types.ObjectId.isValid(roomTypeId)) {
            console.error(`Invalid ObjectId format for roomTypeId: ${roomTypeId}`);
            throw HttpException_utils_1.default.badRequest(`Invalid room type ID format: ${roomTypeId}`);
        }
        // Validate roomType exists
        const roomType = await roomType_model_1.default.findById(roomTypeId);
        if (!roomType) {
            console.error(`RoomType not found for ID: ${roomTypeId}`);
            throw HttpException_utils_1.default.badRequest(`Room type not found: ${roomTypeId}`);
        }
        console.log(`Processing roomTypeId: ${roomTypeId}, Room Type Name: ${roomType.name}, Requested Rooms: ${numberOfRooms}`);
        // Check for rooms with invalid roomType values
        const invalidRooms = await room_model_1.default.find({ roomType: { $not: { $type: "objectId" } } });
        if (invalidRooms.length > 0) {
            console.warn(`Found rooms with invalid roomType values:`, invalidRooms.map(r => ({ roomNumber: r.roomNumber, roomType: r.roomType })));
        }
        // Fetch available rooms for the given room type
        const availableRooms = await room_model_1.default.find({
            roomType: roomTypeId, // Use roomTypeId instead of roomNames
            isAvailable: true,
        }).select('roomNumber');
        console.log(`Available rooms for roomType ${roomTypeId} (${roomType.name}):`, availableRooms.map(r => r.roomNumber));
        if (availableRooms.length === 0) {
            throw HttpException_utils_1.default.badRequest(`No rooms available for room type "${roomType.name}" (ID: ${roomTypeId})`);
        }
        if (availableRooms.length < numberOfRooms) {
            throw HttpException_utils_1.default.badRequest(`Only ${availableRooms.length} rooms available for "${roomType.name}" (ID: ${roomTypeId}), but ${numberOfRooms} requested`);
        }
        // Shuffle and select required number of rooms
        const shuffled = availableRooms.sort(() => 0.5 - Math.random());
        const assignedRooms = shuffled.slice(0, numberOfRooms).map(room => room.roomNumber);
        // Mark rooms as unavailable
        await room_model_1.default.updateMany({ roomType: roomTypeId, roomNumber: { $in: assignedRooms } }, // Use roomTypeId
        { $set: { isAvailable: false } });
        console.log(`Assigned rooms for roomType ${roomTypeId} (${roomType.name}):`, assignedRooms);
        return assignedRooms;
    }
    async checkOutBooking(bookingId) {
        try {
            const booking = await booking_model_1.default.findById(bookingId);
            if (!booking) {
                throw HttpException_utils_1.default.notFound("Booking not found");
            }
            // Mark assigned rooms as available
            await room_model_1.default.updateMany({ roomType: booking.rooms, roomNumber: { $in: booking.assignedRoomNumbers } }, // Use rooms (RoomType._id)
            { $set: { isAvailable: true } });
            // Optionally delete the booking
            await booking_model_1.default.findByIdAndDelete(bookingId);
            console.log(`Booking ${bookingId} checked out successfully, rooms marked available: ${booking.assignedRoomNumbers}`);
            return { message: "Booking checked out successfully" };
        }
        catch (error) {
            console.error("Check-out Error:", error.message, error.stack);
            throw HttpException_utils_1.default.badRequest(error?.message || "Failed to check out booking");
        }
    }
    async createBooking(data, file) {
        try {
            let idImagePath;
            if (file) {
                idImagePath = `/Uploads/${file.filename}`;
            }
            else {
                throw HttpException_utils_1.default.badRequest("No image file provided");
            }
            const roomType = await roomType_model_1.default.findById(data.rooms);
            if (!roomType)
                throw HttpException_utils_1.default.notFound("Room type not found");
            const assignedRoomNumbers = await this.assignRandomRooms(data.rooms, data.roomNames, data.numberOfRoom);
            const bookingData = { ...data, idImage: idImagePath, assignedRoomNumbers };
            const bookingResponse = await booking_model_1.default.create(bookingData);
            console.log("Booking Created:", bookingResponse);
            // Send confirmation email
            await this.sendBookingEmail({
                bookingId: bookingResponse._id.toString(),
                name: data.name,
                email: data.email,
                roomNames: data.roomNames,
                checkInDate: data.checkInDate,
                checkOutDate: data.checkOutDate,
                numberOfRooms: data.numberOfRoom,
                roomPrice: roomType.price, // Use actual RoomType price
                totalPrice: data.totalPrice,
            });
            return bookingResponse;
        }
        catch (error) {
            console.error("Service Error:", error);
            throw HttpException_utils_1.default.badRequest(error?.message);
        }
    }
    async updateBooking(bookingId, data, file) {
        try {
            const booking = await booking_model_1.default.findById(bookingId);
            if (!booking) {
                throw HttpException_utils_1.default.notFound("Booking not found");
            }
            // Handle file update
            if (file) {
                // Delete old image if it exists
                if (booking.idImage) {
                    const oldImagePath = path_1.default.join(__dirname, '../../', booking.idImage);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                // Update with new image path
                data.idImage = `/Uploads/${file.filename}`;
            }
            const updatedBooking = await booking_model_1.default.findByIdAndUpdate(bookingId, data, { new: true });
            return updatedBooking;
        }
        catch (error) {
            console.error("Service Error:", error);
            throw HttpException_utils_1.default.badRequest(error?.message);
        }
    }
    async getAllBookings(limit, offset, search) {
        try {
            const query = {};
            if (search) {
                query.name = { $regex: search, $options: 'i' };
            }
            const data = await booking_model_1.default.find(query).skip(offset).limit(limit).exec();
            const total = await booking_model_1.default.countDocuments(query).exec();
            return { data, total };
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error?.message);
        }
    }
    async getBookingById(bookingId) {
        try {
            const booking = await booking_model_1.default.findById(bookingId);
            if (!booking) {
                throw HttpException_utils_1.default.notFound("Booking not found");
            }
            return booking;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error?.message);
        }
    }
    async deleteBooking(bookingId) {
        try {
            const booking = await booking_model_1.default.findById(bookingId);
            if (!booking) {
                throw HttpException_utils_1.default.notFound("Booking not found");
            }
            // Delete associated image
            if (booking.idImage) {
                const imagePath = path_1.default.join(__dirname, '../../', booking.idImage);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            const deletedBooking = await booking_model_1.default.findByIdAndDelete(bookingId);
            return deletedBooking;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error?.message);
        }
    }
    async deleteBookingImage(bookingId) {
        try {
            const booking = await booking_model_1.default.findById(bookingId);
            if (!booking) {
                throw HttpException_utils_1.default.notFound("Booking not found");
            }
            if (booking.idImage) {
                const imagePath = path_1.default.join(__dirname, '../../', booking.idImage);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
                booking.idImage = undefined;
                await booking.save();
            }
            return booking;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error?.message);
        }
    }
    async sendBookingEmail(data) {
        try {
            const booking = await booking_model_1.default.findById(data.bookingId);
            if (!booking) {
                throw HttpException_utils_1.default.notFound("Booking not found");
            }
            const emailResult = await (0, email_1.sendBookingConfirmationEmail)(data);
            return emailResult;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new BookingService();
