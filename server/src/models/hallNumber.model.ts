import mongoose, { Schema } from "mongoose";

export interface IHallNumber {
  hallNumber: string;
  hallType: string;
  floor: string;
}


const hallNumberSchema = new Schema<IHallNumber>({
     hallNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  hallType: {
    type: String,
    ref: 'hall',
    required: true,
    unique: false
  },
  floor: {
    type: String,
    required: true,
    unique: false
  },
  },        { timestamps: true }
);

const HallNumber = mongoose.model<IHallNumber>("hallNumber", hallNumberSchema);

export default HallNumber;



