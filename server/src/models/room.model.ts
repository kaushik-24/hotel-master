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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'maintenance', 'cleaning'],
    default: 'available'
  },
  isActive: {
    type: Boolean,
    default: true
  }
},        { timestamps: true }
);

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;


