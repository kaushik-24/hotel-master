import { Facility } from '../interface/facility.interface';
import { FacilityModel } from '../models/facility.model';
import { Types } from 'mongoose';

export class FacilityService {
  static async createFacility(facility: Facility): Promise<Facility> {
    const newFacility = await FacilityModel.create(facility);
    return newFacility;
  }

  static async getAllFacilities(): Promise<Facility[]> {
    return FacilityModel.find().lean();
  }

  static async getFacilityById(id: string): Promise<Facility | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid facility ID');
    }
    return FacilityModel.findById(id).lean();
  }

  static async updateFacility(id: string, facility: Partial<Facility>): Promise<Facility | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid facility ID');
    }
    return FacilityModel.findByIdAndUpdate(id, facility, { new: true }).lean();
  }

  static async deleteFacility(id: string): Promise<Facility | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid facility ID');
    }
    return FacilityModel.findByIdAndDelete(id).lean();
  }
}
