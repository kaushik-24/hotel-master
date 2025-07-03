import mongoose, { Schema, Document } from "mongoose";

export interface IDiscount extends Document {
  roomType: mongoose.Types.ObjectId;
  discount: number; // Percentage (e.g., 30 for 30%)
  startDate?: Date;
  endDate?: Date;
}

const discountSchema: Schema = new Schema(
  {
    roomType: { type: Schema.Types.ObjectId, ref: "RoomType", required: true },
    discount: { type: Number, required: true, min: 0, max: 100 },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IDiscount>("Discount", discountSchema);
