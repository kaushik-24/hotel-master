"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityService = void 0;
const facility_model_1 = require("../models/facility.model");
const mongoose_1 = require("mongoose");
class FacilityService {
    static async createFacility(facility) {
        const newFacility = await facility_model_1.FacilityModel.create(facility);
        return newFacility;
    }
    static async getAllFacilities() {
        return facility_model_1.FacilityModel.find().lean();
    }
    static async getFacilityById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid facility ID');
        }
        return facility_model_1.FacilityModel.findById(id).lean();
    }
    static async updateFacility(id, facility) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid facility ID');
        }
        return facility_model_1.FacilityModel.findByIdAndUpdate(id, facility, { new: true }).lean();
    }
    static async deleteFacility(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid facility ID');
        }
        return facility_model_1.FacilityModel.findByIdAndDelete(id).lean();
    }
}
exports.FacilityService = FacilityService;
