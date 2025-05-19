import mongoose from 'mongoose';


export interface ISocialMedia extends mongoose.Document {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tripAdvisor?: string;
    youtube?: string;
    twitter?: string;
    whatsApp?: string
}