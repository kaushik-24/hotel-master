import mongoose, { Schema } from "mongoose";
import { IRoom } from "../interface/room.interface";



const roomSchema = new Schema<IRoom>(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
    },
        price: {
            type: Number,
            required: true,
            unique: false,
        },
        description: {
            type: String,
            required: true,
            unique: false,
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

