import Location from "../models/location.model";
import HttpException from "../utils/HttpException.utils";

class LocationService {
  async getLocation() {
    try {
      const location = await Location.findOne();
      if (!location) {
        throw HttpException.notFound("Location section not found");
      }
      return location.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createLocation(data: { subtitle: string; title: string; description1: string; description2: string; description3: string }) {
    try {
      // Check if Location section already exists
      const existingLocation = await Location.findOne();
      if (existingLocation) {
        throw HttpException.badRequest("Location section already exists. Please use update instead.");
      }

      const newLocation = await Location.create(data);
      return newLocation.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async updateLocation(data: { subtitle?: string; title?: string; description1?: string; description2?: string; description3?: string }) {
    try {
      const existingLocation = await Location.findOne();
      if (!existingLocation) {
        throw HttpException.notFound("Location section not found");
      }

      const updateData: any = { ...data };

      // Remove undefined fields
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const updatedLocation = await Location.findOneAndUpdate({}, updateData, { new: true });
      return updatedLocation?.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new LocationService();
