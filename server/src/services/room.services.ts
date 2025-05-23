import Room from "../models/room.model"; // The Room model
import HttpException from "../utils/HttpException.utils";

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


    async createRoom(data: { name: string, price: number, description: string, features: string }) {
        try {
            const featuresArray = data.features.split(' ')
                .map(feature => feature.trim())
                .filter(feature => feature !== '');
            const slug = data.name.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .trim();

            const existingRoom = await Room.findOne({ $or: [{ name: data.name },{ slug: slug}, { price: data.price },
            {description: data.description}, ] });

            if (existingRoom) {
                throw HttpException.badRequest("Room name or slug already exists");
            }
            const newRoom = await Room.create({...data, slug: slug, features: featuresArray});
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
    async editRoom(id: string, data: { name?: string, price?: number, description?: string, features?: string }) {
        try {
            const updatedRoom = await Room.findByIdAndUpdate(id, data, { new: true });
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
            const deletedRoom = await Room.findByIdAndDelete(id);
            if (!deletedRoom) {
                throw HttpException.notFound("Room not found");
            }
            return { message: "Room deleted successfully" };
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
}

export default new RoomService();
