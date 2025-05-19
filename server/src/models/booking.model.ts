// src/models/booking.model.ts
import mongoose, { Schema } from 'mongoose';
import { IBooking } from '../interface/booking.interface';

const bookingSchema = new Schema<IBooking>({
    name: {
        type: String,
        required: true,
    },
    numberOfRoom: {
        type: Number,
        required: true,
        min: [1, 'Number of rooms must be at least 1'],
    },
    rooms: [
        {
            type: String, // Changed from ObjectId to String
            required: false, // Made optional
        },
    ],
    checkInDate: {
        type: Date,
        required: false,
    },
    checkOutDate: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
