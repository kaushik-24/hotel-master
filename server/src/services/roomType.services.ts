import RoomType from "../models/roomType.model";
import Room from "../models/room.model";
import Discount from "../models/discount.model";
import HttpException from "../utils/HttpException.utils";
import fs from "fs";
import path from "path";

class RoomTypeService {
  // Calculate and update discount for a specific RoomType
  async updateRoomTypeDiscount(roomTypeId: string) {
    try {
      const rooms = await Room.find({ roomType: roomTypeId });
      console.log(`Updating discount for RoomType ${roomTypeId}:`, { roomCount: rooms.length, allAvailable: rooms.length > 0 ? rooms.every(room => room.isAvailable) : 'no rooms' }); // Debug log
      const allAvailable = rooms.length === 0 || (rooms.length > 0 && rooms.every(room => room.isAvailable));
      const discount = allAvailable ? 0.3 : 0; // 30% if all rooms are available or no rooms exist
      await Discount.findOneAndUpdate(
        { roomType: roomTypeId },
        { roomType: roomTypeId, discount: discount * 100, startDate: new Date() },
        { upsert: true, new: true }
      );
      console.log(`Set discount for RoomType ${roomTypeId} to ${discount * 100}%`); // Debug log
      return discount * 100; // Return the discount percentage
    } catch (error: any) {
      console.error(`Error updating discount for RoomType ${roomTypeId}:`, error);
      throw HttpException.badRequest(error.message);
    }
  }

  // Update discounts for all RoomTypes
  async updateAllRoomTypeDiscounts() {
    try {
      const roomTypes = await RoomType.find();
      console.log(`Updating discounts for ${roomTypes.length} RoomTypes`);
      await Promise.all(
        roomTypes.map(async (roomType) => {
          await this.updateRoomTypeDiscount(roomType._id.toString());
        })
      );
    } catch (error: any) {
      console.error("Error updating all room type discounts:", error);
      throw HttpException.badRequest(error.message);
    }
  }

  async getAllRoomsType() {
    try {
      await this.updateAllRoomTypeDiscounts();
      const roomsType = await RoomType.find();
      const roomsTypeWithDiscount = await Promise.all(roomsType.map(async (roomType) => {
        const roomTypeObj = roomType.toObject();
        const price = roomTypeObj.price as number;
        const discountDoc = await Discount.findOne({ roomType: roomType._id });
        const discount = discountDoc ? discountDoc.discount : 0;
        const discountedPrice = discount > 0 ? price * (1 - discount / 100) : null;
        const availableRooms = await Room.countDocuments({ roomType: roomType._id, isAvailable: true });
        return {
          ...roomTypeObj,
          discount,
          discountedPrice,
          availableRooms
        };
      }));
      console.log("Returning room types:", roomsTypeWithDiscount);
      return { roomTypes: roomsTypeWithDiscount };
    } catch (error: any) {
      console.error("Error fetching all room types:", error);
      throw HttpException.badRequest(error.message);
    }
  }

  async getRoomTypeById(id: string) {
    try {
      const roomType = await RoomType.findById(id);
      if (!roomType) {
        throw HttpException.notFound("Room type not found");
      }
      await this.updateRoomTypeDiscount(id);
      const roomTypeObj = roomType.toObject();
      const price = roomTypeObj.price as number;
      const discountDoc = await Discount.findOne({ roomType: id });
      const discount = discountDoc ? discountDoc.discount : 0;
      const discountedPrice = discount > 0 ? price * (1 - discount / 100) : null;
      const availableRooms = await Room.countDocuments({ roomType: roomType._id, isAvailable: true });
      return {
        roomType: {
          ...roomTypeObj,
          discount,
          discountedPrice,
          availableRooms
        }
      };
    } catch (error: any) {
      console.error(`Error fetching RoomType ${id}:`, error);
      throw HttpException.badRequest(error.message);
    }
  }

  async getRoomTypeBySlug(slug: string) {
    try {
      const roomType = await RoomType.findOne({ slug });
      if (!roomType) {
        throw HttpException.notFound("Room type not found");
      }
      await this.updateRoomTypeDiscount(roomType._id.toString());
      const roomTypeObj = roomType.toObject();
      const price = roomTypeObj.price as number;
      const discountDoc = await Discount.findOne({ roomType: roomType._id });
      const discount = discountDoc ? discountDoc.discount : 0;
      const discountedPrice = discount > 0 ? price * (1 - discount / 100) : null;
      const availableRooms = await Room.countDocuments({ roomType: roomType._id, isAvailable: true });
      return {
        roomType: {
          ...roomTypeObj,
          discount,
          discountedPrice,
          availableRooms
        }
      };
    } catch (error: any) {
      console.error(`Error fetching RoomType by slug ${slug}:`, error);
      throw HttpException.badRequest(error.message);
    }
  }

  async createRoomType(data: { name: string, price: number, capacity: number, shortdesc: string, features: string, heading: string, longdesc: string }, file?: Express.Multer.File) {
    try {
      const featuresArray = data.features.split(',')
        .map(feature => feature.trim())
        .filter(feature => feature !== '');
      const slug = data.name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      const existingRoomType = await RoomType.findOne({ $or: [{ name: data.name }, { slug: slug }, { price: data.price }, { shortdesc: data.shortdesc }] });
      if (existingRoomType) {
        throw HttpException.badRequest("Room type name, slug, price, or short description already exists");
      }
      const newRoomType = await RoomType.create({
        ...data,
        slug,
        features: featuresArray,
        roomImage: file ? `/uploads/${file.filename}` : undefined,
      });
      // Create initial discount (30% for no rooms)
      await Discount.create({
        roomType: newRoomType._id,
        discount: 30,
        startDate: new Date(),
      });
      return newRoomType.toObject();
    } catch (error: any) {
      console.error("Error creating RoomType:", error);
      throw HttpException.badRequest(error.message);
    }
  }

  async editRoomType(id: string, data: { name?: string, price?: number, shortdesc?: string, features?: string, heading?: string, longdesc?: string }, file?: Express.Multer.File) {
    try {
      const existingRoomType = await RoomType.findById(id);
      if (!existingRoomType) {
        throw HttpException.notFound("Room type not found");
      }
      const updateData: any = { ...data };
      if (typeof data.features === "string") {
        updateData.features = data.features.trim() !== ""
          ? data.features.split(',').map(feature => feature.trim()).filter(feature => feature !== '')
          : [];
      } else {
        updateData.features = existingRoomType.features || [];
      }
      if (file) {
        if (existingRoomType.roomImage) {
          const oldImagePath = path.join(__dirname, "../../", existingRoomType.roomImage);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.roomImage = `/uploads/${file.filename}`;
      }
      if (data.name) {
        updateData.slug = data.name.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim();
      }
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
      const updatedRoomType = await RoomType.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedRoomType) {
        throw HttpException.notFound("Room type not found");
      }
      await this.updateRoomTypeDiscount(id);
      return updatedRoomType.toObject();
    } catch (error: any) {
      console.error(`Error editing RoomType ${id}:`, error);
      throw HttpException.badRequest(error.message);
    }
  }

  async deleteRoomType(id: string) {
    try {
      const roomType = await RoomType.findById(id);
      if (!roomType) {
        throw HttpException.notFound("Room type not found");
      }
      const associatedRooms = await Room.countDocuments({ roomType: id });
      if (associatedRooms > 0) {
        throw HttpException.badRequest("Cannot delete room type with associated rooms");
      }
      if (roomType.roomImage) {
        const imagePath = path.join(__dirname, "../../", roomType.roomImage);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await RoomType.findByIdAndDelete(id);
      await Discount.deleteOne({ roomType: id });
      return { message: "Room type deleted successfully" };
    } catch (error: any) {
      console.error(`Error deleting RoomType ${id}:`, error);
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new RoomTypeService();
