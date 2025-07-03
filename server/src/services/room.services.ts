import Room from "../models/room.model";
import RoomType from "../models/roomType.model";
import HttpException from "../utils/HttpException.utils";
import mongoose from "mongoose";
import roomTypeService from "./roomType.services";

class RoomService {
  async createRoom(data: { roomNumber: string; roomType: string; floor: string }) {
    try {
      // Validate roomType is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(data.roomType)) {
        throw HttpException.badRequest("Invalid room type ID format");
      }
      const existingRoom = await Room.findOne({ roomNumber: data.roomNumber });
      if (existingRoom) {
        throw HttpException.badRequest("Room number already exists");
      }
      const roomTypeDoc = await RoomType.findById(data.roomType);
      if (!roomTypeDoc || !roomTypeDoc.name) {
        throw HttpException.badRequest("Room type not found or missing name");
      }
      const room = await Room.create({
        roomNumber: data.roomNumber,
        roomType: data.roomType,
        roomTypeName: roomTypeDoc.name,
        floor: data.floor,
        isAvailable: true,
      });
      console.log(`Created room with roomType: ${data.roomType}, roomTypeName: ${roomTypeDoc.name}`); // Debug log
      await roomTypeService.updateRoomTypeDiscount(data.roomType);
      return room.toObject();
    } catch (error: any) {
      console.error(`Error creating room: ${error.message}`, { roomType: data.roomType });
      throw HttpException.badRequest(error.message);
    }
  }

  async getRoomById(id: string) {
    try {
      const room = await Room.findById(id).populate<{ roomType: { _id: string; name: string } }>('roomType', 'name');
      if (!room) {
        throw HttpException.notFound("Room not found");
      }
      const roomObj = room.toObject();
      return {
        ...roomObj,
        roomTypeName: roomObj.roomTypeName || roomObj.roomType?.name || "",
      };
    } catch (error: any) {
      console.error(`Error fetching room ${id}:`, error);
      throw HttpException.badRequest(error.message);
    }
  }

  async getAllRooms() {
    try {
      const rooms = await Room.find().populate<{ roomType: { _id: string; name: string } }>('roomType', 'name');
      return rooms.map((room) => {
        const roomObj = room.toObject();
        return {
          ...roomObj,
          roomTypeName: roomObj.roomTypeName || roomObj.roomType?.name || "",
        };
      });
    } catch (error: any) {
      console.error("Error fetching all rooms:", error);
      throw HttpException.badRequest(error.message);
    }
  }

  async editRoom(id: string, data: { roomNumber?: string; roomType?: string; floor?: string }) {
    try {
      const existingRoom = await Room.findById(id);
      if (!existingRoom) {
        throw HttpException.notFound("Room not found");
      }
      if (data.roomNumber && data.roomNumber !== existingRoom.roomNumber) {
        const roomNumberExists = await Room.findOne({ roomNumber: data.roomNumber });
        if (roomNumberExists) {
          throw HttpException.badRequest("Room number already exists");
        }
      }
      let roomTypeName: string | undefined;
      let roomTypeId = existingRoom.roomType.toString();
      if (data.roomType) {
        if (!mongoose.Types.ObjectId.isValid(data.roomType)) {
          throw HttpException.badRequest("Invalid room type ID format");
        }
        const roomTypeDoc = await RoomType.findById(data.roomType);
        if (!roomTypeDoc || !roomTypeDoc.name) {
          throw HttpException.badRequest("Room type not found or missing name");
        }
        roomTypeName = roomTypeDoc.name;
        roomTypeId = data.roomType;
      }
      const updateData: any = {
        ...data,
        ...(roomTypeName && { roomTypeName }),
      };
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
      const updatedRoom = await Room.findByIdAndUpdate(id, updateData, { new: true }).populate<{ roomType: { _id: string; name: string } }>('roomType', 'name');
      if (!updatedRoom) {
        throw HttpException.notFound("Room not found");
      }
      await roomTypeService.updateRoomTypeDiscount(roomTypeId);
      const roomObj = updatedRoom.toObject();
      console.log(`Updated room ${id} with roomType: ${roomTypeId}, roomTypeName: ${roomObj.roomTypeName}`); // Debug log
      return {
        ...roomObj,
        roomTypeName: roomObj.roomTypeName || roomObj.roomType?.name || "",
      };
    } catch (error: any) {
      console.error(`Error editing room ${id}:`, error);
      throw HttpException.badRequest(error.message);
    }
  }

  async deleteRoom(id: string) {
    try {
      const room = await Room.findById(id);
      if (!room) {
        throw HttpException.notFound("Room not found");
      }
      const roomTypeId = (room.roomType as any)._id?.toString() || room.roomType.toString();
      await Room.findByIdAndDelete(id);
      await roomTypeService.updateRoomTypeDiscount(roomTypeId);
      return { message: "Room deleted successfully" };
    } catch (error: any) {
      console.error(`Error deleting room ${id}:`, error);
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new RoomService();
