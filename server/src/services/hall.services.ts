import path from "path";
import Hall from "../models/hall.model"; // The Hall model
import HttpException from "../utils/HttpException.utils";
import fs from "fs";

class HallService {

    /**
     * Get all halls.
     * @returns All halls.
     */
    async getAllHalls() {
        try {
            const halls = await Hall.find();  // Fetch all halls from the database
            return halls;
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getHallById(id: string) {
        try {
            const hall = await Hall.findById(id);  // Find hall by ID in the database
            if (!hall) {
                throw HttpException.notFound("Hall not found");
            }
            return hall.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async createHall(data: { name: string, price: number, capacity: number, shortdesc: string, features: string, heading: string, longdesc: string }, file?: Express.Multer.File) {
        try {
            const featuresArray = data.features.split(',')
                .map(feature => feature.trim())
                .filter(feature => feature !== '');

            const slug = data.name.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim();
            const existingHall = await Hall.findOne({ $or: [{ name: data.name }, { slug: slug }, { price: data.price }, { shortdesc: data.shortdesc }] });

            if (existingHall) {
                throw HttpException.badRequest("Hall name or slug already exists");
            }
            const newHall = await Hall.create({
                ...data,
                slug: slug,
                features: featuresArray,
                hallImage: file ? `/uploads/${file.filename}` : undefined,
            });
            return newHall.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    /**
     * Edit an existing hall by ID.
     * @param id Hall ID.
     * @param data Updated hall data.
     * @returns Updated hall data.
     */
    async editHall(id: string, data: { name?: string, price?: number, shortdesc?: string, features?: string, heading?: string, longdesc?: string }, file?: Express.Multer.File) {
        try {
            const existingHall = await Hall.findById(id);
            if (!existingHall) {
                throw HttpException.notFound("Hall not found");
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
                updateData.features = existingHall.features || [];
            }

            // Handle image upload
            if (file) {
                // Delete the old image first
                if (existingHall.hallImage) {
                    const oldImagePath = path.join(__dirname, "../../", existingHall.hallImage);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updateData.hallImage = `/Uploads/${file.filename}`;
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

            const updatedHall = await Hall.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedHall) {
                throw HttpException.notFound("Hall not found");
            }

            return updatedHall.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getHallBySlug(slug: string) {
        try {
            const hall = await Hall.findOne({ slug });
            if (!hall) {
                throw HttpException.notFound("Hall not found");
            }
            return hall.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    /**
     * Delete a hall by its ID.
     * @param id Hall ID.
     * @returns Success message.
     */
    async deleteHall(id: string) {
        try {
            const hall = await Hall.findById(id);
            if (!hall) {
                throw HttpException.notFound("Hall not found");
            }

            // Remove the image if it exists
            if (hall.hallImage) {
                const imagePath = path.join(__dirname, "../../", hall.hallImage);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            await Hall.findByIdAndDelete(id);
            return { message: "Hall deleted successfully" };
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
}

export default new HallService();
