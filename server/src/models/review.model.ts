import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  author_name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  relative_time_description: { type: String, required: true }, // e.g., "1 month ago"
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>('Review', ReviewSchema);
