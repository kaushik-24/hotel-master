import mongoose, { Schema } from "mongoose";

export interface IHomeAboutUs {
  subtitle: string;
  heading: string;
  subheading: string;
  description1: string;
}

const homeaboutUsSchema = new Schema<IHomeAboutUs>(
  {
    subtitle: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    subheading: {
      type: String,
      required: true,
    },
    description1: {
      type: String,
      required: false,
    },
      },
  { timestamps: true }
);

const HomeAboutUs = mongoose.model<IHomeAboutUs>("HomeAboutUs", homeaboutUsSchema);

export default HomeAboutUs;
