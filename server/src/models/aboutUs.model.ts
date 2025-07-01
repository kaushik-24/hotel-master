import mongoose, { Schema } from "mongoose";

export interface IAboutUs {
  subtitle: string;
  heading: string;
  subheading: string;
  description1: string;
  image?: string; // Base64 encoded image
}

const aboutUsSchema = new Schema<IAboutUs>(
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
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const AboutUs = mongoose.model<IAboutUs>("AboutUs", aboutUsSchema);

export default AboutUs;
