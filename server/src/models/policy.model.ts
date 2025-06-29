import mongoose, { Schema } from 'mongoose';

export interface IPolicy {
  slug: string;
  title: string;
  author: string;
  date: Date;
  content: string;
  image?: string;
}

const policySchema = new Schema<IPolicy>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Policy = mongoose.model<IPolicy>('Policy', policySchema);

export default Policy;
