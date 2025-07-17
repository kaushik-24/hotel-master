import mongoose from "mongoose";

export interface IHotelLogo {
    path: string;
}

const hotelLogoSchema = new mongoose.Schema({
  path: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HotelLogo = mongoose.model<IHotelLogo>("hotelLogo", hotelLogoSchema);

export default HotelLogo;


