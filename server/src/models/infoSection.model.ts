// src/models/infoSection.model.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IInfoSection extends Document {
    address: string;
    phoneNumbers: string[]; // Array of phone numbers
    whatsapp: string;
    enquiryEmail: string;
    contactEmail: string;
}

const infoSectionSchema: Schema = new Schema(
    {
        address: { type: String, required: true },
        phoneNumbers: { type: [String], required: true }, // Array to store multiple phone numbers
        whatsapp: { type: String, required: true },
        enquiryEmail: { type: String, required: true },
        contactEmail: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const InfoSection = mongoose.model<IInfoSection>("InfoSection", infoSectionSchema);

export default InfoSection;
