import mongoose, { Schema } from "mongoose";

export interface IAboutUs {
  heading1: string;
  heading2: string;
  subtitle: string;
  description: string;
  aboutUsImage?: string;
}

const aboutUsSchema = new Schema<IAboutUs>(
  {
    heading1: {
      type: String,
      required: true,
    },
    heading2: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    aboutUsImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const AboutUs = mongoose.model<IAboutUs>("AboutUs", aboutUsSchema);

export default AboutUs;
