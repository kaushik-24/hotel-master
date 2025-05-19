// src/models/socialMedia.model.ts

import mongoose, { Document, Schema } from "mongoose";

export interface ISocialMedia extends Document {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
    // Add more social platforms if needed
}

const socialMediaSchema: Schema = new Schema(
    {
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        youtube: { type: String, default: "" },
        twitter: { type: String, default: "" },
        tripAdvisor: { type: String, default: "" },
        whatsApp: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

const SocialMedia = mongoose.model<ISocialMedia>("SocialMedia", socialMediaSchema);

export default SocialMedia;
