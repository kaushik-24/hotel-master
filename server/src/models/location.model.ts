import mongoose, { Schema } from "mongoose";

export interface ILocation {
  name: string;
  subtitle: string;
  address: string;
  location: string;
}

const locationSchema = new Schema<ILocation>(
  {
    name: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Location = mongoose.model<ILocation>("Location", locationSchema);

export default Location;
