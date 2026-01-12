"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const location_model_1 = __importDefault(require("../models/location.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
class LocationService {
    async getLocation() {
        try {
            const location = await location_model_1.default.findOne();
            if (!location) {
                throw HttpException_utils_1.default.notFound("Location section not found");
            }
            return location.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createLocation(data) {
        try {
            // Check if Location section already exists
            const existingLocation = await location_model_1.default.findOne();
            if (existingLocation) {
                throw HttpException_utils_1.default.badRequest("Location section already exists. Please use update instead.");
            }
            const newLocation = await location_model_1.default.create(data);
            return newLocation.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async updateLocation(data) {
        try {
            const existingLocation = await location_model_1.default.findOne();
            if (!existingLocation) {
                throw HttpException_utils_1.default.notFound("Location section not found");
            }
            const updateData = { ...data };
            // Remove undefined fields
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);
            const updatedLocation = await location_model_1.default.findOneAndUpdate({}, updateData, { new: true });
            return updatedLocation?.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new LocationService();
