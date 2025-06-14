import mongoose, { Schema } from 'mongoose';
import { Facility } from '../interface/facility.interface';

const facilitySchema = new Schema<Facility>(
  {
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const FacilityModel = mongoose.model<Facility>('Facility', facilitySchema);
