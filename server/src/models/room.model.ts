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
    type: Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true,
    unique: false
  },
  roomTypeName: {
    type: String,
    required: false
  },
  floor: {
    type: String,
    required: true,
    unique: false
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  },        { timestamps: true }
);

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;


