import Room from "../models/room.model"; // The Room model
import HttpException from "../utils/HttpException.utils";
import mongoose from "mongoose";

class RoomService {

    /**
     * Create a new room.
     * @param data Room creation data (name, slug).
     * @returns Created room without sensitive data.
     */
    async getAllRooms() {
        try {
            const rooms = await Room.find();  // Fetch all rooms from the database
            return rooms;
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getRoomById(id: string) {
        try {
            const room = await Room.findById(id);  // Find room by ID in the database
            if (!room) {
                throw HttpException.notFound("Room not found");
            }
            return room.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async createRoom(data: { roomNumber: string, roomType: mongoose.Schema.Types.ObjectId, floor: string }, ) {
        try {
            const existingRoom = await Room.findOne({ $or: [{ roomNumber: data.roomNumber},] });
            if (existingRoom) {
                throw HttpException.badRequest("Room name or slug already exists");
            }
            const newRoom = await Room.create({
                ...data,
            });
            return newRoom.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
    /**
     * Edit an existing room by ID.
     * @param id Room ID.
     * @param data Updated room data.
     * @returns Updated room data.
     */
    async editRoom(id: string, data: { roomNumber?: string, }, ) {
        try {
            const existingRoom = await Room.findById(id);
            if (!existingRoom) {
                throw HttpException.notFound("Room not found");
            }
            // Prepare update data
            const updateData: any = { ...data };
            
                       // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

            const updatedRoom = await Room.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedRoom) {
                throw HttpException.notFound("Room not found");
            }

            return updatedRoom.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    /**
     * Delete a room by its ID.
     * @param id Room ID.
     * @returns Success message.
     */
    async deleteRoom(id: string) {
        try {
            const room = await Room.findById(id);
            if (!room) {
                throw HttpException.notFound("Room not found");
            }

            await Room.findByIdAndDelete(id);
            return { message: "Room deleted successfully" };
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
}

export default new RoomService();
