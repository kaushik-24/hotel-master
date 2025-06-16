import path from "path";
import RoomType from "../models/roomType.model"; // The Room model
import HttpException from "../utils/HttpException.utils";
import fs from "fs";

class RoomTypeService {

    /**
     * Create a new room.
     * @param data Room creation data (name, slug).
     * @returns Created room without sensitive data.
     */
    async getAllRoomsType() {
        try {
            const roomsType = await RoomType.find();  // Fetch all rooms from the database
            return roomsType;
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getRoomTypeById(id: string) {
        try {
            const roomType = await RoomType.findById(id);  // Find room by ID in the database
            if (!roomType) {
                throw HttpException.notFound("Room not found");
            }
            return roomType.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }


    async createRoomType(data: { name: string, price: number, capacity: number, shortdesc: string, features: string, heading: string, longdesc: string }, file?: Express.Multer.File) {
        try {
            
            const featuresArray = data.features.split(',')
                .map(feature => feature.trim())
                .filter(feature => feature !== '');

            const slug = data.name.toLowerCase()                 
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters                 
                .replace(/\s+/g, '-') // Replace spaces with hyphens                 
                .trim();  
            const existingRoomType = await RoomType.findOne({ $or: [{ name: data.name },{ slug: slug}, { price: data.price }, {shortdesc: data.shortdesc} ] });

            if (existingRoomType) {
                throw HttpException.badRequest("Room name or slug already exists");
            }
            const newRoomType = await RoomType.create({...data, slug: slug, features: featuresArray,
            roomImage: file ? `/uploads/${file.filename}` : undefined,});
            return newRoomType.toObject();
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
    async editRoomType(id: string, data: { name?: string, price?: number, shortdesc?: string, features?: string, heading?: string, longdesc?: string  }, file?: Express.Multer.File) {
        try {

    const existingRoomType = await RoomType.findById(id);
        if (!existingRoomType) {
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
      updateData.features = existingRoomType.features || [];
    }

    // Handle image upload
    if (file) {
      // Delete the old image first
            if (existingRoomType.roomImage) {
                const oldImagePath = path.join(__dirname, "../../", existingRoomType.roomImage);
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

    const updatedRoomType = await RoomType.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedRoomType) {
      throw HttpException.notFound("Room not found");
    }

    return updatedRoomType.toObject();  
            } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getRoomTypeBySlug(slug: string) {
    try {
        const roomType = await RoomType.findOne({ slug });
        if (!roomType) {
            throw HttpException.notFound("Room not found");
        }
        return roomType.toObject();
    } catch (error: any) {
        throw HttpException.badRequest(error.message);
    }
}


    /**
     * Delete a room by its ID.
     * @param id Room ID.
     * @returns Success message.
     */
    async deleteRoomType(id: string) {
        try {
            const roomType = await RoomType.findById(id);
            if (!roomType) {
                throw HttpException.notFound("Room not found");
            }
            
             // Remove the image if it exists
            if (roomType.roomImage) {
              const imagePath = path.join(__dirname, "../../", roomType.roomImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                }
            }
            await RoomType.findByIdAndDelete(id);
            return { message: "Room Type deleted successfully" };
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
}

export default new RoomTypeService();
