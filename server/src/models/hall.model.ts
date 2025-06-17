import mongoose, { Schema } from "mongoose";
import { IHall } from "../interface/hall.interface";

const hallSchema = new Schema<IHall>(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        slug: {
            type: String,
            required: true,
            unique: false,
        },
        price: {
            type: Number,
            required: true,
            unique: false,
        },
        shortdesc: {
            type: String,
            required: true,
            unique: false,
        },
        heading: {
            type: String,
            required: true,
            unique: false,
        },
        longdesc: {
            type: String,
            required: true,
            unique: false,
        },
        features: {
            type: [String],
            required: true,
            unique: false,
        },
        capacity: {
            type: Number,
            required: true,
            unique: false,
        },
        hallImage: { type: String },
    }, { timestamps: true }
);

const Hall = mongoose.model<IHall>("Hall", hallSchema);

export default Hall;
