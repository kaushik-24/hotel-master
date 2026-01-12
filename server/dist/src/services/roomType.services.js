"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roomType_model_1 = __importDefault(require("../models/roomType.model"));
const room_model_1 = __importDefault(require("../models/room.model"));
const discount_model_1 = __importDefault(require("../models/discount.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class RoomTypeService {
    // Calculate and update discount for a specific RoomType
    async updateRoomTypeDiscount(roomTypeId) {
        try {
            const rooms = await room_model_1.default.find({ roomType: roomTypeId });
            console.log(`Updating discount for RoomType ${roomTypeId}:`, { roomCount: rooms.length, allAvailable: rooms.length > 0 ? rooms.every(room => room.isAvailable) : 'no rooms' }); // Debug log
            const allAvailable = rooms.length === 0 || (rooms.length > 0 && rooms.every(room => room.isAvailable));
            const discount = allAvailable ? 0.3 : 0; // 30% if all rooms are available or no rooms exist
            await discount_model_1.default.findOneAndUpdate({ roomType: roomTypeId }, { roomType: roomTypeId, discount: discount * 100, startDate: new Date() }, { upsert: true, new: true });
            console.log(`Set discount for RoomType ${roomTypeId} to ${discount * 100}%`); // Debug log
            return discount * 100; // Return the discount percentage
        }
        catch (error) {
            console.error(`Error updating discount for RoomType ${roomTypeId}:`, error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    // Update discounts for all RoomTypes
    async updateAllRoomTypeDiscounts() {
        try {
            const roomTypes = await roomType_model_1.default.find();
            console.log(`Updating discounts for ${roomTypes.length} RoomTypes`);
            await Promise.all(roomTypes.map(async (roomType) => {
                await this.updateRoomTypeDiscount(roomType._id.toString());
            }));
        }
        catch (error) {
            console.error("Error updating all room type discounts:", error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getAllRoomsType() {
        try {
            await this.updateAllRoomTypeDiscounts();
            const roomsType = await roomType_model_1.default.find();
            const roomsTypeWithDiscount = await Promise.all(roomsType.map(async (roomType) => {
                const roomTypeObj = roomType.toObject();
                const price = roomTypeObj.price;
                const discountDoc = await discount_model_1.default.findOne({ roomType: roomType._id });
                const discount = discountDoc ? discountDoc.discount : 0;
                const discountedPrice = discount > 0 ? price * (1 - discount / 100) : null;
                const availableRooms = await room_model_1.default.countDocuments({ roomType: roomType._id, isAvailable: true });
                return {
                    ...roomTypeObj,
                    discount,
                    discountedPrice,
                    availableRooms
                };
            }));
            console.log("Returning room types:", roomsTypeWithDiscount);
            return { roomTypes: roomsTypeWithDiscount };
        }
        catch (error) {
            console.error("Error fetching all room types:", error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getRoomTypeById(id) {
        try {
            const roomType = await roomType_model_1.default.findById(id);
            if (!roomType) {
                throw HttpException_utils_1.default.notFound("Room type not found");
            }
            await this.updateRoomTypeDiscount(id);
            const roomTypeObj = roomType.toObject();
            const price = roomTypeObj.price;
            const discountDoc = await discount_model_1.default.findOne({ roomType: id });
            const discount = discountDoc ? discountDoc.discount : 0;
            const discountedPrice = discount > 0 ? price * (1 - discount / 100) : null;
            const availableRooms = await room_model_1.default.countDocuments({ roomType: roomType._id, isAvailable: true });
            return {
                roomType: {
                    ...roomTypeObj,
                    discount,
                    discountedPrice,
                    availableRooms
                }
            };
        }
        catch (error) {
            console.error(`Error fetching RoomType ${id}:`, error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getRoomTypeBySlug(slug) {
        try {
            const roomType = await roomType_model_1.default.findOne({ slug });
            if (!roomType) {
                throw HttpException_utils_1.default.notFound("Room type not found");
            }
            await this.updateRoomTypeDiscount(roomType._id.toString());
            const roomTypeObj = roomType.toObject();
            const price = roomTypeObj.price;
            const discountDoc = await discount_model_1.default.findOne({ roomType: roomType._id });
            const discount = discountDoc ? discountDoc.discount : 0;
            const discountedPrice = discount > 0 ? price * (1 - discount / 100) : null;
            const availableRooms = await room_model_1.default.countDocuments({ roomType: roomType._id, isAvailable: true });
            return {
                roomType: {
                    ...roomTypeObj,
                    discount,
                    discountedPrice,
                    availableRooms
                }
            };
        }
        catch (error) {
            console.error(`Error fetching RoomType by slug ${slug}:`, error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createRoomType(data, file) {
        try {
            const featuresArray = data.features.split(',')
                .map(feature => feature.trim())
                .filter(feature => feature !== '');
            const slug = data.name.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim();
            const existingRoomType = await roomType_model_1.default.findOne({ $or: [{ name: data.name }, { slug: slug }, { price: data.price }, { shortdesc: data.shortdesc }] });
            if (existingRoomType) {
                throw HttpException_utils_1.default.badRequest("Room type name, slug, price, or short description already exists");
            }
            const newRoomType = await roomType_model_1.default.create({
                ...data,
                slug,
                features: featuresArray,
                roomImage: file ? `/Uploads/${file.filename}` : undefined,
            });
            // Create initial discount (30% for no rooms)
            await discount_model_1.default.create({
                roomType: newRoomType._id,
                discount: 30,
                startDate: new Date(),
            });
            return newRoomType.toObject();
        }
        catch (error) {
            console.error("Error creating RoomType:", error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async editRoomType(id, data, file) {
        try {
            const existingRoomType = await roomType_model_1.default.findById(id);
            if (!existingRoomType) {
                throw HttpException_utils_1.default.notFound("Room type not found");
            }
            const updateData = { ...data };
            if (typeof data.features === "string") {
                updateData.features = data.features.trim() !== ""
                    ? data.features.split(',').map(feature => feature.trim()).filter(feature => feature !== '')
                    : [];
            }
            else {
                updateData.features = existingRoomType.features || [];
            }
            if (file) {
                if (existingRoomType.roomImage) {
                    const oldImagePath = path_1.default.join(__dirname, "../../", existingRoomType.roomImage);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                updateData.roomImage = `/Uploads/${file.filename}`;
            }
            if (data.name) {
                updateData.slug = data.name.toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .trim();
            }
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedRoomType = await roomType_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedRoomType) {
                throw HttpException_utils_1.default.notFound("Room type not found");
            }
            await this.updateRoomTypeDiscount(id);
            return updatedRoomType.toObject();
        }
        catch (error) {
            console.error(`Error editing RoomType ${id}:`, error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async deleteRoomType(id) {
        try {
            const roomType = await roomType_model_1.default.findById(id);
            if (!roomType) {
                throw HttpException_utils_1.default.notFound("Room type not found");
            }
            const associatedRooms = await room_model_1.default.countDocuments({ roomType: id });
            if (associatedRooms > 0) {
                throw HttpException_utils_1.default.badRequest("Cannot delete room type with associated rooms");
            }
            if (roomType.roomImage) {
                const imagePath = path_1.default.join(__dirname, "../../", roomType.roomImage);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            await roomType_model_1.default.findByIdAndDelete(id);
            await discount_model_1.default.deleteOne({ roomType: id });
            return { message: "Room type deleted successfully" };
        }
        catch (error) {
            console.error(`Error deleting RoomType ${id}:`, error);
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new RoomTypeService();
