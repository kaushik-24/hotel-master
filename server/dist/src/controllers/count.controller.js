"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../constant/messages");
const statusCode_1 = require("../constant/statusCode");
const booking_model_1 = __importDefault(require("../models/booking.model"));
const roomType_model_1 = __importDefault(require("../models/roomType.model"));
const otherPage_model_1 = __importDefault(require("../models/otherPage.model"));
const room_model_1 = __importDefault(require("../models/room.model"));
const hall_model_1 = __importDefault(require("../models/hall.model"));
const hallNumber_model_1 = __importDefault(require("../models/hallNumber.model"));
class CountController {
    async getDashboardStats(req, res) {
        try {
            const bookingsCount = await booking_model_1.default.countDocuments();
            const roomsCount = await roomType_model_1.default.countDocuments();
            const pagesCount = await otherPage_model_1.default.countDocuments();
            const rooms = await room_model_1.default.find()
                .select('roomNumber roomType roomTypeName isAvailable')
                .populate('roomType', 'name')
                .lean();
            const halls = await hallNumber_model_1.default.find().select('hallNumber hallType').lean();
            const hallsCount = await hall_model_1.default.countDocuments();
            // Debug log for raw room data
            console.log('Raw rooms from DB:', rooms);
            // Ensure isAvailable is a boolean
            const formattedRooms = rooms.map(room => ({
                ...room,
                isAvailable: room.isAvailable !== undefined ? Boolean(room.isAvailable) : true, // Default to true if undefined
            }));
            console.log('Formatted rooms:', formattedRooms); // Debug log
            res.status(statusCode_1.StatusCodes.SUCCESS || 200).json({
                status: true,
                data: {
                    bookings: bookingsCount,
                    rooms: roomsCount,
                    pages: pagesCount,
                    roomsList: formattedRooms,
                    halls: hallsCount,
                    hallsList: halls,
                },
                message: messages_1.Message.fetched,
            });
        }
        catch (error) {
            console.error('Error Fetching Dashboard Stats:', error);
            res.status(statusCode_1.StatusCodes.BAD_REQUEST || 400).json({
                status: false,
                message: error.message || 'An error occurred while fetching dashboard stats.',
            });
        }
    }
}
exports.default = CountController;
