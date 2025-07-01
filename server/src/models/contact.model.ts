import mongoose, { Schema } from "mongoose";

export interface IContact {
  address: string;
  phoneNumber?: string[];
  email: string;
  contactImage: string;
}

const contactSchema = new Schema<IContact>(
  {
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: [String],
    },
    email: {
      type: String,
    },
    contactImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
