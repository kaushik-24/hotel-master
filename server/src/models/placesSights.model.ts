import mongoose, { Schema } from "mongoose";

export interface IPlacesSights {
  heading1: string;
  description: string;
  placesSightsImage: string;
}

const placesSightsSchema = new Schema<IPlacesSights>(
  {
    heading1: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    placesSightsImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const PlacesSights = mongoose.model<IPlacesSights>("PlacesSights", placesSightsSchema);

export default PlacesSights;

