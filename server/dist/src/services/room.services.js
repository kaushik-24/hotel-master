"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_model_1 = __importDefault(require("../models/room.model"));
const roomType_model_1 = __importDefault(require("../models/roomType.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const mongoose_1 = __importDefault(require("mongoose"));
const roomType_services_1 = __importDefault(require("./roomType.services"));
class RoomService {
    async createRoom(data) {
        try {
            // Validate roomType is a valid ObjectId
            if (!mongoose_1.default.Types.ObjectId.isValid(data.roomType)) {
                throw HttpException_utils_1.default.badRequest("Invalid room type ID format");
            }
            const existingRoom = await room_model_1.default.findOne({ roomNumber: data.roomNumber });
            if (existingRoom) {
                throw HttpException_utils_1.default.badRequest("Room number already exists");
            }
            const roomTypeDoc = await roomType_model_1.default.findById(data.roomType);
            if (!roomTypeDoc || !roomTypeDoc.name) {
                throw HttpException_utils_1.default.badRequest("Room type not found or missing name");
            }
            const room = await room_model_1.default.create({
                roomNumber: data.roomNumber,
                roomType: data.roomType,
                roomTypeName: roomTypeDoc.name,
                floor: data.floor,
                isAvailable: true,
            });
            console.log(`Created room with roomType: ${data.roomType}, roomTypeName: ${roomTypeDoc.name}`); // Debug log
            await roomType_services_1.default.updateRoomTypeDiscount(data.roomType);
            return room.toObject();
        }
        catch (error) {
            console.error(`Error creating room: ${error.message}`, { roomType: data.roomType });
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getRoomById(id) {
        try {
            const room = await room_model_1.default.findById(id).populate('roomType', 'name');
            if (!room) {
                throw HttpException_utils_1.default.notFound("Room not found");
            }
            const roomObj = room.toObject();
            return {
                ...roomObj,
                roomTypeName: roomObj.roomTypeName || roomObj.roomType?.name || "",
            };
        }
        catch (error) {
            console.error(`Error fetching room ${id}:`, error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getAllRooms() {
        try {
            const rooms = await room_model_1.default.find().populate('roomType', 'name');
            return rooms.map((room) => {
                const roomObj = room.toObject();
                return {
                    ...roomObj,
                    roomTypeName: roomObj.roomTypeName || roomObj.roomType?.name || "",
                };
            });
        }
        catch (error) {
            console.error("Error fetching all rooms:", error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async editRoom(id, data) {
        try {
            const existingRoom = await room_model_1.default.findById(id);
            if (!existingRoom) {
                throw HttpException_utils_1.default.notFound("Room not found");
            }
            if (data.roomNumber && data.roomNumber !== existingRoom.roomNumber) {
                const roomNumberExists = await room_model_1.default.findOne({ roomNumber: data.roomNumber });
                if (roomNumberExists) {
                    throw HttpException_utils_1.default.badRequest("Room number already exists");
                }
            }
            let roomTypeName;
            let roomTypeId = existingRoom.roomType.toString();
            if (data.roomType) {
                if (!mongoose_1.default.Types.ObjectId.isValid(data.roomType)) {
                    throw HttpException_utils_1.default.badRequest("Invalid room type ID format");
                }
                const roomTypeDoc = await roomType_model_1.default.findById(data.roomType);
                if (!roomTypeDoc || !roomTypeDoc.name) {
                    throw HttpException_utils_1.default.badRequest("Room type not found or missing name");
                }
                roomTypeName = roomTypeDoc.name;
                roomTypeId = data.roomType;
            }
            const updateData = {
                ...data,
                ...(roomTypeName && { roomTypeName }),
            };
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedRoom = await room_model_1.default.findByIdAndUpdate(id, updateData, { new: true }).populate('roomType', 'name');
            if (!updatedRoom) {
                throw HttpException_utils_1.default.notFound("Room not found");
            }
            await roomType_services_1.default.updateRoomTypeDiscount(roomTypeId);
            const roomObj = updatedRoom.toObject();
            console.log(`Updated room ${id} with roomType: ${roomTypeId}, roomTypeName: ${roomObj.roomTypeName}`); // Debug log
            return {
                ...roomObj,
                roomTypeName: roomObj.roomTypeName || roomObj.roomType?.name || "",
            };
        }
        catch (error) {
            console.error(`Error editing room ${id}:`, error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async deleteRoom(id) {
        try {
            const room = await room_model_1.default.findById(id);
            if (!room) {
                throw HttpException_utils_1.default.notFound("Room not found");
            }
            const roomTypeId = room.roomType._id?.toString() || room.roomType.toString();
            await room_model_1.default.findByIdAndDelete(id);
            await roomType_services_1.default.updateRoomTypeDiscount(roomTypeId);
            return { message: "Room deleted successfully" };
        }
        catch (error) {
            console.error(`Error deleting room ${id}:`, error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new RoomService();
