import mongoose, { Schema } from "mongoose";

export interface IHero {
  heading1: string;
  heading2: string;
  heroImage: string;
}

const heroSchema = new Schema<IHero>(
  {
    heading1: {
      type: String,
      required: true,
    },
    heading2: {
      type: String,
      required: true,
    },
    heroImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Hero = mongoose.model<IHero>("Hero", heroSchema);

export default Hero;
