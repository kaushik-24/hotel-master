// src/models/booking.model.ts
import mongoose, { Schema } from 'mongoose';
import { IBooking } from '../interface/booking.interface';
import { emailRegex } from '../constant/regex';
import { Message } from '../constant/messages';

const bookingSchema = new Schema<IBooking>({
    name: {
        type: String,
        required: true,
    },
    email: {
            type: String,
            required: true,
            unique: false,
            match: [emailRegex, Message.validEmailAddress],  // Email validation
        },
 
    numberOfRoom: {
        type: Number,
        required: true,
        min: [1, 'Number of rooms must be at least 1'],
    },
    rooms: 
        {
            type: String, // Changed from ObjectId to String
            required: false, // Made optional
        },

    roomNames: 
        {
            type: String,
            required: false, // Optional to match rooms
        },

    checkInDate: {
        type: String,
        required: false,
    },
    checkOutDate: {
        type: String,
        required: false,
    },
    idImage: {
        type: String,
        required: false
  },
    assignedRoomNumbers: [{
        type: String,
        required: true
  }],
}, {
    timestamps: true,
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
