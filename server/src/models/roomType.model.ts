import mongoose, { Schema } from "mongoose";
import { IRoomType } from "../interface/room.interface";



const roomTypeSchema = new Schema<IRoomType>(
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
        roomImage: { type: String},
        discount: {
            type: Number,
            default: 0, 
        },
        
    }, { timestamps: true }
);

const RoomType = mongoose.model<IRoomType>("RoomType", roomTypeSchema);

export default RoomType;

