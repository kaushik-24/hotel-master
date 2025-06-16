import mongoose, { Schema } from "mongoose";

export interface IAccommodation {
  heading: string;
}

const accommodationSchema = new Schema<IAccommodation>(
  {
    heading: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Accommodation = mongoose.model<IAccommodation>("Accommodation", accommodationSchema);

export default Accommodation;
