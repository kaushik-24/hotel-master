import mongoose, { Schema } from "mongoose";
import { IRoom } from "../interface/room.interface";



const roomSchema = new Schema<IRoom>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
    },
        price: {
            type: Number,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
        },
        features: {
            type: [String],
            required: true,
            unique: false,
    },
        
    }, { timestamps: true }
);

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;

