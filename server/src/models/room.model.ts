import mongoose, { Schema } from "mongoose";
import { IRoom } from "../interface/room.interface";



const roomSchema = new Schema<IRoom>({
     roomNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  roomType: {
    type: String,
    ref: 'RoomType',
    required: true,
    unique: false
  },
  floor: {
    type: String,
    required: true,
    unique: false
  },
  },        { timestamps: true }
);

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;


