import path from "path";
import Room from "../models/room.model"; // The Room model
import HttpException from "../utils/HttpException.utils";
import fs from "fs";

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


    async createRoom(data: { name: string, price: number, totalrooms: number, shortdesc: string, features: string, heading: string, longdesc: string }, file?: Express.Multer.File) {
        try {
            
            const featuresArray = data.features.split(',')
                .map(feature => feature.trim())
                .filter(feature => feature !== '');

            const slug = data.name.toLowerCase()                 
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters                 
                .replace(/\s+/g, '-') // Replace spaces with hyphens                 
                .trim();  
            const existingRoom = await Room.findOne({ $or: [{ name: data.name },{ slug: slug}, { price: data.price }, {shortdesc: data.shortdesc} ] });

            if (existingRoom) {
                throw HttpException.badRequest("Room name or slug already exists");
            }
            const newRoom = await Room.create({...data, slug: slug, features: featuresArray,
            roomImage: file ? `/uploads/${file.filename}` : undefined,});
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
    async editRoom(id: string, data: { name?: string, price?: number, shortdesc?: string, features?: string, heading?: string, longdesc?: string  }, file?: Express.Multer.File) {
        try {

    const existingRoom = await Room.findById(id);
        if (!existingRoom) {
            throw HttpException.notFound("Room not found");
        }
                 // Prepare update data
    const updateData: any = { ...data };

    // Handle features safely
    if (typeof data.features === "string") {
      updateData.features = data.features.trim() !== ""
        ? data.features
            .split(",")
            .map((feature) => feature.trim())
            .filter((feature) => feature !== "")
        : [];
    } else {
      updateData.features = [];
    }

    // Handle image upload
    if (file) {
      // Delete the old image first
            if (existingRoom.roomImage) {
                const oldImagePath = path.join(__dirname, "../../", existingRoom.roomImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

      updateData.roomImage = `/uploads/${file.filename}`;
    }

    // Update slug if name is provided
    if (data.name) {
      updateData.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    }

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

    async getRoomBySlug(slug: string) {
    try {
        const room = await Room.findOne({ slug });
        if (!room) {
            throw HttpException.notFound("Room not found");
        }
        return room.toObject();
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
            
             // Remove the image if it exists
            if (room.roomImage) {
              const imagePath = path.join(__dirname, "../../", room.roomImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                }
            }
            await Room.findByIdAndDelete(id);
            return { message: "Room deleted successfully" };
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
}

export default new RoomService();
